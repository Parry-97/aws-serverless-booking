// Set the region
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// call S3 to retrieve upload file to specified bucket

// Configure the file stream and obtain the upload parameters
export async function handler(event, _context) {
  AWS.config.update({ region: process.env.REGION });

  // Create S3 service object
  var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

  // Create S3 service object

  var json = event.Records[0].Sns.Message;
  console.log("invoice: ", json);
  var uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: "invoice_" + new Date().toUTCString() + ".json",
    Body: json,
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    console.log("Upload Success", data.Location);
  } catch (err) {
    console.log(err);
  }
}
