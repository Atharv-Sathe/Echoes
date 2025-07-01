import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { signoutFailure, signoutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const response = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(signoutFailure(data.message));
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };

  useEffect(() => {
    // Extracting search parameters from url
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            active={tab === "profile" ? true : false}
            icon={FaUser}
            label={"User"}
            labelColor="dark"
            href="/dashboard?tab=profile"
          >
            Profile
          </SidebarItem>
          <SidebarItem icon={PiSignOut} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
