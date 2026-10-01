import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobzapp — Trusted local services marketplace",
  description: "Find trusted local professionals, compare offers, schedule work, and pay securely.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
