"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  return (
    <div>
      User Profile{" "}
      <button
        onClick={() => {
          localStorage.removeItem("authToken");
          Cookies.remove("authToken");
          router?.replace("/");
        }}
        className="border border-gray-500 rounded px-2 py-1 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
