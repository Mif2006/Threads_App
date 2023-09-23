"use client"
import { hasLiked, likeThread, removeLike } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Liker({ threadId, userId, liked }: {
    threadId: string;
    userId: string;
    liked: boolean | undefined;

}): JSX.Element | null {
    if (!threadId || !userId) {
      // Handle the case where threadId or userId is null or undefined
      return null;
    }

    const path = usePathname()

    return (
        <article className="flex items-center gap-2">
        {/* { totalLikes != 0 && <p className="text-white text-small-regular"> {totalLikes}</p> } */}
        {liked === true ? (
 <Image
 onClick={() =>{
   removeLike(threadId, userId, path)}}
 className="cursor-pointer object-contain"
 src={"/assets/heart-filled.svg"}
 alt="heart"
 width={24}
 height={24}
/>
        ): (
            <Image
            onClick={() => {
              likeThread(threadId, userId, path)
            }}
            className="cursor-pointer object-contain"
            src={"/assets/heart-gray.svg"}
            alt="heart"
            width={24}
            height={24}
          />
        ) }
      
    </article>
    );
  }
  
  export default Liker;
  