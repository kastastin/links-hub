"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FileText, TrendingUp } from "lucide-react";

import { LogoutButton } from "@/components/buttons/Logout";

export function AppSidebar({ user }) {
	const path = usePathname();

	return (
		<aside className="sticky flex w-48 flex-col bg-blue-50 p-4 pt-6 shadow-inner">
			{/* Avatar */}
			<div className="relative mx-auto size-24 overflow-hidden rounded-full">
				<Image src={user?.image} alt="Avatar" fill objectFit="cover" />
			</div>

			<div className="grow text-center">
				<nav className="inline-flex h-full flex-col gap-y-5">
					{/* My page */}
					<Link
						href="/account"
						className={`mt-8 flex items-center gap-x-1 ${path === "/account" ? "text-[#F7961E]" : "text-black"}`}
					>
						<FileText
							color={path === "/account" ? "#F7961E" : "black"}
							size={25}
						/>
						<span className="text-xl font-medium">My page</span>
					</Link>

					{/* Analytics */}
					<Link
						href="/analytics"
						className={`flex items-center gap-x-1 ${path === "/analytics" ? "text-[#F7961E]" : "text-black"}`}
					>
						<TrendingUp
							color={path === "/analytics" ? "#F7961E" : "black"}
							size={25}
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
	);
}
