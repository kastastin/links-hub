import { Nunito } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "@/components/buttons/Logout";

import "../globals.css";

const fontFamily = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "LinksHub",
	description:
		"LinksHub: Your one-stop hub for managing and sharing all your links. Simplify your digital life with LinksHub.",
};

export default async function AppLayout({ children }) {
	const session = await getServerSession(authOptions);

	if (!session) return redirect("/");

	return (
		<html lang="en">
			<body className={`${fontFamily.className} flex min-h-screen`}>
				<aside className="flex w-48 flex-col bg-blue-100 p-4 shadow-inner">
					{/* Avatar */}
					<div className="relative mx-auto size-24 overflow-hidden rounded-full">
						<Image src={session?.user?.image} alt="Avatar" fill />
					</div>

					<div className="grow text-center">
						<nav className="inline-flex h-full flex-col gap-y-5">
							{/* My page */}
							<Link href="/account" className="mt-8 flex items-center gap-x-1">
								<Image
									src="/page-icon.svg"
									alt="My page icon"
									width={25}
									height={25}
								/>
								<span className="text-xl font-medium">My page</span>
							</Link>

							{/* Analytics */}
							<Link href="/analytics" className="flex items-center gap-x-1">
								<Image
									src="/analytics-icon.svg"
									alt="Analytics icon"
									width={25}
									height={25}
								/>
								<span className="text-xl font-medium">Analytics</span>
							</Link>

							<LogoutButton variant="navLink" />

							{/* Back to website */}
							<Link href="/" className="mt-auto flex items-center gap-x-1">
								<Image
									src="/arrow-right.svg"
									alt="Left arrow icon"
									width={20}
									height={20}
									className="rotate-180"
								/>
								<span className="text-sm font-medium">Back to website</span>
							</Link>
						</nav>
					</div>
				</aside>
				<main className="grow">
					<div className="m-8 rounded-md bg-slate-100 p-4 shadow-inner">
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
