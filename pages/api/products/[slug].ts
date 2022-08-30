import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data = 
   | { message: string }
   | IProduct
   | null


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getProductBySlug( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getProductBySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug } = req.query;

    await db.connect();
    const getProduct = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if ( !getProduct ) {
        return res.status(400).json({ message: "No se ha encontrado un producto con el Slug: " + slug })
    }

    getProduct.images = getProduct.images.map ( image => {
        return image.includes('http') ? image : `${ process.env.HOST_NAME }products/${ image }`
    } ); 

    return res.status(200).json( getProduct );

}