"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

export function LogoutButton() {
	return (
		<button onClick={() => signOut({ callbackUrl: "/" })}>
			<Image src="/logout.svg" alt="Logout" width={30} height={30} />
		</button>
	);
}
