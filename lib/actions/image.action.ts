"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getImageUrl(type: string, size: number) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${nanoid(10)}.${type.split("/")[1]}`,
    ContentType: type,
    ContentLength: size,
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 60,
  });

  return signedUrl.split("?")[0];
}
