import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

 
export default async function Home() {
   const result = await fetchPosts(1, 30);
   const user = await currentUser()
    if (!user) redirect('/sign-in')
    if(!user) return null

    

   console.log(result)

  return (
    <>
      <h1 className="head-text text-left">HOME</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post.id}
                id={post.id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}