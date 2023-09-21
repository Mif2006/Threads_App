"use client"

import { likeThread } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"

function Liker (id: string | null, user: string | undefined) {
   
    return(
        <div onClick={() => likeThread(id, user)} >
                    <Image className="cursor-pointer object-contain" src="/assets/heart-gray.svg" alt="heart" width={24} height={24} />
                                </div>
    )
}

export default Liker