import { configDotenv } from "dotenv";
import fetch from "node-fetch";
configDotenv();

class InvalidInputError {
  constructor(message) {
    this.name = "InvalidInputError";
    this.message = message;
  }
}
InvalidInputError.prototype = new Error();

class TransientError {
  constructor(message) {
    (this.name = "TransientError"), (this.message = message);
  }
}
TransientError.prototype = new Error();

export async function handler(event, _context) {
  const response = await fetch(`${process.env.WEBSERVICE_URL}/hotel`, {
    method: "POST",
    body: JSON.stringify(event),
  });
  let json = await response.json();
  if (response.ok) {
    return json;
  } else if (response.status == 418) {
    throw new InvalidInputError(JSON.stringify(json));
  } else if (response.status == 503) {
    throw new TransientError("transient error");
  }
  throw new Error("Error occured");
}
