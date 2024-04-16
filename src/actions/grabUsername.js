"use server";

import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { Page } from "@/models/Page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function grabUsername(formData) {
	const username = formData.get("username");

	mongoose.connect(process.env.MONGODB_URI);

	const existingPage = await Page.findOne({ uri: username });
	if (existingPage) return false;

	const session = await getServerSession(authOptions);

	const newPage = await Page.create({
		uri: username,
		owner: session?.user?.email,
	});

	return newPage.toObject();
}
