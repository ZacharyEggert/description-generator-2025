import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./Header";

export const metadata: Metadata = {
  title: "Description Generator",
  description: "A guitar description generator, sponsored by Diablo Guitars",
  authors: [
    { name: "Zachary Eggert", url: "https://github.com/ZacharyEggert" },
  ],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-red-900 dark:bg-neutral-800">
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
