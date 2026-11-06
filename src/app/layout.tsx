import type { Metadata } from "next";
import { Anton, DM_Sans } from "next/font/google";
import { copy } from "@/content/copy";
import "./globals.css";

const anton = Anton({
  variable: "--font-wordmark",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${anton.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
