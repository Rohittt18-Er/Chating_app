import Link from "next/link";
import { Button } from "../button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  const router = useRouter();
  return (
    <div className="flex w-full">
      <Button
        variant="ghost"
        className="font-normal w-full"
        onClick={() => router.push(href)}
      >
        {label}
      </Button>
    </div>
  );
};
