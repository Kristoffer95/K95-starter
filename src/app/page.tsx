import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import TestComponent from "./_components/test-component";

export default async function Home() {
  const supabase = createClient();

  // const test = await api.post.test()

  const allPosts = await api.post.getLatest();
  // const { data: post } = await supabase.from("post");
  // void api.post.getLatest.prefetch();

  // const handleInserts = (payload: unknown) => {
  //   console.log("Change received!", payload);
  // };

  // supabase
  //   .channel("post-realtime")
  //   .on(
  //     "postgres_changes",
  //     { event: "INSERT", schema: "public", table: "post" },
  //     handleInserts,
  //   )
  //   .subscribe();

  return (
    <>
      <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="https://create.t3.gg/en/usage/first-steps"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">First Steps →</h3>
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
                <h3 className="text-2xl font-bold">Documentation →</h3>
                <div className="text-lg">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </div>
              </Link>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center gap-2">
                {allPosts.length}
                <pre>from trpc: {JSON.stringify(allPosts, null, 2)}</pre>
              </div>

              <TestComponent />
            </div>

            {/* <LatestPost /> */}
          </div>
        </main>
      </HydrateClient>
    </>
  );
}
