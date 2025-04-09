"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

interface formDataType {
  name: string;
  email: string;
  password: string;
}

const initialFormData: formDataType = {
  name: "",
  email: "",
  password: "",
};

export const NEXT_PUBLIC_BACKEND_BASE_URL = "http://localhost:8080";

const Register = () => {
  const [formData, setFormData] = useState<formDataType>(initialFormData);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [errorMessages, setErrorMessages] =
    useState<formDataType>(initialFormData);

  const handleFormData = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof formDataType
  ) => {
    const value = e.target.value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      const errors: formDataType = {
        name: "",
        email: "",
        password: "",
      };

      if (!updated.name) {
        errors.name = "Name is required";
      }

      if (!updated.email) {
        errors.email = "Email is required";
      }

      if (!updated.password) {
        errors.password = "Password is required";
      } else {
        const upper = /[A-Z]/;
        const lower = /[a-z]/;
        const digit = /[0-9]/;
        const special = /[!@#$%^&*(),.?":{}|<>]/;

        if (updated.password.length < 8) {
          errors.password = "Password should have at least 8 characters";
        } else if (!upper.test(updated.password)) {
          errors.password =
            "Password should contain at least one uppercase letter";
        } else if (!lower.test(updated.password)) {
          errors.password =
            "Password should contain at least one lowercase letter";
        } else if (!digit.test(updated.password)) {
          errors.password = "Password should contain at least one number";
        } else if (!special.test(updated.password)) {
          errors.password =
            "Password should contain at least one special character";
        }
      }

      setErrorMessages(errors);
      return updated;
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      if (
        !errorMessages.name &&
        !errorMessages.email &&
        !errorMessages.password
      ) {
        const response = await fetch(
          `${NEXT_PUBLIC_BACKEND_BASE_URL}/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          toast.success("user Registered successfully");
          router.push("/login");
        } else {
          const error = await response.json();
          toast.error(error?.message || "Registeration fialed");
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-300 p-8 rounded-md shadow-xl space-y-2 w-full max-w-lg">
        <h1 className="font-semibold text-xl text-center">Create an account</h1>
        <form
          action=""
          className="flex flex-col gap-4 text-sm"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-gray-700">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              disabled={isPending}
              value={formData.name}
              onChange={(e) => handleFormData(e, "name")}
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-md p-2 outline-none"
            />
            <div className="text-red-400 text-xs">{errorMessages.name}</div>
          </div>
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
            Register
          </button>
          <div className="text-center text-blue-700 hover:text-blue-900 duration-300 transition-colors">
            <a href="/login" className="cursor-pointer">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
