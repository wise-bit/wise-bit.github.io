import dotenv from 'dotenv';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config();

const s3 = new S3Client({
  region: 'ca-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(_req: any, res: any) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'satrajit-resume.pdf',
      ResponseContentType: 'application/pdf',
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

    res.status(200).json({ url });
  } catch (error) {
    console.error('Error generating S3 link:', error);
    res.status(500).json({
      error: 'Failed to generate S3 link',
    });
  }
}
