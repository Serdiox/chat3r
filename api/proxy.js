export default async function handler(req, res) {
    const response = await fetch("https://a766-121-200-55-39.ngrok-free.app");
    const body = await response.text();
    
    res.setHeader("Content-Type", "text/html");
    res.send(body);
}
