"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CredentialsSignUpRequest,
  CredentialsSignUpValidator,
} from "@/lib/validators/credentials";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/Form";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/useToast";

const CredentialsSignUpForm = () => {
  const form = useForm<CredentialsSignUpRequest>({
    resolver: zodResolver(CredentialsSignUpValidator),
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<CredentialsSignUpRequest> = async (
    credential,
  ) => {
    try {
      const res = await axios.post(`/api/auth/credentials`, credential);

      const { email, password } = credential;
      if (res.status === 200) {
        await signIn("credentials", {
          email,
          password,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sing up with credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email..." {...field} />
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

export default CredentialsSignUpForm;
