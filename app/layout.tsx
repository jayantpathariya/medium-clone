import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/Providers/session-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Medium",
  description: "Medium is a place to write, read, and connect.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Toaster />
        <SessionProvider session={session}>
          <Navbar />
        </SessionProvider>
        {children}
      </body>
    </html>
  );
}
