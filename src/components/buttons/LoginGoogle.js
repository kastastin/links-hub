"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export function LoginGoogle() {
	return (
		<button
			className="flex w-full items-center justify-center gap-x-2 rounded-md bg-[#F7961E] px-3 py-2 text-xl font-medium"
			onClick={() => signIn("google", { callbackUrl: "/account" })}
		>
			<Image src="/google-logo.svg" alt="Google Logo" width={25} height={25} />
			Login with Google
		</button>
	);
}
