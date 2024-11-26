import { type Metadata } from "next";

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
  return <>{children}</>;
}
