import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
 
export default createMiddleware(routing)
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|images|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|assets).*)'
  ]
}