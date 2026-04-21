import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isApiRoute = req.nextUrl.pathname.startsWith('/api/')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/api/auth')
  // Only enforce auth when Google OAuth is fully configured (production mode).
  // Without credentials, fall back to local/cookie-only mode.
  const authConfigured = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

  if (isApiRoute && !isAuthRoute && authConfigured && !req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
})

export const config = {
  matcher: ['/api/:path*'],
}
