'use client';

import { Button } from '@/app/_components/ui/button';
import { signIn } from 'next-auth/react';

function LoginDiscord() {
  return <Button onClick={() => signIn('discord')}>Login</Button>;
}

export default LoginDiscord;
