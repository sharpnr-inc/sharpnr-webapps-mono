import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
// import { useModal } from "@/context/ModalContext";
import { useToastService } from "@/context/ToastContext";

import type React from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/context/ModalContext";


// type LoginForm = z.infer<typeof ZodLoginSchema>;


export default function RootOrgLoginCard(): React.JSX.Element {
  // const { success, error} = useToastService();
  // // const {showModal, closeModal} = useModal()
  

  // const nav = useNavigate();

  //  const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<LoginForm>({
  //   resolver: zodResolver(ZodLoginSchema),
  // });

  //   const onSubmit = async (data: LoginForm) => {
  //   try {
  //     const res = await loginOrg(data);
  //     success("Login successful 🎉");
  //     nav("/dashboard");
  //     return res;
  //   } catch (err) {
  //     error("Login failed ❌");
  //   }
  // };


  //--------------------------------------Return Ststement ---------------------------------------------------------------------//
  return (
    // <Card className="w-full max-w-sm">
    //   <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
    //   <CardHeader>
    //     <CardTitle className="text-2xl">Root Login</CardTitle>
    //     <CardDescription>
    //       Enter your email below to login to your account.
    //     </CardDescription>
    //   </CardHeader>
      
    //     <CardContent className="grid gap-4">
    //       <div className="grid gap-2">
    //         <label htmlFor="email">Email</label>
    //         <input
    //           id="email"
    //           type="email"
    //           placeholder="m@example.com"
    //           {...register("email")}
    //           className="p-2 border rounded-md"
    //         />
    //       </div>
    //       <div className="grid gap-2">
    //         <label htmlFor="password">Password</label>
    //         <input
    //           id="password"
    //           type="password"
    //           {...register("password")}
    //           className="p-2 border rounded-md"
    //         />
    //       </div>
    //       <div className="flex items-center space-x-2">
    //         <Checkbox id="remember-me" />
    //         <label
    //           htmlFor="remember-me"
    //           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //         >
    //           Remember me on this machine
    //         </label>
    //       </div>
    //     </CardContent>
    //     <CardFooter className="flex flex-col space-y-2">
    //      <Button type="submit" className="w-full" disabled={isSubmitting}>
    //         {isSubmitting ? "Signing in..." : "Sign in"}
    //       </Button>
    //          <Button onClick={()=>{nav("/register")}} variant="secondary" className="w-full" disabled={isSubmitting}>
    //         {"Register/Signup"}
    //       </Button>
    //       <div className="mt-4 text-center text-sm">
    //         <a href="#" className="underline">
    //           Forgot your password?
    //         </a>
    //       </div>
    //     </CardFooter>
    //   </form>
    // </Card>

    <></>
  );
}
