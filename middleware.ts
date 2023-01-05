
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {

    const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });

    if( !session ) {

      if (req.nextUrl.pathname.startsWith('/api/admin')) {
        return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
      }

      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`
      url.search = `p=${ requestedPage }`

      return NextResponse.redirect( url );

    }

    const validRoles = ['admin', 'super-user', 'SEO'];
 
    if (req.nextUrl.pathname.startsWith('/admin')) {
 
        if (!validRoles.includes(session.user!.role)) {
            const url = req.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }
 
    if (req.nextUrl.pathname.startsWith('/api/admin')) {
 
        if (!validRoles.includes(session.user!.role)) {
            return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
        }
 
    }

    return NextResponse.next();
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
}
    


