"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function HeroForm({ user }) {
	const router = useRouter();

	useEffect(() => {
		if (
			"localStorage" in window &&
			window.localStorage.getItem("desiredUsername")
		) {
			const username = window.localStorage.getItem("desiredUsername");

			window.localStorage.removeItem("desiredUsername");

			redirect(`/account?desiredUsername=${username}`);
		}
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		const username = e.target.querySelector("input").value;

		if (username.length === 0) return;

		// if user is already signed in, redirect
		if (user) {
			router.push(`/account?desiredUsername=${username}`);
		} else {
			window.localStorage.setItem("desiredUsername", username);
			await signIn("google");
		}
	}

	return (
		<form className="flex max-w-[530px] items-center" onSubmit={handleSubmit}>
			{/* TODO: https://www.domain.com/registration/?flow=jdomainDFE&endpoint=jarvis&search=links-hub#/jdomainDFE/1 */}
			<span className="flex-none rounded-l-md bg-slate-100 py-2 pl-2 pr-[1px] text-lg font-medium shadow-inner-bottom">
				links-hub.me/
			</span>
			<input
				type="text"
				placeholder="username"
				className="mr-2 flex-1 rounded-r-md bg-slate-100 py-2 pr-2 text-lg font-medium shadow-inner-bottom focus:outline-none"
			/>
			<button
				type="submit"
				className="flex-none rounded-md bg-[#F7961E] px-3 py-2 text-xl font-medium"
			>
				Get Started
			</button>
		</form>
	);
}
