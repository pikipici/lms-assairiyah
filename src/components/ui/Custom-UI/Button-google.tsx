"use client";

import { Icons } from "./Icon";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

interface ButtonLogin extends React.HTMLAttributes<HTMLDivElement> {}

const ButtonGoogle: FC<ButtonLogin> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      redirect("/laman");
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        variant="outline"
        onClick={loginWithGoogle}
        disabled={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.sun className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default ButtonGoogle;