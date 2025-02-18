import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  // If there's no token in search params, continue as normal
  if (!token) {
    return NextResponse.next()
  }

  // Create new URL without the token parameter
  const newUrl = new URL(request.url)
  newUrl.pathname = '/playground/virtuals'
  newUrl.searchParams.delete('token')

  // Create response with redirect
  const response = NextResponse.redirect(newUrl)

  // Set the token in an HTTP-only cookie
  // You can adjust maxAge, path, etc. based on your needs
  response.cookies.set({
    name: 'virtual-jwt-token',
    value: token,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  })

  return response
}

// Define the paths where this middleware should run
export const config = {
  matcher: [
    /*
 * Match all request paths except:
 * - api routes (/api/*)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};
