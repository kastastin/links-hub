import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "@/components/buttons/Logout";

export async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header className="flex items-center justify-between border-b px-10 py-4">
			<Link href="/">
				<Image
					src="/logo-transparent-bg-cutted.svg"
					alt="Logo"
					width={190}
					height={60}
				/>
			</Link>

			<nav className="space-x-7 text-xl font-medium">
				<Link href="/about">About</Link>
				<Link href="/pricing">Pricing</Link>
				<Link href="/contact">Contact</Link>

				{!session ? (
					<Link href="/login" className="rounded-md bg-[#F7961E] px-3 py-1">
						Login
					</Link>
				) : (
					<div className="inline-flex gap-x-5">
						<Link href="/account" className="rounded-md bg-[#F7961E] px-3 py-1">
							Account
						</Link>

						<LogoutButton />
					</div>
				)}
			</nav>
		</header>
	);
}

// added Google Auth + MongoDB
