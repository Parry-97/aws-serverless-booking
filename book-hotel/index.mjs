import { configDotenv } from "dotenv";
import fetch from "node-fetch";
configDotenv();

export async function handler(_event, _context) {
  const response = await fetch(`${process.env.WEBSERVICE_URL}/hotel`, {
    method: "POST",
    body: JSON.stringify({
      buyer_id: "mariano",
      start_date: "2021-01-01",
      end_date: "2021-01-02",
      near: "tate gallery",
    }),
  });
  const data = await response.json();
  return data;
}
