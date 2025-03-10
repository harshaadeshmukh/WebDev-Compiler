import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Email must be a valid email address."),
  password: z.string().min(4, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Signup() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function handleSignup(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
      <div className="__form_container bg-zinc-900 border-2 py-9 px-6 rounded-xl flex flex-col gap-7 w-[630px]">
        <div className="space-y-3">
          <h1 className="font-mono text-4xl font-bold text-center ">Signup</h1>
          <p className="font-mono text-base text-center">
            Connect with a vibrant network of frontend development experts 🧑🏻‍💻
          </p>
        </div>

        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-5 "

          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                    <Input type="email" placeholder="Email" {...field} />
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
                    <Input placeholder="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-blue-400 hover:bg-blue-600 text-white"
              type="submit"
            >
              Signup
            </Button>
          </form>
        </Form>
        <small className="font-mono text-sm text-center">Already have an account? <Link className="text-blue-400 px-2" to="/login">Login</Link></small>
      </div>
    </div>
  );
}
