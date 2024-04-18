import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { Page } from "@/models/Page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { UsernameForm } from "@/components/forms/UsernameForm";
import { SettingsForm } from "@/components/forms/SettingsForm";

export default async function AccountPage({ searchParams }) {
	const session = await getServerSession(authOptions);

	const { desiredUsername } = searchParams;

	mongoose.connect(process.env.MONGODB_URI);

	const page = await Page.findOne({ owner: session?.user?.email });

	if (page) {
		// Convert the Mongoose document to a plain object
		const pageObject = page.toObject();

		// Convert '_id' to a string
		pageObject._id = pageObject._id.toString();

		return <SettingsForm user={session?.user} page={pageObject} />;
	}

	return (
		<section className="pt-10">
			<h1 className="mb-5 text-center text-4xl font-bold">
				Choose your username
			</h1>

			<p className="mb-6 text-center text-slate-500">
				This username will be used in the URL to access your links.
			</p>

			<UsernameForm desiredUsername={desiredUsername} />
		</section>
	);
}
