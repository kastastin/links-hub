"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

import { Page } from "@/models/Page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getPageSettings(email) {
	mongoose.connect(process.env.MONGODB_URI);

	const pageSettings = await Page.findOne({ owner: email });

	return pageSettings;
}

export async function savePageSettings(formData) {
	mongoose.connect(process.env.MONGODB_URI);

	const session = await getServerSession(authOptions);

	if (!session) return false;

	const displayName = formData.get("displayName");
	const location = formData.get("location");
	const bio = formData.get("bio");
	const bgType = formData.get("bgType");

	await Page.updateOne(
		{ owner: session?.user?.email },
		{ displayName, location, bio, bgType },
	);

	revalidatePath("/account");

	return true;
}
