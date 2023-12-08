"use client";

import Link from "next/link";

import Input from "@/components/input";
import Image from "next/image";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/lib/validation";
import z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Form = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      console.log(response);

      if (response?.ok) {
        router.push("/");
        router.refresh();
      } else {
        if (response?.error) {
          toast.error(response?.error);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong email or password");
    }
  };

  const onError: SubmitErrorHandler<z.infer<typeof SignInSchema>> = (error) => {
    const errorArray = Object.values(error);
    if (errorArray.length > 0 && errorArray[0].message) {
      toast.error(errorArray[0].message);
    }
  };

  return (
    <form
      className="w-[80%] max-w-[400px]"
      onSubmit={form.handleSubmit(onSubmit, onError)}
    >
      <h1 className="mb-24 text-center font-gelasio text-4xl capitalize">
        Welcome back
      </h1>

      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <Input type="email" placeholder="Email" icon="Mail" {...field} />
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field }) => (
          <Input
            type="password"
            placeholder="Password"
            icon="KeyRound"
            {...field}
          />
        )}
      />

      <button type="submit" className="btn-dark center mt-14">
        Sign In
      </button>

      <div className="relative my-10 flex w-full items-center gap-2 font-bold uppercase text-black opacity-10">
        <hr className="w-1/2 border-black" />
        <p>Or</p>
        <hr className="w-1/2 border-black" />
      </div>

      <button
        type="button"
        className="btn-dark center flex w-[90%] items-center justify-center gap-4"
        onClick={() => signIn("google")}
      >
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
  );
};

export default Form;
