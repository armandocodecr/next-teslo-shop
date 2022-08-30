import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary' // repositorio donde se subiran la imagenes
cloudinary.config( process.env.CLOUDINARY_UR || '' );

import { IProduct } from '../../../interfaces'
import { db } from '../../../database';
import { Product } from '../../../models';

type Data = 
| { message: string }
| IProduct[]
| IProduct  

const validSizes = ['XS','S','M','L','XL','XXL','XXXL'];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)

        case 'PUT':
            return updatedProducts(res, req);

        case 'POST':
            return createProduct(req, res);

        case 'DELETE':
            return deleteProduct(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request' })
    }

}

export const orderSizes = (entries: Array<string>): Array<string> => { //Función para ordenas las tallas antes de hacer un Post o un Put al backend
 
    const orderOfValues = entries.map(s =>  validSizes.indexOf(s))
    
    return orderOfValues.sort((a,b) => a - b).map(num => {
      return validSizes[num]
    })
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const products = await Product.find().sort({ title: 'asc' }).lean();

    await db.disconnect

    const updatedProducts = products.map ( product => {
        product.images = product.images.map ( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME }products/${ image }`
        }); 

        return product;
    });

    res.status(200).json( updatedProducts );

}
const updatedProducts = async (res: NextApiResponse<Data>, req: NextApiRequest) => {
    
    const { _id = '', images = [] } = req.body as IProduct;

    if( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El ID del producto no es válido' });
    }

    if( images.length < 2 ){
        return res.status(400).json({ message: 'Es necesario almenos dos imágenes' });
    }

    // TODO: POSIBLEMENTE TENDREMOS UN LOCALHOST:3000/PRODUCTS/asAS.JPG}

    try {

        await db.connect();
        const product = await Product.findById( _id );
        if( !product ){
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }

        //https://res.cloudinary.com/dyuj1zglt/image/upload/v1661384005/hztx4he9h7uizeounk2w.jpg
        product.images.forEach( async (image) => {
            if( !images.includes(image) ){
                //Borrar de Cloudinary
                const [ fileId, extension ] = image.substring(  image.lastIndexOf('/') + 1 ).split('.'); //Buscamos la posición índice del último "/", sumamos 1 porque quiero eliminar también el "/"
                console.log({ image, fileId, extension });
                await cloudinary.uploader.destroy( fileId ); //Eliminamos la imagen del repositorio
            }
        } );

        let sizes = req.body.sizes;
        req.body.sizes = orderSizes(sizes);

        await product.update( req.body );
        await db.disconnect();

        return res.status(200).json( product );
        
    } catch (error) {
        console.log(error)
        await db.disconnect();
        res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { images = [] } = req.body as IProduct;

    if ( images.length < 2 ) {
        return res.status(400).json({ message: 'El producto necesita almenos dos imágenes' });
    }

    // TODO: POSIBLEMENTE TENDREMOS UN LOCALHOST:3000/PRODUCTS/asAS.JPG}

    try {
        await db.connect();
        const productInDB = await Product.findOne({ slug: req.body.slug })
        if( productInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'El producto ya existe' });
        }

        let sizes = req.body.sizes;
        req.body.sizes = orderSizes(sizes);


        const product = new Product( req.body );
        await product.save();
        await db.disconnect();

        res.status(201).json( product );
        
    } catch (error) {
        await db.disconnect();
            return res.status(400).json({ message: 'Revisar logs del servidor' });
            console.log(error);
    }

}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id, images } = req.body;

    if( !isValidObjectId( id ) ) {
        return res.status(400).json({ message: 'El ID del producto no es válido' });
    }

    try {

        await db.connect();

        const product = await Product.findById( id );

        if( !product ){
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }

        //https://res.cloudinary.com/dyuj1zglt/image/upload/v1661384005/hztx4he9h7uizeounk2w.jpg
        product.images.forEach( async (image, i) => {
            console.log( 'Buenardo: ', image);
            if( images[i].includes(image) ){
                //Borrar de Cloudinary
                const [ fileId, extension ] = image.substring(  image.lastIndexOf('/') + 1 ).split('.'); //Buscamos la posición índice del último "/", sumamos 1 porque quiero eliminar también el "/"
                console.log({ image, fileId, extension });
                await cloudinary.uploader.destroy( fileId ); //Eliminamos la imagen del repositorio
            }
        } );

        await Product.findByIdAndDelete( id );

        await db.disconnect();

        return res.status(200).json({ message: 'El producto con el ID: '+ id + 'ha sido elimnado correctamente' });
        
    } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
        console.log(error);
    }

}

