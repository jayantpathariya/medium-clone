import { getServerSession } from "next-auth";

type SignedInProps = {
  children: React.ReactNode;
};

export const SignedIn = async ({ children }: SignedInProps) => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  return <>{children}</>;
};
