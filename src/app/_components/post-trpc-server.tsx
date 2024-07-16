import { api } from "@/trpc/server";

async function PostTrpcServer() {
  const allPosts = await api.post.getLatest();

  return (
    <div className="flex flex-col items-center gap-2 border">
      {allPosts.length}
      <pre>from trpc server: {JSON.stringify(allPosts, null, 2)}</pre>
    </div>
  );
}
export default PostTrpcServer;
