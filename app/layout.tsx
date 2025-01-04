import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastWrapper } from "@/components/ui/toast-wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EVA Engine",
  description: "A Decentralized Framework for Real-Time AI Agent Evaluation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-[#FFF8F8] relative flex flex-col`}
      >
        <ToastWrapper>
          <Header className="relative" />
          <main className="flex-1 flex flex-col relative z-10">
            {children}
          </main>
          <Footer />
        </ToastWrapper>
      </body>
    </html>
  );
}
