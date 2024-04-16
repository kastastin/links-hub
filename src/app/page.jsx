import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HeroForm } from "@/components/forms/HeroForm";

export default async function HomePage() {
	const session = await getServerSession(authOptions);

	return (
		<section className="pt-32">
			<div className="mb-6 max-w-[530px]">
				<h1 className="mb-6 text-6xl font-black">
					Central Links Hub for Your Web Identity
				</h1>

				<p className="text-xl text-slate-500">
					Showcase your social media profiles, projects, articles, and contact
					information in one cohesive platform.
				</p>
			</div>

			<HeroForm user={session?.user} />
		</section>
	);
}
