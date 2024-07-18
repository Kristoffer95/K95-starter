'use client'

import { api } from '@/trpc/react'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

function PostTrpcClient() {
  const trpcUtils = api.useUtils()

  const router = useRouter()
  const { data: posts } = api.post.getLatest.useQuery()

  const getLatestPost = async () => {
    await trpcUtils.post.getLatest.invalidate()
    router.refresh()
  }

  useEffect(() => {
    const subscription = supabase
      .channel('post-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'post' },
        () => {
          void getLatestPost()
        },
      )
      .subscribe()

    return () => {
      void subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="w-[400px] border">
      {posts && posts?.length > 0 && (
        <pre>
          from trpc client {posts?.length}: {JSON.stringify(posts, null, 2)}
        </pre>
      )}
    </div>
  )
}
export default PostTrpcClient
