import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    async function middleware(req: NextRequest){

        const cookie = req.headers.get('cookie')

        const session: any = await getSession( { req: { headers: { cookie } } as any} );
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();

        if (!session) {

            return NextResponse.rewrite( new URL(`${url.origin}/auth/login?p=${requestedPage}`) );
            
        }

        if( 
            config.matcher[2] === requestedPage || 
            config.matcher[3] === requestedPage ||
            config.matcher[4] === requestedPage ||
            config.matcher[5] === requestedPage

            ){ //Esta lógica solo sucede en la página de admin
            const validRoles = ['admin', 'super-user', 'SEO'];
    
            if( !validRoles.includes( session.user.role ) ) {
               
                return NextResponse.redirect( new URL(url.origin) );
            }
        }


        return NextResponse.next();
    }
)

export const config ={
            runtime: 'experimental-edge', // for Edge API Routes only
            unstable_allowDynamic: [
                '/lib/utilities.js', // allows a single file
                '/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
            ],
            matcher: ['/checkout/address', '/checkout/summary', '/admin', '/admin/users', '/admin/products', '/admin/orders']
}

// export async function middleware( req: NextRequest, ev: NextFetchEvent ) {


//         const cookie = req.headers.get('cookie')

//         const session: any = await getSession( { req: { headers: { cookie } } as any} );
//         const requestedPage = req.nextUrl.pathname;
//         const url = req.nextUrl.clone();

//         if (!session) {

//             return NextResponse.rewrite(`${url.origin}/auth/login?p=${requestedPage}`);
            
//         }



//         if( 
//             config.matcher[2] === requestedPage || 
//             config.matcher[3] === requestedPage ||
//             config.matcher[4] === requestedPage ||
//             config.matcher[5] === requestedPage

//             ){ //Esta lógica solo sucede en la página de admin
//             const validRoles = ['admin', 'super-user', 'SEO'];
    
//             if( !validRoles.includes( session.user.role ) ) {
               
//                 return NextResponse.redirect(url.origin);
//             }
//         }


//         return NextResponse.next();

//     }

//     export const config ={
//         runtime: 'experimental-edge', // for Edge API Routes only
//         unstable_allowDynamic: [
//             '/lib/utilities.js', // allows a single file
//             '/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
//         ],
//         matcher: ['/checkout/address', '/checkout/summary', '/admin', '/admin/users', '/admin/products', '/admin/orders']
//     }
    


