import "./pageStyles/grid.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "@/redux/slices/api";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "@/utils/handleError";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  userId: z.string().min(3, {
    message: "Invalid username or email.",
  }),
  password: z.string().min(4, {
    message: "Invalid password.",
  }),
});

export default function Login() {

  const [login,{isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function handleLogin(values: z.infer<typeof formSchema>) {
   
    try{
      console.log(values);
      const response = await login(values).unwrap();
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
      console.log(response);
    }
    catch(error) {
    //  console.log("Error");
      handleError(error);
    }
  }

  return (
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
      <div className="__form_container bg-zinc-900 border-2 py-9 px-6 rounded-xl flex flex-col gap-7 w-[630px]">
        <div className="space-y-3">
          <h1 className=" font-mono text-4xl font-bold text-center">Login</h1>
          <p className="font-mono text-base text-center">
            Greetings, code warrior! Time to conquer new challenges 🛡️
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-4 from-bg"
          >
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required placeholder="Username or Email" {...field}
                     disabled={isLoading} />
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
                    <Input  required placeholder="password" {...field}
                     disabled={isLoading} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              loading={isLoading}
              className="w-full bg-blue-400 hover:bg-blue-600 text-white"
              type="submit"
             
            >
              Login
            </Button>
          </form>
        </Form>
        <small className="font-mono text-sm text-center">
          Don't have an account?
          <Link className="text-blue-400 px-2" to="/signup">
               Sign Up
          </Link>
        </small>
      </div>
    </div>
  );
}