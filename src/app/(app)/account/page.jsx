import { getServerSession } from "next-auth";

import { getPageSettings } from "@/actions/pageActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { SectionBox } from "@/components/layout/SectionBox";
import { SettingsForm } from "@/components/forms/SettingsForm";
import { UsernameForm } from "@/components/forms/UsernameForm";

export default async function AccountPage({ searchParams }) {
	const session = await getServerSession(authOptions);

	const pageSettings = await getPageSettings(session?.user?.email);

	if (pageSettings) {
		// Convert the Mongoose document to a plain object
		const pageSettingsObject = pageSettings.toObject();

		// Convert '_id' to a string
		pageSettingsObject._id = pageSettingsObject._id.toString();

		return (
			<>
				<SectionBox>
					<SettingsForm
						user={session?.user}
						pageSettings={pageSettingsObject}
					/>
				</SectionBox>
			</>
		);
	}

	const { desiredUsername } = searchParams;

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
