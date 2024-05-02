import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NavLinks } from "./ui/nav-links";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LGC Calendar",
  description: "LGC Calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavLinks />

        <main className="flex min-h-screen flex-col items-center justify-center p-12 md:p-24 gap-12">
        {children}
        </main>
      </body>
    </html>
  );
}
