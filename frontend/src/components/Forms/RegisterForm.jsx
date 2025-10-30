import React, { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  email: z.email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" })
    .max(32, { message: "Password must less than or equal 32 characters" }),
  firstName: z.string().trim().nonempty({ message: "First name is required" }),
  lastName: z.string().trim().nonempty({ message: "Last name is required" }),
  address: z.string().trim().nonempty({ message: "Address is required" }),
  phoneNumber: z
    .string()
    .trim()
    .nonempty({ message: "Phone number is required" })
    .regex(/^0\d{9}$/, { message: "Phone number is not valid" }),
  birthDate: z.coerce
    .date({
      error: (issue) =>
        issue.input === undefined
          ? "Birthdate is required"
          : "Birthdate is not valid"
    })
    .transform((date) => date.toISOString().split("T")[0]),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions."
  })
});

const RegisterForm = ({ setPanel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const registerForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: ""
    }
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="space-y-1"
      >
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="f-email">Email</Label>
              <FormControl>
                <Input
                  id="f-email"
                  placeholder="example@email.com"
                  {...field}
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
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
        <FormField
          control={registerForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="f-firstName">First Name</Label>
              <FormControl>
                <Input id="f-firstName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="f-lastName">Last Name</Label>
              <FormControl>
                <Input id="f-lastName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="f-address">Address</Label>
              <FormControl>
                <Input id="f-address" {...field} autoComplete="on" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="f-phoneNumber">Phone number</Label>
              <FormControl>
                <Input id="f-phoneNumber" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="f-birthDate">Birthdate</Label>
              <FormControl>
                <Input id="f-birthDate" type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-3 mt-2">
                  <Checkbox
                    name="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <p className="text-muted-foreground text-sm">
                    By clicking this checkbox, you agree to the terms and
                    conditions.
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-end pt-2">
          <p className="text-muted-foreground text-sm">
            Have an account?{" "}
            <button
              type="button"
              className="text-black/80 italic text-sm md:hover:text-black"
              onClick={setPanel}
            >
              Login now!
            </button>
          </p>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
