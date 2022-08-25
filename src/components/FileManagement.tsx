import ReactS3Client from 'react-aws-s3-typescript';
import React from "react";

const s3Config = {
    bucketName: process.env.bucket_name!,
    region: process.env.region!,
    accessKeyId: process.env.accessKeyId!,
    secretAccessKey: process.env.secretAccessKey!,
}

const s3 = new ReactS3Client(s3Config)

const uploadFile = async (file: File) => {


    try {
        const res = await s3.uploadFile(file);
        console.log(res.location)
        return (res.location)
    } catch (exception) {
        console.log(exception)
        return ("Error")
    }
}

const deleteFile = async (name: string) => {
    try {
        await s3.deleteFile(name);
        return ("File Deleted")
    } catch (exception) {
        console.log(exception)
        return ("Error")
    }
}

export { uploadFile, deleteFile }