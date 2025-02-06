export default async function handler(req, res) {
    const targetUrl = "https://a766-121-200-55-39.ngrok-free.app" + req.url.replace("/api/proxy", "");

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(targetUrl).host
            }
        });

        const contentType = response.headers.get("content-type");
        res.setHeader("Content-Type", contentType);
        
        const body = await response.text();
        res.status(response.status).send(body);
    } catch (error) {
        res.status(500).send("Proxy Error: " + error.message);
    }
}
