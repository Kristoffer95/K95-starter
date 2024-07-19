import Link from 'next/link';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import { getServerAuthSession } from '@/server/auth';
import { HydrateClient } from '@/trpc/server';
import PostTrpcClient from './_components/post-trpc-client';
import PostTrpcServer from './_components/post-trpc-server';
import LoginDiscord from './_components/shared/login-discord';

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
              Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="https://create.t3.gg/en/usage/first-steps"
                target="_blank"
              >
                <h3 className="font-bold text-2xl ">First Steps →</h3>
                <div className="text-lg">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="https://create.t3.gg/en/introduction"
                target="_blank"
              >
                <h3 className="font-bold text-2xl">Documentation →</h3>
                <div className="text-lg">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </div>
              </Link>
            </div>
            <div className="flex gap-4">
              <LoginDiscord />

              {session?.user && (
                <Avatar className="cursor-pointer">
                  {session?.user.image && (
                    <AvatarImage src={session.user.image} alt="user" />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <Button variant={'outline'} className="bg-black/0">
                <Link href="/api/auth/signout">Logout </Link>
              </Button>
            </div>
            <div className="flex">
              <PostTrpcServer />

              <PostTrpcClient />
            </div>
          </div>
        </main>
      </HydrateClient>
    </>
  );
}
