import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobzapp — Get the right professional for the job",
  description: "A modern marketplace for trusted local professionals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}