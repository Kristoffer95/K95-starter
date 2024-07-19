import Link from 'next/link';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import { getServerAuthSession } from '@/server/auth';
import { HydrateClient } from '@/trpc/server';
import PostTrpcClient from './_components/home/post-trpc-client';
import PostTrpcServer from './_components/home/post-trpc-server';
import LoginDiscord from './_components/shared/login-discord';

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-5 flex gap-4">
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
      </main>
    </HydrateClient>
  );
}
