/**
 * Cloudflare Pages Function
 * Route: jfla.com.pk/api/*
 * Handles all API requests for the Justice First website.
 * Reads/writes site data to KV storage (justice-first namespace).
 */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // GET /api/data — Retrieve site data from KV
  if (url.pathname === "/api/data" && request.method === "GET") {
    try {
      const data = await env["justice-first"].get("site_data");
      return new Response(data || "{}", {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "KV Read Error: " + err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/save — Save site data to KV
  if (url.pathname === "/api/save" && request.method === "POST") {
    try {
      const newData = await request.json();
      await env["justice-first"].put("site_data", JSON.stringify(newData));
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // Fallback for unknown /api/* routes
  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}
