import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" })
    .max(32, { message: "Password must less than or equal 32 characters" })
});

const LoginForm = ({ setPanel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const loginForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input
                  id="f-email"
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="f-password">Password</Label>
              <FormControl>
                <div className="relative">
                  <Input
                    id="f-password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-semibold"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Link
            to="/#"
            className="pt-2 text-muted-foreground text-xs italic md:hover:text-black"
          >
            Forgot Password?{" "}
          </Link>
        </div>
        <div className="flex flex-col gap-2 justify-between pt-4">
          <Button type="submit">Sign In</Button>
          <p className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-black/80 italic text-sm md:hover:text-black"
              onClick={setPanel}
            >
              Register now!
            </button>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
