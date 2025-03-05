"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "saif.nizami@awfis.com",
    password: "qazwsx1@S",
  });

  const handleLogin = async () => {
    try {
      const response = await login(formData.email, formData.password);

      Cookies.set("authToken", response?.data?.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      localStorage.setItem("authToken", response?.data?.token);

      router?.replace("/dashboard");
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <div className="flex flex-col w-1/2 mx-auto">
      <h1>Login Page</h1>

      <input
        value={formData?.email}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
        className="border mt-10"
      />
      <input
        value={formData?.password}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
        className="border mt-5"
      />

      <button
        onClick={() => handleLogin()}
        className="mt-5 bg-amber-900 text-white w-[150px] mx-auto rounded p-1 cursor-pointer"
      >
        Login
      </button>
    </div>
  );
}
