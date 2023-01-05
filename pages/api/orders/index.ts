import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product, Order } from '../../../models';

type Data = 
 | { message : string }
 | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'POST':
            return createOrder( req, res );
        
        default:
            return res.status(400).json({ message: 'BAD REQUEST' })
    }
}


const createOrder = async ( req: NextApiRequest, res: NextApiResponse ) => {

    const { orderItems, total } = req.body as IOrder;

    // Verificar quue tengamos un usuario
    const session: any = await getSession({ req });

    if( !session ) {
        return res.status(401).json({ message: 'Debe de estar autenticado para hacer esto' });
    }

    //*** TODO ESTE PROCESO LO HACEMOS PARA EVITAR QUE EL USUARIO MANIPULE LOS DATOS DESDE EL LADO DEL CLIENTE, POR ENDE VERIFICAREMOS DESDE LA BD ***

    // Crear un arreglo con los productos que la persona quiere
    const productsIds = orderItems.map( product => product._id );
    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } }); //Esto me va a generar un arreglo con todos los productos que tengo
    //en mi base de datos que coinciden con los productos que la persona lleva

    try {
        
        const subTotal = orderItems.reduce( ( prev, current ) => {
            const currentPrice = dbProducts.find( prod => prod.id === current._id )!.price;
            if ( !currentPrice ) { //Esta es una validacion que nunca debería de entrar, de lo contrario significa que intentaron manipular los datos
                throw new Error('Verifique el carrito de nuevo, producto no existe')
            }

            return (currentPrice * current.quantity!) + prev

        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * ( taxRate + 1 );

        if( total !== backendTotal ) {
            throw new Error(' El total no cuadra con el monto ');
        }

        // Todo bien hasta este punto
        const userId = session.user._id;
        const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
        newOrder.total = Math.round( newOrder.total * 100 ) / 100; //Dejo a solo 2 decimales el total de la orden

        await newOrder.save();
        
        return res.status(201).json( newOrder );

    } catch (error:any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise log del servidor'
        })
    }finally {
        await db.disconnect();
    }
    

    return res.status(201).json( req.body );

}