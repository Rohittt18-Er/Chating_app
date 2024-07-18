"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { loginSchema } from "@/schemas";
import { Input } from "../input";
import { Button } from "../button";
import { useEffect, useTransition } from "react";
import axios from "axios";
import { loginApi } from "@/actions/login";
import { toast } from "../use-toast";
import { Watch } from "react-loader-spinner";
export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log("values", values);
    startTransition(async () => {
      try {
        const res: any = await loginApi(values);
        if (res.error) {
          toast({
            variant: "destructive",
            title: res.error,
          });
        } else {
          toast({
            // variant: "destructive",
            title: res.success,
          });
        }
      } catch (error) {}
    });
  };
  return (
    <CardWrapper
      header=""
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account !"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              disabled={isPending}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="test@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="space-y-4">
            <FormField
              disabled={isPending}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div>
            <Button
              disabled={isPending}
              type="submit"
              size="lg"
              className="w-full"
            >
              {isPending ? (
                <Watch
                  visible={true}
                  height="40"
                  width="40"
                  radius="48"
                  color="#4fa94d"
                  ariaLabel="watch-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

// import { useForm } from "react-hook-form";
// import * as z from 'zod';
// import { CardWrapper } from "./card-wrapper";
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form, FormField, FormItem, FormLabel, FormMessage } from "../form";
// import { loginSchema } from '@/schemas';
// import { Input } from '../input';
// import { Button } from "../button";

// export const LoginForm = () => {
//     const form = useForm<z.infer<typeof loginSchema>>({
//         resolver: zodResolver(loginSchema),
//         defaultValues: {
//             email: "",
//             password: "",
//         }
//     });

//     return (
//         <CardWrapper
//             header=""
//             headerLabel="Welcome back"
//             backButtonLabel="Don't have an account"
//             backButtonHref="/auth/register"
//             showSocial
//         >
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(() => { })} className='space-y-6'>
//                     <div className='sm:space-y-4'>
//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Email</FormLabel>
//                                     <Input
//                                         {...field}
//                                         placeholder="test@gmail.com"
//                                         type="email"
//                                         className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
//                                     />
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <div className='sm:space-y-4'>
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <Input
//                                         {...field}
//                                         placeholder="******"
//                                         type="password"
//                                         className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
//                                     />
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     <Button
//                         // variant='secondary'
//                         size='lg'
//                         className="w-full mt-6"
//                     >
//                         Sign In
//                     </Button>
//                 </form>
//             </Form>
//         </CardWrapper>
//     );
// };
