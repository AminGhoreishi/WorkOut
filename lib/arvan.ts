import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const arvanClient = new S3Client({
  region: "ir-thr-at1",
  endpoint: process.env.ARVAN_S3_ENDPOINT || process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: (process.env.ARVAN_S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY_ID)!,
    secretAccessKey: (process.env.ARVAN_S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_ACCESS_KEY)!,
  },
});

export async function uploadFileToS3(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop() || "mp4";
  const cleanFolder = folder.endsWith("/") ? folder : `${folder}/`;
  const fileKey = `${cleanFolder}${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;

  const bucket = process.env.ARVAN_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME!;
  const publicUrl = process.env.ARVAN_S3_PUBLIC_URL || process.env.S3_PUBLIC_URL!;

  await arvanClient.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  return `${publicUrl}/${fileKey}`;
}

export async function deleteFileFromS3(fileUrl: string): Promise<boolean> {
  if (!fileUrl) return false;
  const publicUrl = process.env.ARVAN_S3_PUBLIC_URL || process.env.S3_PUBLIC_URL || "";
  const bucket = process.env.ARVAN_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME!;
  if (publicUrl && fileUrl.includes(publicUrl)) {
    const fileKey = fileUrl.split(`${publicUrl}/`)[1];
    if (fileKey) {
      try {
        await arvanClient.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: fileKey,
          }),
        );
        return true;
      } catch (error) {
        return false;
      }
    }
  }
  return false;
}


