import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment";
import { fetchThreadById, hasLiked, returnLikes } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Page = async ({ params } : { params: {id: string}}) => {

    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect("/onboarding");

    const thread = await fetchThreadById(params.id)

    const isLiked = await hasLiked(thread.id, userInfo._id)

    const totalLikes = await returnLikes(thread.id, userInfo._id)

    const totalLikesPromises = thread.children.map((childItem: any) => returnLikes(childItem.id, userInfo._id))
    const totalLikesData = await Promise.all(totalLikesPromises)

    const isLikedPromises = thread.children.map((childItem: any) => hasLiked(childItem.id, userInfo._id));
  const isLikedData = await Promise.all(isLikedPromises);
    
    return (
        <section className="relative">
            <div>
                <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    currentUserId={user?.id || ""}
                    myUserId={userInfo._id}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    myLiked={isLiked}
                    totalLikes = {totalLikes}
                />
                
                
            </div>

            <div className="mt-7 ">
                <Comment
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10">
                {thread.children.map((childItem: any, index: any) => (
                    <ThreadCard
                    key={childItem.id}
                    id={childItem.id}
                    currentUserId={user?.id || ""}
                    myUserId={userInfo?._id}
                    parentId={childItem.parentId}
                    content={childItem.text}
                    author={childItem.author}
                    community={childItem.community}
                    createdAt={childItem.createdAt}
                    comments={childItem.children}
                    isComment
                    myLiked={isLikedData[index]}
                    totalLikes={totalLikesData[index]}
                />
                ))}
            </div>
        </section>
    )
}

export default Page