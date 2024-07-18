'use client'

// import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import type { Tables } from '@/types/supabase'

function PostSupabaseClient() {
  const router = useRouter()
  const [posts, setPosts] = useState<Tables<'post'>[] | []>([])
  const [loading, setLoading] = useState<boolean>(true)

  const handleInserts = async (payload: unknown) => {
    // console.log("Change received!", payload);
    await fetchPosts()
    // router.refresh();
  }

  // Listen to inserts
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('post').select('*')

    if (error) {
      // console.error("Error fetching posts:", error);
    } else {
      setPosts(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    void fetchPosts()

    const subscription = supabase
      .channel('post-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'post' },
        (payload) => {
          void handleInserts(payload)
        },
      )
      .subscribe()

    return () => {
      void subscription.unsubscribe()
    }
  }, [])

  // const { data } = await supabase.from("post").select();
  // const { data: postFromSupabase } = await supabase.from("post").select();

  return (
    <div className="border">
      {posts?.length > 0 && (
        <pre>
          from supabase {posts?.length}: {JSON.stringify(posts, null, 2)}
        </pre>
      )}
    </div>
  )
}
export default PostSupabaseClient
