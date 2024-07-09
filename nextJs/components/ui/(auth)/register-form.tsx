
'use client'


import { useForm } from "react-hook-form"
import * as z from 'zod'
import { CardWrapper } from "./card-wrapper"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form"
import { registerSchema } from '@/schemas'
import { Input } from '../input'
import { Button } from "../button"

export const RegisterForm = () => {

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name:"",
            email: "",
            password: "",
        }
    });
    const onSubmit =(values:z.infer<typeof registerSchema>)=>{
        console.log("values",values);
        
    }
    return (

        <CardWrapper
            header=""
            headerLabel="Create an account"
            backButtonLabel="Already have an account ?"
            backButtonHref="/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >

<div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="name"
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
                        >
                        </FormField>
                    </div>

                    <div className='space-y-4'>
                        <FormField
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
                        >
                        </FormField>
                    </div>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            size='lg'
                            className="w-full"

                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>

    )
}

