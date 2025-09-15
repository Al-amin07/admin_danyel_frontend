import { useEffect } from "react";

import { toast } from "sonner";

import { socket } from "./socket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/Slices/user/userSlice";

export const SocketProvider = () => {
  const user = useAppSelector(selectUser);
  const userId = user?._id;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!userId) return;

    // Register user on socket
    socket.emit("register", userId);
    console.log("Registered socket:", userId);

    // Listen for notifications
    socket.on("receive_notification", (notif) => {
      console.log("New notification:", notif);
      //   store.dispatch(notificationApi.util.invalidateTags(["NOTIFICATION"]));

      //   dispatch(addNotification(notif));
      // Optionally show toast here
    });

    // Listen for incoming messages
    socket.on("receive_message", (msg) => {
      console.log("New message:", msg);
      //   store.dispatch(messageApi.util.invalidateTags(["MESSAGE"]));
      toast.success(`${msg?.senderId?.name} sent you a message: ${msg?.text}`, {
        duration: 6000,
      });
    });

    return () => {
      socket.off("receive_notification");
      socket.off("receive_message");
    };
  }, [userId, dispatch]);

  return null; // this component doesn't render anything
};
