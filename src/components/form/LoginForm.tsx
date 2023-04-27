import { z } from "zod";
import { Form } from "./index";
import { useState } from "react";
import { agent } from "@/lib/atp";

const LoginSchema = z.object({
  username: z
    .string()
    .describe("Bluesky Username // pfrazee.com or pfrazee.bsky.social"),
  password: z.string().describe("Bluesky Password"),
});

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsSubmitting(true);

    try {
      await agent.login({
        identifier: data.username,
        password: data.password,
      });

      setIsSubmitting(false);

      console.log("logged in!");
      window.location.pathname = "/editor";
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <Form
        schema={LoginSchema}
        onSubmit={handleSubmit}
        renderAfter={(submit) => (
          <button
            className="w-full bg-blue-700 text-white hover:bg-blue-900 py-2 rounded-md"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        )}
      />
    </>
  );
};
