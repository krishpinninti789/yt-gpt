import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import NetworkStatus from "./components/NetworkStatus";
import SideBar from "./components/SideBar";
import AppShell from "./components/AppShell";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YT-GPT",
  description: "Youtube with GPT features",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lexendDeca.variable} h-full antialiased`}>
      <body className="min-h-full bg-black">
        <NetworkStatus />

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
