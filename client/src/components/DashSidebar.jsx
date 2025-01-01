import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { useLocation } from "react-router-dom";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

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
          <SidebarItem icon={PiSignOut} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
