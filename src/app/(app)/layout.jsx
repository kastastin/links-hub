import { Nunito } from "next/font/google";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AppSidebar } from "@/components/layout/AppSidebar";

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
			<body className={`${fontFamily.className} flex h-screen`}>
				<Toaster position="top-right" />

				<AppSidebar user={session?.user} />

				<main className="grow overflow-y-auto">{children}</main>
			</body>
		</html>
	);
}
