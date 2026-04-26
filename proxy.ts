import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get('accessToken')?.value;

    const isAuth = !!accessToken;

    const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    if (!isAuth && isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (isAuth && isPublicRoute) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/sign-in', '/sign-up'],
};
