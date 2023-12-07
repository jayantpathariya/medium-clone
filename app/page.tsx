import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Button from "@/components/shared/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  return (
    <div>
      <Button />
    </div>
  );
}
