// import { LoginButton } from "@/components/ui/auth/login-button";
import { LoginButton } from "@/components/ui/(auth)/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font =Poppins({
subsets:['latin'],
weight:["600"]
})

export default function Home() {
  return (
 <div className="h-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">

<div className="space-y-6 text-center">
<h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",font.className)}>
💬 Chating
</h1>
<p className="text-white text-2xl font-semibold">
  Welcome to chating world
</p>
</div>
<div className="mt-5">
  <LoginButton>
  <Button variant="secondary" size="lg" className="text-lg font-semibold" >
    Sign In
  </Button>  
  </LoginButton>
</div>
 </div>
  );
}
