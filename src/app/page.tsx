"use client";

import Products from "@/components/products";
import { NEXT_PUBLIC_BACKEND_BASE_URL } from "@/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/validate`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) return;

        await fetch(
          `${NEXT_PUBLIC_BACKEND_BASE_URL}/refresh-token`,
          {
            method: "POST",
            credentials: "include",
          }
        );
      } catch (error) {
        console.error("Auth check failed", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <div><Products /></div>
  )
}
