import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { MdNotificationsActive } from "react-icons/md";
import { useState } from "react";
// import {
//   useGetAllMyNotificationQuery,
//   useUpdateNotificationStatusMutation,
// } from "@/redux/api/notification/notificationApi";
// import { useAppSelector } from "@/redux/hooks/redux-hook";
// import { selectUser } from "@/redux/features/user/userSlice";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  useGetAllMyNotificationQuery,
  useUpdateNotificationStatusMutation,
} from "@/store/api/notification/notificationApi";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/Slices/user/userSlice";

export interface NavbarProps {
  onMobileMenuToggle: () => void;
  notificationCount?: number;
  cartItems?: number;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  userInitials?: string;
  isSidebarOpen: boolean;
}

const AdminDashboardNavbar: React.FC<NavbarProps> = ({
  onMobileMenuToggle,
  // notificationCount = 20,

  userRole = "Company",
  userName = "Robert Fox",
  userAvatar = "/placeholder-avatar.jpg",
  userInitials = "RF",
  isSidebarOpen,
}) => {
  console.log("isSidebarOpen", isSidebarOpen);
  const [updateNotification] = useUpdateNotificationStatusMutation();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const { data, refetch } = useGetAllMyNotificationQuery(
    { id: user?._id },
    { skip: !user?._id }
  );
  const notifications = data?.data;
  console.log({ notifications });
  const handleClearAll = async () => {
    const unreadedNotification = notifications
      ?.filter((el: { isRead: boolean; _id: string }) => !el.isRead)
      .map((el: { isRead: boolean; _id: string }) => el._id);
    console.log({ unreadedNotification });
    try {
      if (unreadedNotification?.length === 0) {
        return;
      }
      const result = await updateNotification({
        notifications: unreadedNotification,
      }).unwrap();
      console.log(result);
      if (result?.success) {
        refetch();
        toast.success("Notification marked as read");
      }
    } catch (error) {}
  };
  return (
    <div className={`bg-white relative   border-foundation-white`}>
      <header
        className={` ${
          isSidebarOpen
            ? " w-full max-w-[1400px] mx-auto my-auto   px-4 md:px-10  "
            : " px-4"
        }`}
      >
        <div className="flex items-center justify-between py-3">
          {/* Left Side - Mobile Menu & Title */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMobileMenuToggle}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* User Info */}

            <div className="flex items-center space-x-2 ">
              <Avatar className="w-8 h-8 md:w-10 md:h-10 border">
                <AvatarImage src={userAvatar} alt="User" />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-medium text-[#1A1A1A]">{userName}</p>
                <p className="text-sm font-medium text-[#6A6A6A]">{userRole}</p>
              </div>
            </div>
          </div>

          <div
            className="relative p-1.5 flex items-center justify-center mr-8 rounded-full   hover:shadow-lg transition-shadow duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdNotificationsActive
              size={32}
              className=" text-[#2563EB] bg-transparent transition-transform cursor-pointer duration-200 hover:scale-110"
            />

            {notifications?.filter((el: { isRead: boolean }) => !el?.isRead)
              ?.length > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs font-semibold rounded-full shadow-sm">
                {notifications?.filter((el: { isRead: boolean }) => !el?.isRead)
                  ?.length > 99
                  ? "99+"
                  : notifications?.filter(
                      (el: { isRead: boolean }) => !el?.isRead
                    )?.length}
              </Badge>
            )}
          </div>
        </div>
      </header>
      {isOpen && (
        <div className="absolute right-12 mt-2 w-96 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700">Notifications</h3>
            <button
              onClick={handleClearAll}
              className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Clear All
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 && (
              <p className="text-center text-gray-500 p-4">No notifications</p>
            )}
            {notifications?.map((n: any) => (
              <div
                key={n.id}
                className="flex items-start  p-4 space-x-3 hover:bg-gray-50 cursor-pointer"
              >
                <img
                  src={n.avatar}
                  alt={n.title}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 relative">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-700">{n?.type}</p>
                    <p className="text-[10px]">
                      {" "}
                      {formatDistanceToNow(new Date(n?.createdAt), {
                        addSuffix: true,
                      }).replace("about ", "")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{n?.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  {!n?.isRead && (
                    <p className="h-2 w-2 rounded-full absolute -top-2.5 right-2 bg-red-600"></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardNavbar;
