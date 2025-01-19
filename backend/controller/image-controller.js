

import dotenv from 'dotenv';
dotenv.config({
     path: "./.env"
});


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