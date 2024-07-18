import { api } from '@/trpc/server'

async function PostTrpcServer() {
  const allPosts = await api.post.getLatest()

  return (
    <div className="flex flex-col border gap-2 items-center ">
      {allPosts.length}
      <pre>from trpc server: {JSON.stringify(allPosts, null, 2)}</pre>
    </div>
  )
}
export default PostTrpcServer
