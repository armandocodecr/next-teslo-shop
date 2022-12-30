
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if( !session ) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`
        url.search = `p=${ requestedPage }`

        return NextResponse.redirect( url );
    }

    return NextResponse.next();
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/checkout/address', '/checkout/summary', '/admin', '/admin/users', '/admin/products', '/admin/orders'],
}
    


