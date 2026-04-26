// Decision Search AI fallback — registry-bounded, structured output.
// Called only when the keyword scorer returns weak results.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CompactRoute {
  id: string;
  title: string;
  oneLine: string;
  triggers: string[];
  categories: string[];
}

interface RequestBody {
  query: string;
  registry: CompactRoute[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Partial<RequestBody>;
    const query = (body.query ?? "").toString().trim();
    const registry = Array.isArray(body.registry) ? body.registry : [];

    if (!query || registry.length === 0) {
      return new Response(
        JSON.stringify({ error: "query and registry are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const validIds = new Set(registry.map((r) => r.id));

    const systemPrompt = [
      "You are a routing engine for a knowledge index of partner-doc rule books.",
      "You will receive a USER QUERY and a REGISTRY of routes. Each route has an id, title, oneLine summary, trigger phrases, and categories.",
      "Return the most relevant routes for the query, ranked by relevance.",
      "RULES:",
      "1. ONLY return ids that exist in the registry. Never invent ids.",
      "2. Return at most 5 routes.",
      "3. score is 0..1 — be strict; only the strongest match should approach 1.",
      "4. reason is one short sentence (≤14 words) explaining why this route fits the query.",
      "5. If the query is ambiguous, prefer routes whose triggers contain the query's nouns.",
    ].join("\n");

    const userPrompt = [
      `USER QUERY: ${query}`,
      "",
      "REGISTRY:",
      JSON.stringify(registry, null, 2),
    ].join("\n");

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_matches",
                description: "Return ranked route matches.",
                parameters: {
                  type: "object",
                  properties: {
                    matches: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          score: { type: "number" },
                          reason: { type: "string" },
                        },
                        required: ["id", "score", "reason"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["matches"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "return_matches" } },
        }),
      },
    );

    if (aiResp.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (aiResp.status === 402) {
      return new Response(
        JSON.stringify({
          error: "Payment required, please add funds to your Lovable AI workspace.",
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!aiResp.ok) {
      const text = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, text);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const argsStr = toolCall?.function?.arguments ?? "{}";

    let parsed: { matches?: Array<{ id: string; score: number; reason: string }> } = {};
    try {
      parsed = JSON.parse(argsStr);
    } catch (e) {
      console.error("Failed to parse tool args:", e, argsStr);
    }

    const matches = (parsed.matches ?? [])
      .filter((m) => validIds.has(m.id))
      .slice(0, 5);

    return new Response(JSON.stringify({ matches }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("decision-search-ai error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
