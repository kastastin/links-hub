import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import uniqid from "uniqid";

import {
	getPreviewedBgImageLink,
	updatePreviewedBgImageLink,
} from "@/actions/pageActions";
import { deleteImage } from "@/actions/deleteImage";

export async function POST(req) {
	const formData = await req.formData();
	const bucketName = process.env.S3_BUCKET_NAME;

	const s3Client = new S3Client({
		region: "eu-north-1",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		},
	});

	const file = formData.get("file");
	const previewedBgImageLink = await getPreviewedBgImageLink();

	const randomId = uniqid();
	const extension = file.name.split(".").pop();
	const newFileName = `${randomId}.${extension}`;

	const chunks = [];
	for await (const chunk of file.stream()) {
		chunks.push(chunk);
	}

	await s3Client.send(
		new PutObjectCommand({
			Bucket: bucketName,
			ACL: "public-read",
			ContentType: file.type,
			Key: newFileName,
			Body: Buffer.concat(chunks),
		}),
	);

	if (previewedBgImageLink) await deleteImage();

	await updatePreviewedBgImageLink(newFileName);

	const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;

	return Response.json(link);
}
