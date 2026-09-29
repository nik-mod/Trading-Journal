import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nika’s TradeTrack — Trading Journal",
  description: "Your trades, your process, your progress. A private trading journal.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
