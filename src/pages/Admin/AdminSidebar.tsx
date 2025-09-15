import logo from "@/assets/icons/logo.svg";
import { Badge } from "@/components/ui/badge";
import { FiTruck } from "react-icons/fi";
// import { AiOutlineDollarCircle } from "react-icons/ai";

// import { IoMdHelpCircleOutline } from "react-icons/io";
// import { IoSettingsOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";

import { MdDashboard } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/Slices/user/userSlice";

export interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
}

export interface SidebarProps {
  items?: SidebarItem[];
  brandName?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userInitials?: string;
  onItemClick?: () => void;
}

const defaultSidebarItems: SidebarItem[] = [
  {
    icon: MdDashboard,
    label: "Dashboard",
    href: "/admin-dashboard",
  },
  //   { icon: Home, label: "Home", href: "/" },
  {
    icon: LuClipboardList,
    label: "Company",
    href: "/admin-dashboard/company",
  },
  {
    icon: LuClipboardList,
    label: "Load Board",
    href: "/admin-dashboard/loads",
  },
  {
    icon: FiTruck,
    label: "Drivers",
    href: "/admin-dashboard/drivers",
  },
  {
    icon: FiTruck,
    label: "All Users",
    href: "/admin-dashboard/users",
  },
  // {
  //   icon: MdOutlineMessage,
  //   label: "Message",
  //   href: "/admin-dashboard/messages",
  // },

  // {
  //   icon: TbChartBar,
  //   label: "Analytics",
  //   href: "/company-dashboard/analytics",
  // },
  // {
  //   icon: AiOutlineDollarCircle,
  //   label: "Earnings",
  //   href: "/company-dashboard/earnings",
  // },

  // {
  //   icon: IoSettingsOutline,
  //   label: "Settings",
  //   href: "/company-dashboard/settings",
  // },
  // {
  //   icon: IoMdHelpCircleOutline,
  //   label: "Support",
  //   href: "/company-dashboard/support",
  // },
];

const AdminSidebar: React.FC<SidebarProps> = ({
  items = defaultSidebarItems,
  onItemClick,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div
      className="flex flex-col h-full bg-white"
      style={{ boxShadow: "3px 4px 42.3px 0px #0000001A" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-2 sm:p-3 border-b border-[#E5E5E5]">
        <Link to="/">
          <img src={logo} className="h-8 sm:h-10 md:my-1 my-3" alt="Logo" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="space-y-4 md:space-y-6">
          {items.map((item) => {
            const isDashboard = item.label === "Dashboard";

            const isActive =
              location.pathname === item.href ||
              (!isDashboard && location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onItemClick}
                className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                  isActive
                    ? "text-[#10B981] border-[#10B981]"
                    : "text-[#666666] border-transparent hover:text-[#10B981] hover:border-[#10B981]"
                }`}
              >
                <div className="flex items-center space-x-2 md:text-lg">
                  <item.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-[#10B981]"
                        : "text-[#666666] hover:text-[#10B981]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[#E5E5E5]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-2 px-3 py-2 text-sm font-medium text-red-600 transition-colors rounded-md hover:bg-red-50 cursor-pointer bg-[#F3DCDC]"
        >
          <TbLogout className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
