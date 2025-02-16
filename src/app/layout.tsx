import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Realtime API Agentdasdasdaås",
  description: "A demo app from OpenAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <header className="w-full p-4 bg-gray-100 border-b">
        </header>
        {children}
      </body>
    </html>
  );
}
