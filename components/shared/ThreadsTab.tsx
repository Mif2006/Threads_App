import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { userInfo } from "os";
import { currentUser } from "@clerk/nextjs";
import { hasLiked } from "@/lib/actions/thread.actions";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const ThreadsTab = async ({currentUserId, accountId, accountType} : Props) => {
    let result: any;

    if(accountType === 'Community') {
         result = await fetchCommunityPosts(accountId)
    } else {
        result = await fetchUserPosts(accountId)
    }

    const user = await currentUser()
    const userInfo = await fetchUser(currentUserId)

    
    
    const isLikedPromises = result.threads.map((thread: any) => hasLiked(thread.id, userInfo._id));
  const isLikedData = await Promise.all(isLikedPromises);
   

    if(!result) redirect("/")

    return (
        <section  className="mt-9 flex flex-col gap-10">
           {result.threads.map((thread: any, index: any) => (
                <ThreadCard
                key={thread.id}
                id={thread.id}
                currentUserId={currentUserId}
                myUserId={userInfo._id}
                parentId={thread.parentId}
                content={thread.text}
                author={
                    accountType === 'User'
                    ? {name: result.name, image: result.image, id: result.id}
                    : {name: thread.author.name, image: thread.author.image, id: thread.author.id}
                }
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                myLiked={isLikedData[index]}
              />
           ))}
        </section>
    )
}

export default ThreadsTab