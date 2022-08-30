import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User, Order, Product } from '../../../models';

type Data = {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number; // role: client
    numberOfProducts: number;
    productsWithNoInventory: number; // 0
    lowInventory: number; // productos con 10 o menos en in stock
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();

    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    ] = await Promise.all([ //El promise.all dispara todas las peticiones de manera simultanea, y hasta que todas resuelven les caen a cada una de las variables de destructuramos
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count(), //$lte inndica que debe ser menor a 10
    ]);

    await db.disconnect();

    res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders
    })
    
    // switch ( req.method ){
    //     case 'GET':
    //         return getData(req, res);

    // }
}   

// const getData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    

// }
