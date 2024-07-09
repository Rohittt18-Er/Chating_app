'use client';

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../button";


export const Social = () => {
    return (
        <div className="flex justify-center w-full gap-x-2">
            <Button
                variant='outline'
                size='lg'
                className="w-full"
                onClick={()=>{}}
            >
                <FaGithub
                    className="h-5 w-5"
                />
            </Button>
            <Button
                variant='outline'
                size='lg'
                className="w-full"
                onClick={()=>{}}
            >
                <FcGoogle
                    className="h-5 w-5"
                />
            </Button>
        </div>
    )
}