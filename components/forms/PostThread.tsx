"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const [formData, setFormData] = useState({
    thread: '',
    accountId: userId
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    
    
    await createThread({
      text: formData.thread,
      author: userId,  
      communityId: organization ? organization.id : null,
      path: pathname
    });

    router.push("/")
  }

  // const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
  //   console.log("hey")
  //   try {
  //     await createThread({
  //       text: values.thread,
  //       author: userId,
  //       communityId: null,
  //       path: pathname,
  //     });
  //     console.log('success')
  
  //     router.push("/");
  //   } catch (error) {
  //     console.log("Bad Error")
  //   }
    
  // };

  return (
    // <Form {...form}>
    //   <form
    //     className='mt-10 flex flex-col justify-start gap-10'
    //     onSubmit={form.handleSubmit(onSubmit)}
    //   >
    //     <FormField
    //       control={form.control}
    //       name='thread'
    //       render={({ field }) => (
    //         <FormItem className='flex w-full flex-col gap-3'>
    //           <FormLabel className='text-base-semibold text-light-2'>
    //             Content
    //           </FormLabel>
    //           <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
    //             <Textarea rows={15} {...field} />
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //     <Button type='submit' className='bg-primary-500'>
    //       Post Thread
    //     </Button>
    //   </form>
    // </Form>

    
    <form className="mt-10 flex flex-col justify-start gap-10" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-3">

      <label className="text-base-semibold text-light-2">Content</label>
      
      <textarea  
        name="thread"
        value={formData.thread}
        onChange={handleChange}
        rows={15}
        className='no-focus border rounded-md p-2  border-dark-4 bg-dark-3 text-light-1' 
      />

      <button className="bg-primary-500 p-2 rounded-md text-light-1 font-bold" type="submit">Post Thread</button>
      </div>

    </form>
  );
}

export default PostThread;