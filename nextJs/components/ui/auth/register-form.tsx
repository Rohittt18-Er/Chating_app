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
import { registerSchema } from "@/schemas";
import { Input } from "../input";
import { Button } from "../button";
import { useEffect, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { registerApi } from "@/actions/regitser";
import { Watch } from "react-loader-spinner";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log("values", values);
    startTransition(async () => {
      try {
        const res: any = await registerApi(values);
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
      headerLabel="Create an account"
      backButtonLabel="Already have an account ?"
      backButtonHref="/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="test@gmail.com"
                      type="string"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
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
              control={form.control}
              name="password"
              disabled={isPending}
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
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
