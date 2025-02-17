"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/utils/server";
import { createProfileDetails } from "@/db/queries/queries";

// const testUser = {
//   id: "1",
//   email: "contact@david.io",
//   password: "12345678",
// };

interface LoginReturnType {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    neutral?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

const signupSchema = loginSchema
  .extend({
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .trim(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],});



export async function login(
  _prevState: unknown,
  formData: FormData
): Promise<LoginReturnType | undefined> {
  //
  const results = loginSchema.safeParse(Object.fromEntries(formData));
  //
  if (!results.success) {
    console.log(results.error.flatten().fieldErrors);
    return {
      errors: results.error.flatten().fieldErrors,
    };
  }
  //
  const supabase = await createClient();
  const { email, password } = results.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      errors: {
        neutral: [error.message],
      },
    };
  }
  redirect("/");
}

// Signup Functionality
export async function signup(
  _prevState: unknown,
  formData: FormData
): Promise<LoginReturnType | undefined> {
  const supabase = await createClient();
  const results = signupSchema.safeParse(Object.fromEntries(formData));
  //
  if (!results.success) {
    return {
      errors: results.error.flatten().fieldErrors,
    };
  }
  const { email, password } = results.data;
  const { error, data } = await supabase.auth.signUp({ email, password });
  if (error) {
    return {
      errors: {
        neutral: [error.message],
      },
    };
  }
  const userId = data.user?.id;
  const userEmail = data.user?.email;
  if (!userId || !userEmail) {
    return {
      errors: {
        neutral: ["There has been a problem, please try again later"],
      },
    };
  }
  createProfileDetails(userId, userEmail);
  redirect("/");
  //
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.status, error.message);
  }
  redirect("/");
}
