// Initialize AWS SDK and get signed URLs for uploading images to S3
// This function will be called when the user requests to upload an image
// The function will return a signed URL that the user can use to upload the image to S3
// The signed URL will be  valid for 60 seconds
// The function will return an array of signed URLs for all the images that the user wants to upload
// The function will return an error if it fails to get the signed URLs
// The function will use the AWS SDK to interact with S3


import dotenv from 'dotenv';
dotenv.config();


import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export const getSignedUrls = async (req, res) => {
    const { files } = req.body; // Expecting an array of files with fileName and fileType
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESSKEYID,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY,
        region: process.env.AWS_REGION,
    });

    try {
        const signedUrls = await Promise.all(files.map(async (file) => {
            const key = `${uuidv4()}/${file.fileName}`;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                ContentType: file.fileType,
                Key: key,
                Expires: 60
            };
            const url = await s3.getSignedUrlPromise('putObject', params);
            return { key, url };
        }));

        res.json(signedUrls);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get signed URLs', details: err.message });
    }
};