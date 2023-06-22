import fetch from "node-fetch";
import { config } from "dotenv";
config();

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

export async function handler(event, context) {
  console.log("Calling the museum webservice");
  const response = await fetch(`${process.env.WEBSERVICE_URL}/museum`, {
    method: "POST",
    body: JSON.stringify(event),
  });
  const data = await response.json();
  console.log("Response from the museum webservice: " + json);
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
