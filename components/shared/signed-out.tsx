import { getServerSession } from "next-auth";

type SignedOutProps = {
  children: React.ReactNode;
};

export const SignedOut = async ({ children }: SignedOutProps) => {
  const session = await getServerSession();

  if (session) {
    return null;
  }

  return <>{children}</>;
};
