import { getServerSession } from "next-auth";

import Navbar from "@/components/navbar";
import SessionProvider from "@/providers/session-provider";
import { authOptions } from "../api/auth/[...nextauth]/route";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
      </SessionProvider>
      {children}
    </>
  );
};

export default AuthLayout;
