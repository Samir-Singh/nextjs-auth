"use client";

import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const getMeetingRoomList = async () => {
    const token = localStorage?.getItem("authToken");
    await axios.get(
      "https://betaapis.awfis.com/api/v1/meetingroom?inventory_type_id=3&space_id=54410",
      {
        headers: {
          app_id: 15,
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    getMeetingRoomList();
  }, []);

  return (
    <div>
      Dashboard{" "}
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

export default Dashboard;
