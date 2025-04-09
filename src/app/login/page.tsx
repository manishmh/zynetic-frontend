"use client";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

interface formDataType {
  email: string;
  password: string;
}

const initialFormData: formDataType = {
  email: "",
  password: "",
};
export const NEXT_PUBLIC_BACKEND_BASE_URL = "http://localhost:8080";

const Login = () => {
  const [formData, setFormData] = useState<formDataType>(initialFormData);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<formDataType>(initialFormData);
  const { handleUser } = useUserContext();

  const handleFormData = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof formDataType
  ) => {
    const value = e.target.value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      const errors: formDataType = {
        email: "",
        password: "",
      };

      if (!updated.email) {
        errors.email = "Email is required";
      } 
      if (!updated.password) {
        errors.password = "Password is required";
      }

      setErrorMessages(errors);
      return updated;
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      if (
        !errorMessages.email &&
        !errorMessages.password
      ) {
        const response = await fetch(
          `${NEXT_PUBLIC_BACKEND_BASE_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        if (response.ok) {
          handleUser(data?.user);
          toast.success(data?.message || "Logged in successfully");
          router.push("/");
        } else {
          toast.error(data?.message || "Login Failed");
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-300 p-8 rounded-md shadow-xl space-y-2 w-full max-w-lg">
        <h1 className="font-semibold text-xl text-center">Welcome back!</h1>
        <form
          action=""
          className="flex flex-col gap-4 text-sm"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-700">
              Email<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Your email"
              value={formData.email}
              disabled={isPending}
              onChange={(e) => handleFormData(e, "email")}
              className="w-full border border-gray-300 rounded-md p-2 outline-none"
            />
            <div className="text-red-400 text-xs">{errorMessages.email}</div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-700">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              disabled={isPending}
              onChange={(e) => handleFormData(e, "password")}
              className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm"
            />
            <div className="text-red-400 text-xs">{errorMessages.password}</div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={`${
              isPending ? "bg-gray-500" : "bg-[#2a3a5e] hover:bg-[#283f72]"
            } w-full rounded-md p-2 transition-colors duration-300 text-white cursor-pointer`}
          >
            Login
          </button>
          <div className="text-center text-blue-700 hover:text-blue-900 duration-300 transition-colors">
            <a href="/register" className="cursor-pointer">
              Need an account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
