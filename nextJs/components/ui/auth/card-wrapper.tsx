"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { BackButton } from "./back.button";
import { Header } from "./header";
import { Social } from "./social";
import { Button } from "../button";

interface CardWrapperProps {
  children: React.ReactNode;
  header: string;
  backButtonLabel: string;
  backButtonHref: string;
  headerLabel: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  header,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  const router = useRouter();
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="flex justify-center">
        <Button
          className="bg-white hover:bg-white"
          variant="ghost"
          onClick={() => {
            router.push(backButtonHref);
          }}
        >
          {backButtonLabel}
        </Button>
        {/* <BackButton  label={backButtonLabel} href={backButtonHref}></BackButton> */}
      </CardFooter>
    </Card>
  );
};
