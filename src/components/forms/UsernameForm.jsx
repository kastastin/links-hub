"use client";

import { useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import grabUsername from "@/actions/grabUsername";
import { SubmitButton } from "@/components/buttons/SubmitButton";

export function UsernameForm({ desiredUsername }) {
	const [isUsernameTaken, setIsUsernameTaken] = useState(false);

	async function handleSubmit(formData) {
		const result = await grabUsername(formData);

		// if result is false, then the username is already taken
		setIsUsernameTaken(!result);

		// redirect to /account/:username if the username is not taken
		if (result) redirect(`/account/${formData.get("username")}`);
	}

	return (
		<form className="mx-auto max-w-xs space-y-2" action={handleSubmit}>
			<input
				autoFocus
				type="text"
				name="username"
				placeholder="username"
				defaultValue={desiredUsername}
				className="w-full rounded-md border p-2 text-center text-lg font-medium shadow-inner-bottom"
			/>

			{isUsernameTaken && (
				<div className="flex items-center justify-center gap-x-2 rounded-md bg-red-400/15 p-2 text-red-500">
					<Image
						src="/exclamation-triangle.svg"
						alt="Exclamation triangle"
						width={25}
						height={25}
					/>

					<p>Username has already used</p>
				</div>
			)}

			<SubmitButton>
				Set Username
				<Image src="/arrow-right.svg" alt="Logout" width={25} height={25} />
			</SubmitButton>
		</form>
	);
}
