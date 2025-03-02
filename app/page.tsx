"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    space_id: 54410,
    pin: 83021,
  });

  const handleLogin = async () => {
    const response = await axios.post(
      "https://betaapis.awfis.com/api/v2/login",
      {
        space_id: formData?.space_id,
        pin: formData?.pin,
        vms_device_id: "react_vms",
      },
      {
        headers: {
          app_id: 15,
        },
      }
    );

    Cookies.set("authToken", response?.data?.data[0]?.token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    localStorage.setItem("authToken", response?.data?.data[0]?.token);

    router?.replace("/dashboard");
  };

  return (
    <div className="flex flex-col w-1/2 mx-auto">
      <h1>Login Page</h1>

      <input
        value={formData?.space_id}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            space_id: Number(e.target.value),
          }))
        }
        className="border mt-10"
      />
      <input
        value={formData?.pin}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            pin: Number(e.target.value),
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
