import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";



export async function middleware( req: NextRequest, ev: NextFetchEvent ) {


        const cookie = req.headers.get('cookie')

        const session: any = await getSession( { req: { headers: { cookie } } as any} );
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();

        if (!session) {

            return NextResponse.redirect(`${url.origin}/auth/login?p=${requestedPage}`);
            
        }



        if( 
            config.matcher[2] === requestedPage || 
            config.matcher[3] === requestedPage ||
            config.matcher[4] === requestedPage ||
            config.matcher[5] === requestedPage

            ){ //Esta lógica solo sucede en la página de admin
            const validRoles = ['admin', 'super-user', 'SEO'];
    
            if( !validRoles.includes( session.user.role ) ) {
               
                return NextResponse.redirect(url.origin);
            }
        }


        return NextResponse.next();

    }

    export const config ={
        matcher: ['/checkout/address', '/checkout/summary', '/admin', '/admin/users', '/admin/products', '/admin/orders']
    }
    

//******* ESTA ERA LA SOLUCION ANTERIOR ********

//     try {
//         // await jwt.isValidToken( token );
//         await jose.jwtVerify( req.cookies.get('token') as string,
//             new TextEncoder().encode(process.env.JWT_SECRET_SEED));
//         return NextResponse.next();

//     } catch (error) {
        
//         // const url = req.nextUrl.clone()
//         // console.log(url.origin)
//         // const requestedName = req.page.name;
//         // return NextResponse.redirect(`http://localhost:3000/auth/login?p=${config.matcher}`);
        
//         return NextResponse.redirect(new URL(`http://localhost:3000/auth/login?p=${req.url.substring(21, 45)}`))

//     }

// }

// export const config = {
//     matcher: ['/checkout/address', '/checkout/summary']
