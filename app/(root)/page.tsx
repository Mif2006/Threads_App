import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts, hasLiked, returnLikes } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

 
export default async function Home() {
   const result = await fetchPosts(1, 30);
   const user = await currentUser()
    if (!user) redirect('/sign-in')

    const userInfo = await fetchUser(user.id)

    // const totalLikes = await returnLikes(thread.id, userInfo._id)
    const totalLikesPromises = result.posts.map((post) => returnLikes(post.id, userInfo._id))
    const totalLikesData = await Promise.all(totalLikesPromises)

    const isLikedPromises = result.posts.map((post) => hasLiked(post.id, userInfo._id));
  const isLikedData = await Promise.all(isLikedPromises);

  return (
    <>
      <h1 className="head-text text-left">HOME</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post, index) => {
         
            return (
             
              <ThreadCard
                key={post.id}
                id={post.id}
                currentUserId={user?.id || ""}
                myUserId={userInfo._id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                myLiked={isLikedData[index]}
                totalLikes={totalLikesData[index]}
              />
            )})}
          </>
        )}
      </section>
    </>
  )
}