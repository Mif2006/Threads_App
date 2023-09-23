"use client"
import { deleteThread, hasLiked, likeThread, removeLike } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Deleter({ threadId}: {
    threadId: string | null;
}): JSX.Element | null {
    if (!threadId) {
      // Handle the case where threadId or userId is null or undefined
      return null;
    }

    const path = usePathname()

    return (
        <Image onClick={() => deleteThread(threadId, path)} src="/assets/delete.svg" alt="delete" width={24} height={24} className="cursor-pointer object-contain" />
    );
  }
  
  export default Deleter;
  