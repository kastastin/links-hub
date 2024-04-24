"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { User } from "@/models/User";
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

	await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);

	if (formData.has("avatar")) {
		const avatarLink = formData.get("avatar");

		await User.updateOne(
			{ email: session?.user?.email },
			{ image: avatarLink },
		);
	}

	revalidatePath("/account");

	return true;
}
