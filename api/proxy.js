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

        let body = await response.text();
        const contentType = response.headers.get("content-type");

        // If it's an HTML response, modify it to remove Ngrok's confirmation page
        if (contentType && contentType.includes("text/html")) {
            body = body.replace(/window.location.href\s*=\s*['"](https?:\/\/.*?)['"];/g, `
                window.location.href = "/api/proxy$1";
            `);
            body = body.replace(/<a[^>]*href="(https?:\/\/.*?)"[^>]*>/g, '<a href="/api/proxy$1">');
        }

        res.setHeader("Content-Type", contentType);
        res.status(200).send(body);
    } catch (error) {
        res.status(500).send("Proxy Error: " + error.message);
    }
}
