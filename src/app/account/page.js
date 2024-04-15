import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AccountPage({ searchParams }) {
	const session = await getServerSession(authOptions);

	if (!session) redirect("/");

	const { desiredUsername } = searchParams;

	return (
		<div>
			Account Page: {session?.user?.name}, desiredUsername: {desiredUsername}
		</div>
	);
}
