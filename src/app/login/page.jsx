import { LoginGoogle } from "@/components/buttons/LoginGoogle";

export default function LoginPage() {
	return (
		<section className="pt-10">
			<div className="mx-auto max-w-xs  p-4">
				<h1 className="mb-5 text-center text-4xl font-bold">Login</h1>

				<LoginGoogle />
			</div>
		</section>
	);
}
