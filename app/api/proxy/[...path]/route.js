export async function GET(req) {
  const path = req.url.replace(/.*\/api\/proxy/, "");
  console.log("pathliho", path);
  // Respond with the stream
  return fetch("https://api.evaengine.ai" + path, {
    method: "GET",
    headers: req.headers,
  });
}

export async function POST(req) {
  const path = req.url.replace(/.*\/api\/proxy/, "");
  const requestBody = req.body;

  console.log("ssreq.body", req.body);
  // Respond with the stream
  const response = await fetch("https://api.evaengine.ai" + path, {
    method: "POST",
    headers: req.headers,
    body: requestBody, // Pass the stream directly
    duplex: "half",
  });
  const responseData = await response.json();
  return new Response(JSON.stringify(responseData), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
