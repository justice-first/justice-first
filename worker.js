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

    // Endpoint to GET site data
    if (url.pathname === "/api/data" && request.method === "GET") {
      const data = await env["justice-first"].get("site_data");
      return new Response(data || "{}", {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Endpoint to SAVE site data
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

    // Default response for other routes
    return new Response("Justice First API Active", {
      headers: { "Content-Type": "text/plain", ...corsHeaders },
    });
  },
};
