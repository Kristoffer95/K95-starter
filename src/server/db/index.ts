import { envServer } from '@/env/server';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

config();

if (!envServer.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

export const conn =
  globalForDb.conn ??
  postgres(envServer.DATABASE_URL, {
    max: envServer.DB_MIGRATING || envServer.DB_SEEDING ? 1 : undefined,
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    onnotice: envServer.DB_SEEDING ? () => {} : undefined,
  });
if (envServer.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, {
  schema,
  // logger: true
});
