"use client";

import Products from "@/components/products";
import { NEXT_PUBLIC_BACKEND_BASE_URL } from "@/constant";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";

export default function Home() {
  const router = useRouter();
  const { user } = useUserContext();
  const [userProfile, setUserProfile] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const validateRes = await fetch(
          `${NEXT_PUBLIC_BACKEND_BASE_URL}/validate`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!validateRes.ok) {
          const refreshRes = await fetch(
            `${NEXT_PUBLIC_BACKEND_BASE_URL}/refresh-token`,
            {
              method: "POST",
              credentials: "include",
            }
          );

          if (!refreshRes.ok) {
            throw new Error("Token refresh failed");
          }
        }

        const userRes = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/`, {
          method: "GET",
          credentials: "include",
        });

        if (!userRes.ok) throw new Error("Failed to fetch user");

        const { user } = await userRes.json();

        console.log("User data:", user);
      } catch (error) {
        console.error("Auth check failed", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, []);
  const handleLogout = async () => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout", err);
    }
  };

  return (
    <div>
      <div className="p-6 flex justify-end">
        <div
          className="p-2 cursor-pointer hover:bg-gray-400 bg-gray-300 rounded-full aspect-square w-12 grid place-items-center font-semibold relative"
          onClick={() => setUserProfile(!userProfile)}
        >
          <span className="capitalize">{user?.name.charAt(0)}</span>
          {userProfile && (
            <div className="absolute bg-white top-full z-50 shadow-xl border border-gray-300 rounded-md min-w-96 right-0 mt-2 font-medium">
              <div className="flex items-center text-sm gap-2 border-b border-gray-300 p-3">
                <div className="p-2 cursor-pointer capitalize hover:bg-gray-400 bg-gray-300 rounded-full aspect-square w-11 grid place-items-center font-semibold relative">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold capitalize">{user?.name}</div>
                  <div className="text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="capitalize px-3 border-b border-gray-200 text-gray-600 text-sm">
                User role: {user?.role.toLocaleLowerCase()}
              </div>
              <div
                className="mx-3 my-2 p-2 rounded-md flex items-center gap-2 hover:bg-gray-300"
                onClick={handleLogout}
              >
                <MdLogout /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <Products />
      </div>
    </div>
  );
}
