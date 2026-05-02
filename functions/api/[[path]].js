/**
 * Cloudflare Pages Function
 * Route: jfla.com.pk/api/*
 * Handles all API requests for the Justice First website.
 *
 * KV Binding: JUSTICE_FIRST_DATA  (set in Cloudflare Pages → Settings → Functions → KV bindings)
 * Admin Key:  ADMIN_SECRET_KEY     (set in Cloudflare Pages → Settings → Environment Variables)
 */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
  };

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // POST /api/save — Save site data to KV (protected by Admin Key)
  if (url.pathname === "/api/save" && request.method === "POST") {
    const adminKey = request.headers.get("X-Admin-Key");
    if (adminKey !== env.ADMIN_SECRET_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    try {
      const body = await request.json();
      await env.JUSTICE_FIRST_DATA.put("siteData", JSON.stringify(body));
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // GET /api/data — Retrieve site data from KV (public)
  if (url.pathname === "/api/data" && request.method === "GET") {
    try {
      const data = await env.JUSTICE_FIRST_DATA.get("siteData");
      return new Response(data || "{}", {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "KV Read Error: " + err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // Fallback for unknown /api/* routes
  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
