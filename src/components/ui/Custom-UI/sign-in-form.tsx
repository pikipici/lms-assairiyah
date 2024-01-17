"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonGoogle from "@/components/ui/Custom-UI/Button-google";
import { redirect } from "next/navigation";

const Signin = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  const pushUser = async () => {
    toast(() => (
      <span className=" animate-spin">
        <LiaSpinnerSolid />
      </span>
    ));
    try {
      const response = await axios.put("/api/users/signup", session?.user);
      if (response.data === "Created New Account") {
        router.push("/setup-profile");
      }
    } catch (error) {
      if (!session?.user?.image) {
        router.push("/setup-profile");
      } else router.push("/");
    }
  };

  if (session?.user) {
    pushUser();
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { username, password } = userInput;
    console.log(username, password);
    const user = await signIn("credentials", {
      username,
      password,
      // redirect: false,
    });
    // if (!user?.url) toast.error("Email or password is incorrect");
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Card className=" flex flex-col items-center justify-center">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl"></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <form className="grid gap-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={userInput.username}
                onChange={(e) =>
                  setUserInput((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={userInput.password}
                onChange={(e) =>
                  setUserInput((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form> */}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 font-bold">
                Login dengan google
              </span>
            </div>
          </div>
          <ButtonGoogle />
        </CardContent>
      </Card>
    </div>
  );
};
export default Signin;
