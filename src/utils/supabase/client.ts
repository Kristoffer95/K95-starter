// import { createBrowserClient } from "@supabase/ssr";
import type { Database } from '@/types/supabase';

// // import { env } from "@/env";

// const URL = "http://127.0.0.1:54321";
// const KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYyNjcwMjI5NywiZXhwIjoxOTQyMjc4Mjk3fQ.sUp3rS3cr3tAn0nK3y";

// export function createClient() {
//   // Create a supabase client on the browser with project's credentials
//   return createBrowserClient<Database>(URL, KEY);
// }

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
