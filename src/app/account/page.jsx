import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UsernameForm } from "@/components/forms/UsernameForm";

export default async function AccountPage({ searchParams }) {
	const session = await getServerSession(authOptions);

	if (!session) redirect("/");

	const { desiredUsername } = searchParams;

	return (
		<section className="pt-10">
			<h1 className="mb-5 text-center text-4xl font-bold">Choose your username</h1>

			<p className="mb-6 text-center text-slate-500">
				This username will be used in the URL to access your links.
			</p>

			<UsernameForm desiredUsername={desiredUsername} />
		</section>
	);
}
