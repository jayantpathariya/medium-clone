"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import Image from "next/image";
import z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SignUpSchema } from "@/lib/validation";

import Input from "@/components/input";
import toast from "react-hot-toast";

const Form = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    try {
      const response = await axios.post("/api/auth/sign-up", values);

      const data = response.data;

      toast.success(data.message);
      router.push("/sign-in");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    }
  };

  return (
    <form
      className="w-[80%] max-w-[400px]"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h1 className="mb-24 text-center font-gelasio text-4xl capitalize">
        Join us today
      </h1>

      <Controller
        name="fullname"
        control={form.control}
        render={({ field }) => (
          <Input placeholder="Fullname" icon="UserRound" {...field} />
        )}
      />

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
        Sign Up
      </button>

      <div className="relative my-10 flex w-full items-center gap-2 font-bold uppercase text-black opacity-10">
        <hr className="w-1/2 border-black" />
        <p>Or</p>
        <hr className="w-1/2 border-black" />
      </div>

      <button
        type="button"
        className="btn-dark center flex w-[90%] items-center justify-center gap-4"
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
        Already a member ?
        <Link href="/sign-in" className="ml-1 text-xl text-black underline">
          Sign in here
        </Link>
      </p>
    </form>
  );
};

export default Form;
