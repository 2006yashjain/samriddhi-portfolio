import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SystemProvider } from "@/lib/systemContext";

export const metadata: Metadata = {
  title: "Samriddhi Sharma — Interactive OS Portfolio",
  description: "Personal interactive operating system portfolio of Samriddhi Sharma, Computer Science Engineering student at JECRC University, Jaipur.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen w-screen overflow-hidden bg-[#090b10] antialiased">
        <SystemProvider>{children}</SystemProvider>
      </body>
    </html>
  );
}
