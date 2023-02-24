import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'

import { v2 as cloudinary } from 'cloudinary' // repositorio donde se subiran la imagenes
cloudinary.config( process.env.CLOUDINARY_UR || '' );

type Data = {
    message: string
}

export const config= {
    api: {
        bodyParser: false, //Indicamos a Next que no parsee el body, ya que son archivos, no son solo texto, por ende no es serialisable
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res)
    
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

const saveFile = async ( file: formidable.File ):Promise<string> => {
   
    const { secure_url } = await cloudinary.uploader.upload( file.filepath );
    return secure_url;

}
 
const parseFiles = async ( req: NextApiRequest ): Promise<string> => {

    return new Promise ( (resolve, reject) => {
        
        const form = new formidable.IncomingForm(); //Preparamos eol objeto de formidable para analizar lo que viene del form
        form.parse( req, async( error, fields, files ) => {

            if( error ) {
                return reject(error);
            }

            const filePath = await saveFile( files.file as formidable.File );
            resolve(filePath);

        } )

    });

};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const imageUrl = await parseFiles( req );

    return res.status(200).json({ message: imageUrl })

}
