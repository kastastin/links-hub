"use server";

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

import { getPreviewedBgImageLink } from "@/actions/pageActions";

export async function deleteImage(imageName) {
	const bucketName = process.env.S3_BUCKET_NAME;
	const previewedBgImageLink = await getPreviewedBgImageLink();
	
  if (previewedBgImageLink) {
    const oldFileName = previewedBgImageLink.split("/").pop();

		const s3Client = new S3Client({
			region: "eu-north-1",
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
			},
		});

		await s3Client.send(
			new DeleteObjectCommand({
				Bucket: bucketName,
				Key: imageName ? imageName : oldFileName,
			}),
		);
  }
}
