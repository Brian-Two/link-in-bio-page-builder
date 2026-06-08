import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link-in-Bio Page Builder",
  description: "A focused foundation for creator link pages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
