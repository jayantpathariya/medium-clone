import AnimationWrapper from "@/components/shared/animation-wrapper";
import Form from "./form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <AnimationWrapper>
      <section className="h-cover flex items-center justify-center">
        <Form />
      </section>
    </AnimationWrapper>
  );
};

export default SignUpPage;
