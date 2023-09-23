"use client";

import { useState } from 'react';


import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread, likeThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId } : Props) {
  const [comment, setComment] = useState('');
  const pathname = usePathname()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addCommentToThread(
        threadId, 
        comment,
        JSON.parse(currentUserId),
        pathname
      );

      setComment('');
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className="flex w-full items-center gap-3">
        <Image 
          src={currentUserImg}
          alt="current_user"
          width={48}
          height={48}
          className="rounded-full object-cover" 
        />
        <div className=''>
        <input 
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment..."
          className="no-focus border-none bg-transparent text-light-1 outline-none" 
        />
        </div>
      </div>
      <button className='comment-form_btn' type="submit">Reply</button>
    </form>

  );
}

export default Comment