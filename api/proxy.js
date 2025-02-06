export default async function handler(req, res) {
    try {
        const response = await fetch("https://a766-121-200-55-39.ngrok-free.app");
        const body = await response.text();

        res.setHeader("Content-Type", "text/html");
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        res.setHeader("Access-Control-Allow-Methods", "GET");

        res.status(200).send(body);
    } catch (error) {
        res.status(500).send("Error fetching content");
    }
}
