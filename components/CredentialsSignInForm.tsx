"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CredentialsSignInRequest,
  CredentialsSignInValidator,
} from "@/lib/validators/credentials";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/Form";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const CredentialsSignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CredentialsSignInRequest>({
    resolver: zodResolver(CredentialsSignInValidator),
  });

  const onSubmit: SubmitHandler<CredentialsSignInRequest> = async (
    credential,
  ) => {
    const { email, password } = credential;

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((res) => {
        if (res?.error) {
          const errText = res.error.replace("Error: ", "");
          toast({
            title: "Error",
            description: errText,
            variant: "destructive",
          });
        } else {
          router.refresh();
          router.back();
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sing in with credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CredentialsSignInForm;
