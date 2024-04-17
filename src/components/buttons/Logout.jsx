"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

export function LogoutButton({ variant }) {
	if (variant === "navLink") {
		return (
			<button
				type="button"
				className="flex items-center gap-x-1"
				onClick={() => signOut({ callbackUrl: "/" })}
			>
				<Image src="/logout.svg" alt="Logout icon" width={25} height={25} />
				<span className="text-xl font-medium">Logout</span>
			</button>
		);
	}

	return (
		<button onClick={() => signOut({ callbackUrl: "/" })}>
			<Image src="/logout.svg" alt="Logout" width={30} height={30} />
		</button>
	);
}
