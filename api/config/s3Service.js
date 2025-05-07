import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";

// Configure S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Upload file to S3
export const uploadToS3 = async (filePath, fileName) => {
  const fileStream = fs.createReadStream(filePath);

  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: fileStream,
      },
    });

    const result = await upload.done();
    return result.Location;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err;
  }
};

// Delete file from S3
export const deleteFromS3 = async (fileUrl) => {
  const fileName = fileUrl.split("/").pop();

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
      })
    );
  } catch (err) {
    console.error("Error deleting from S3:", err);
    throw err;
  }
};
