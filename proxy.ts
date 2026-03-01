import { RankMathRedirection } from "@/lib/types/wp"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ['es', 'en'] as const
const defaultLocale = 'es'

let redirectsCache: Record<string, { to: string; status: number }> = {}
let cacheTimestamp = 0
const CACHE_TTL = 1000 * 60 * 60

async function getRedirects() {
  const now = Date.now()
  if (now - cacheTimestamp < CACHE_TTL) return redirectsCache
  try {
    const res = await fetch(`${process.env.WP_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ rankMathRedirections { nodes { fromUrl toUrl redirectType } } }`
      })
    })
    const data = await res.json()
    const nodes = data?.data?.rankMathRedirections?.nodes ?? []
    redirectsCache = nodes.reduce((acc: Record<string, { to: string; status: number }>, node: RankMathRedirection) => {
      acc[node.fromUrl] = { to: node.toUrl, status: node.redirectType ?? 301 }
      return acc
    }, {})
    cacheTimestamp = now
  } catch (error) {
    console.error("Error fetching redirects from RankMath:", error)
  }
  return redirectsCache
}

function getLocaleFromPathname(pathname: string): 'es' | 'en' {
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en'
  return 'es'
}

function pathnameHasLocale(pathname: string) {
  return pathname.startsWith('/en/') || pathname === '/en'
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/images/') ||
    pathname.includes('/icons/') ||
    pathname.match(/\.(ico|svg|png|jpg|jpeg|webp|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/api/revalidate")) {
    const secret = request.headers.get("x-revalidate-secret")
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.next()
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  const redirects = await getRedirects()
  const pathnameWithoutLocale = getLocaleFromPathname(pathname)
    ? pathname.replace(/^\/(es|en)/, '') || '/'
    : pathname
  const match = redirects[pathnameWithoutLocale] ?? redirects[pathname]
  if (match) {
    return NextResponse.redirect(new URL(match.to, request.url), match.status)
  }

  if (!pathnameHasLocale(pathname)) {
    const url = request.nextUrl.clone()
  url.pathname = `/es${pathname}`
  return NextResponse.rewrite(url)  // rewrite, no redirect
}

  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|icons).*)",
  ],
}