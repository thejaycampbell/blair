import { auth } from '@/auth'
import { NextResponse } from 'next/server'

// Computed once at module load; avoids repeated env reads per request.
const authConfigured = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

export default auth((req) => {
  const isAuthRoute = req.nextUrl.pathname.startsWith('/api/auth/')

  if (!isAuthRoute && authConfigured && !req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/api/:path*'],
}
