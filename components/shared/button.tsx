"use client";

import { signOut } from "next-auth/react";

const Button = () => {
  return <button onClick={() => signOut()}>Button</button>;
};

export default Button;
