import Input from "@/components/input";
import AnimationWrapper from "@/components/shared/animation-wrapper";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  return (
    <AnimationWrapper>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
          <h1 className="mb-24 text-center font-gelasio text-4xl capitalize">
            Welcome back
          </h1>

          <Input name="email" type="email" placeholder="Email" icon="Mail" />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon="KeyRound"
          />

          <button type="submit" className="btn-dark center mt-14">
            Sign In
          </button>

          <div className="relative my-10 flex w-full items-center gap-2 font-bold uppercase text-black opacity-10">
            <hr className="w-1/2 border-black" />
            <p>Or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark center flex w-[90%] items-center justify-center gap-4">
            <Image
              src="/images/google.png"
              width={5}
              height={5}
              alt="google icon"
              className="w-5"
            />
            Continue with google
          </button>

          <p className="mt-6 text-center text-xl text-dark-grey">
            Don&apos;t have an account ?
            <Link href="/sign-up" className="ml-1 text-xl text-black underline">
              Join us today
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default SignInPage;
