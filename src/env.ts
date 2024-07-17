/**
 * Reference: https://env.t3.gg/docs/nextjs
 */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DB_MIGRATING: stringBoolean,
    DB_SEEDING: stringBoolean,
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

// import { config } from "dotenv";
// import { expand } from "dotenv-expand";

// import { ZodError, z } from "zod";

// const stringBoolean = z.coerce
//   .string()
//   .transform((val) => {
//     return val === "true";
//   })
//   .default("false");

// const EnvSchema = z.object({
//   NODE_ENV: z
//     .enum(["development", "test", "production"])
//     .default("development"),
//   DATABASE_URL: z.string().url(),
//   DB_MIGRATING: stringBoolean,
//   DB_SEEDING: stringBoolean,
//   NEXT_PUBLIC_SUPABASE_URL: z.string(),
//   NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
// });

// export type EnvSchema = z.infer<typeof EnvSchema>;

// // expand(config());
// // expand(config({ path: ".env.local" }));

// try {
//   EnvSchema.parse(process.env);
// } catch (error) {
//   if (error instanceof ZodError) {
//     let message = "Missing required values in .env:\n";
//     error.issues.forEach((issue) => {
//       message += issue.path[0] + "\n";
//     });
//     const e = new Error(message);
//     e.stack = "";
//     throw e;
//   } else {
//     console.error(error);
//   }
// }

// export const env = EnvSchema.parse(process.env);
