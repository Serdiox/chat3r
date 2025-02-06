export default async function handler(req, res) {
    const targetBaseUrl = "https://a766-121-200-55-39.ngrok-free.app";

    let targetUrl = targetBaseUrl;
    if (req.query.url) {
        targetUrl += `/${req.query.url}`;
    }

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(targetBaseUrl).host
            }
        });

        let body = await response.text();
        const contentType = response.headers.get("content-type");

        // Fix Ngrok redirection issue
        if (contentType && contentType.includes("text/html")) {
            body = body.replace(/window\.location\.href\s*=\s*['"](.*?)['"];/g, `console.log("Blocked Ngrok redirect");`);
            body = body.replace(/<meta[^>]*http-equiv=["']refresh["'][^>]*>/gi, "");
        }

        res.setHeader("Content-Type", contentType);
        res.status(200).send(body);
    } catch (error) {
        res.status(500).send("Proxy Error: " + error.message);
    }
}
