"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../card"
import { BackButton } from "./back.button"
import { Header } from "./header"
import { Social } from "./social"

interface CardWrapperProps{
    children:React.ReactNode,
    header:string,
    backButtonLabel:string,
    backButtonHref:string,
    headerLabel:string,
    showSocial?:boolean

}

export const CardWrapper = ({children,headerLabel,header,backButtonLabel,backButtonHref,showSocial}:CardWrapperProps)=>{
    return(
     <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent>
        {children}
        </CardContent>

{showSocial && 

<CardFooter>
    <Social/>
    </CardFooter>}
    <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
    </CardFooter>
     </Card>
    )
}