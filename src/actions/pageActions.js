"use server";

import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { Page } from "@/models/Page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function savePageSettings(formData) {
	mongoose.connect(process.env.MONGODB_URI);

	const session = await getServerSession(authOptions);

	if (!session) return false;

	const displayName = formData.get("displayName");
	const location = formData.get("location");
	const bio = formData.get("bio");

	await Page.updateOne(
		{ owner: session?.user?.email },
		{ displayName, location, bio },
	);

	return true;
}
