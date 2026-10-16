import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

const API = process.env.API_INTERNAL_URL

// Hop-by-hop and length headers describe one connection and must not be copied.
// Node's fetch also rejects some of them (e.g. "expect").
const DROP = [
  "host", "connection", "keep-alive", "upgrade", "expect", "te", "trailer",
  "proxy-connection", "content-length", "content-encoding", "transfer-encoding",
]

type Ctx = { params: Promise<{ path: string[] }> }

async function proxy(req: NextRequest, { params }: Ctx) {
  if (!API) {
    return Response.json({ error: "internal_error", message: "API_INTERNAL_URL is not set" }, { status: 500 })
  }

  const { path } = await params
  const url = new URL(`/${path.join("/")}`, API)
  url.search = req.nextUrl.search

  const headers = new Headers(req.headers) // carries the session cookie
  DROP.forEach((h) => headers.delete(h))

  let upstream: Response
  try {
    upstream = await fetch(url, {
      method: req.method,
      headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer(),
      redirect: "manual",
      cache: "no-store",
    })
  } catch {
    return Response.json({ error: "internal_error", message: "API unreachable" }, { status: 502 })
  }

  const out = new Headers(upstream.headers) // keeps Set-Cookie from login
  DROP.forEach((h) => out.delete(h))
  return new Response(upstream.body, { status: upstream.status, headers: out })
}

export const GET = proxy
export const POST = proxy
export const PATCH = proxy
export const DELETE = proxy