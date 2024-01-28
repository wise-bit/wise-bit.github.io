import dotenv from 'dotenv';
import AWS from 'aws-sdk';

export default function handler(_req: any, res: any) {
  dotenv.config();
  try {
    const s3 = new AWS.S3({
      signatureVersion: 'v4',
      region: 'ca-central-1',
    });
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'satrajit-resume.pdf',
      ResponseContentType: 'application/pdf',
      Expires: 60 * 5, // expiry time in seconds
    });
    res.status(200).json({ url });
  } catch (error) {
    console.error('Error generating S3 link:', error);
    res.status(500).json({
      error: 'Failed to generate S3 link',
    });
  }
}
