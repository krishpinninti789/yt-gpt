import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import NetworkStatus from "./components/NetworkStatus";
import TopLoaderProvider from "./components/loading-ui/TopLoaderProvider";
import MobileBottomBar from "./components/MobileBottomBar";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Vidora",
  description: "Watch. Explore. Understand.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lexendDeca.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <Suspense fallback={null}>
          <TopLoaderProvider>
            <NetworkStatus />
            {children}
          </TopLoaderProvider>
          <MobileBottomBar />
        </Suspense>
      </body>
    </html>
  );
}
