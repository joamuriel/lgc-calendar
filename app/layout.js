import { DM_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NavLinks } from "./ui/nav-links";
import { Footer } from "./ui/footer"

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "LGC Calendar",
  description: "LGC Calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavLinks />
        <main className="px-3 py-2">
        {children}
        <Footer />
        </main>
      </body>
    </html>
  );
}
