import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const inter = Inter({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata = {
	title: "Wordle Hub",
	description: "The one-stop-shop for Wordle Analysis",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} antialiased flex flex-col justify-between w-screen h-screen`}
			>
				<Header />
				{children}
				<div className="w-full flex flex-row justify-between pb-2 opacity-50 text-sm">
					<span className="w-1/3 text-left pl-4">
						<a href="https://github.com/EvanZhouDev/wordle-hub?tab=GPL-3.0-1-ov-file">
							License
						</a>
					</span>
					<span className="w-1/3 text-center">
						Not affiliated with New York Times
					</span>
					<span className="w-1/3 text-right pr-4">
						<a href="https://github.com/EvanZhouDev/wordle-hub">
							In-Dev Release
						</a>
					</span>
				</div>
			</body>
		</html>
	);
}
