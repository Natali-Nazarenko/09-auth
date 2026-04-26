// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { parse } from 'cookie';
// import { checkServerSession } from '@/lib/api/serverApi';

// const privateRoutes = ['/profile'];
// const publicRoutes = ['/sign-in', '/sign-up'];

// export async function proxy(request: NextRequest) {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get('accessToken')?.value;
//     const refreshToken = cookieStore.get('refreshToken')?.value;

//     const { pathname } = request.nextUrl;

//     const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
//     const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

//     if (!accessToken) {
//         if (refreshToken) {
//             const data = await checkServerSession();
//             const setCookie = data.headers['set-cookie'];
//             if (setCookie) {
//                 const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
//                 for (const cookieStr of cookieArray) {
//                     const parsed = parse(cookieStr);
//                     const options = {
//                         expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
//                         path: parsed.Path,
//                         maxAge: Number(parsed['Max-Age']),
//                     };
//                     if (parsed.accessToken)
//                         cookieStore.set('accessToken', parsed.accessToken, options);
//                     if (parsed.refreshToken)
//                         cookieStore.set('refreshToken', parsed.refreshToken, options);
//                 }
//                 if (isPublicRoute) {
//                     return NextResponse.redirect(new URL('/', request.url), {
//                         headers: {
//                             Cookie: cookieStore.toString(),
//                         },
//                     });
//                 }
//                 if (isPrivateRoute) {
//                     return NextResponse.next({
//                         headers: {
//                             Cookie: cookieStore.toString(),
//                         },
//                     });
//                 }
//             }
//         }
//         if (isPublicRoute) {
//             return NextResponse.next();
//         }

//         if (isPrivateRoute) {
//             return NextResponse.redirect(new URL('/sign-in', request.url));
//         }
//     }

//     if (isPublicRoute) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }
//     if (isPrivateRoute) {
//         return NextResponse.next();
//     }
// }

// export const config = {
//     matcher: ['/profile/:path*', '/sign-in', '/sign-up'],
// };

import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get('accessToken')?.value;

    const isAuth = !!accessToken;

    const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // ❌ не залогінений → на private
    if (!isAuth && isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // ❌ залогінений → на public
    if (isAuth && isPublicRoute) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/sign-in', '/sign-up'],
};
