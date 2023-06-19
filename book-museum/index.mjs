import fetch from "node-fetch";
import { config } from "dotenv";
config();

export async function handler(event, context) {
  console.log("Calling the museum webservice");
  const response = await fetch(`${process.env.WEBSERVICE_URL}/museum`, {
    method: "POST",
    body: JSON.stringify({
      museum_name: "Tate Gallery",
      buyer_id: "john",
      when: "2021-01-01",
    }),
  });
  const data = await response.json();
  let json = JSON.stringify(data);
  console.log("Response from the muserum webservice: " + json);
  return {
    statusCode: 200,
    body: json,
  };
}
