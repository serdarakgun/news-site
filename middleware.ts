// middleware.js or middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fi'],
  defaultLocale: 'en',
});

export const config = {
  matcher: [
    // Apply to all pages except API routes, _next/static, and assets
    '/((?!api|_next/static|.*\\..*).*)',
  ],
};
