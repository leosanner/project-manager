"use client";

import { Briefcase } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import DisplayErrors from "../display-errors";
import { authClient } from "@/lib/auth/client";

interface Login1Props {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const signInGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};

const Login1 = ({
  heading,
  logo = {
    url: "https://unsplash.com/photos/macbook-pro-on-table-beside-white-imac-and-magic-mouse-m_HRfLhgABo",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    alt: "workspace setup",
    title: "Project workspace",
  },
  buttonText = "Login",
  googleText = "Sign up with Google",
  signupText = "Don't have an account?",
  signupUrl = "https://shadcnblocks.com",
}: Login1Props) => {
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: true,
  });

  return (
    <section className="bg-muted bg-background min-h-screen">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border px-6 py-12 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
            <div className="flex items-center gap-2 lg:justify-start">
              <Briefcase className="text-primary size-5" />
            </div>
            {heading && <h1 className="text-3xl font-semibold">{heading}</h1>}
          </div>
          <form action={formAction} className="w-full">
            <div className="flex w-full flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  {state.errors && (
                    <DisplayErrors errors={state.errors} fieldName="email" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  {state.errors && (
                    <DisplayErrors errors={state.errors} fieldName="password" />
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="mt-2 w-full">
                    {buttonText}
                  </Button>
                  {state.errors && (
                    <DisplayErrors
                      errors={state.errors}
                      fieldName="betterAuth"
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
          <Button variant="outline" className="w-full" onClick={signInGoogle}>
            <FcGoogle className="mr-2 size-5" />
            {googleText}
          </Button>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login1 };
