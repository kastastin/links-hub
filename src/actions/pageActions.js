"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

import { Page } from "@/models/Page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteImage } from "@/actions/deleteImage";

export async function getPageSettings(email) {
	mongoose.connect(process.env.MONGODB_URI);

	const pageSettings = await Page.findOne({ owner: email });

	return pageSettings;
}

export async function savePageSettings(formData) {
	mongoose.connect(process.env.MONGODB_URI);

	const session = await getServerSession(authOptions);

	if (!session) return false;

	const dataKeys = [
		"displayName",
		"location",
		"bio",
		"bgType",
		"bgColor",
		"bgImage",
	];
	const dataToUpdate = {};

	for (const key of dataKeys) {
		if (formData.has(key)) {
			dataToUpdate[key] = formData.get(key);
		}
	}

	const existingBgImageLink = await getBgImageLink();
	if (existingBgImageLink) {
		await deleteImage(existingBgImageLink.split("/").pop());
	}

	await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);
	await updatePreviewedBgImageLink("");

	if (!session) return false;

	revalidatePath("/account");

	return true;
}

export async function getBgImageLink() {
	mongoose.connect(process.env.MONGODB_URI);

	const session = await getServerSession(authOptions);

	if (!session) return false;

	const link = await Page.findOne({ owner: session?.user?.email });

	return link?.bgImage;
}

export async function getPreviewedBgImageLink() {
	mongoose.connect(process.env.MONGODB_URI);

	const session = await getServerSession(authOptions);

	if (!session) return false;

	const link = await Page.findOne({ owner: session?.user?.email });

	return link?.previewedBgImageLink;
}

export async function updatePreviewedBgImageLink(value) {
	mongoose.connect(process.env.MONGODB_URI);

	const session = await getServerSession(authOptions);

	if (!session) return false;

	await Page.updateOne(
		{ owner: session?.user?.email },
		{ previewedBgImageLink: value },
	);

	return true;
}
