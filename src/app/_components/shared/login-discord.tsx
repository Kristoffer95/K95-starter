"use client";

// import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function LoginDiscord() {
  // return <Button onClick={() => signIn("discord")}>Login</Button>;
  return <button onClick={() => signIn("discord")}>Login</button>;
}

export default LoginDiscord;
