export default {
  async fetch(request, env, ctx) {
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

    // API Route: GET site data
    if (url.pathname === "/api/data" && request.method === "GET") {
      try {
        const data = await env["justice-first"].get("site_data");
        return new Response(data || "{}", {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "KV Read Error" }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // API Route: SAVE site data
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

    // IMPORTANT: Serve all other requests from the static Pages assets
    // This prevents the "Site can't be reached" error for .html files
    return env.ASSETS.fetch(request);
  },
};
