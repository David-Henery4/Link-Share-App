"use server";
import { createSession, deleteSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const testUser = {
  id: "1",
  email: "contact@david.io",
  password: "12345678",
};

interface LoginReturnType {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    neutral?: string[] | undefined;
  };
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(
  _prevState: unknown,
  formData: FormData
): Promise<LoginReturnType | undefined> {
  const results = loginSchema.safeParse(Object.fromEntries(formData));
  //
  if (!results.success) {
    return {
      errors: results.error.flatten().fieldErrors,
    };
  }
  //
  const { email, password } = results.data;
  //
  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        neutral: ["Invalid email or password"],
      },
    };
  }
  //
  await createSession(testUser.id);
  redirect("/");
}

export async function logout() {
  await deleteSession()
  redirect("/login");
}


// Signup Functionality
export async function signup(_prevState: unknown, formData: FormData) {
  
}
