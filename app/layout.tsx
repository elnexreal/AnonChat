import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnonChat",
  description: "Ever wanted to speak with other people anonymously?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
