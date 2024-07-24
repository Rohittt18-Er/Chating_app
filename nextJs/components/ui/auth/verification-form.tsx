"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { toast } from "../use-toast";
import { redirect } from "next/navigation";

const VerificationForm = () => {
  const searchParams: any = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);

  const onSubmit = useCallback(() => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "No token available",
      });
      setLoading(false);
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          toast({
            title: data.success,
          });
          setLoading(false);
          redirect("/login");
        }
        if (data.error) {
          toast({
            variant: "destructive",
            title: data.error,
          });
          setLoading(false);
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Something went wrong !",
        });

        setLoading(false);
      });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex items-centerw-full justify-center">
        {loading && <BeatLoader />}
      </div>
    </CardWrapper>
  );
};

export default VerificationForm;
