import type { Config } from 'drizzle-kit';

import { env } from '@/env';

export default {
  schema: './src/server/db/schema/index.ts',
  dialect: 'postgresql',
  out: './supabase/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: true,
} satisfies Config;
