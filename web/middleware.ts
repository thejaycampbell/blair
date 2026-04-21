import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isApiRoute = req.nextUrl.pathname.startsWith('/api/')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/api/auth')

  if (isApiRoute && !isAuthRoute && !req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
})

export const config = {
  matcher: ['/api/:path*'],
}
