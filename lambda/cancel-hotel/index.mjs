import { configDotenv } from "dotenv";
import fetch from "node-fetch";
configDotenv();

export async function handler(event, _context) {
  const response = await fetch(`${process.env.WEBSERVICE_URL}/hotel`, {
    method: "DELETE",
    body: JSON.stringify(event),
  });
  let json = await response.json();
  return json;
}
