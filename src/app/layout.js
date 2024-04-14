import { Nunito } from "next/font/google";
import "./globals.css";

const fontFamily = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "LinksHub",
	description:
		"LinksHub: Your one-stop hub for managing and sharing all your links. Simplify your digital life with LinksHub.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={fontFamily.className}>{children}</body>
		</html>
	);
}
