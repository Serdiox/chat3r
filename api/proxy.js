export default async function handler(req, res) {
  // The base URL for your ngrok endpoint.
  const baseURL = "https://a766-121-200-55-39.ngrok-free.app";
  
  // Get the requested path from the query string.
  // This could be empty if no extra path is provided.
  const urlPath = req.query.url || "";
  
  // Construct the full URL to fetch.
  const targetUrl = baseURL + urlPath;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      // Add the header required to bypass the ngrok warning.
      headers: {
        ...req.headers,
        "ngrok-skip-browser-warning": "1",
        // Optionally, you can set a custom User-Agent:
        // "User-Agent": "MyCustomUserAgent"
      }
    });
    
    // Set the content-type from the response.
    res.setHeader("Content-Type", response.headers.get("content-type") || "text/html");
    
    // Pass along the response body.
    const body = await response.text();
    res.status(response.status).send(body);
  } catch (error) {
    res.status(500).json({ error: "Proxy Error: " + error.message });
  }
}
