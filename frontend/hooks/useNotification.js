"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "@/services/notification";

export function useNotification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    getNotifications()
      .then((items) => {
        setNotifications(items);
        setUnreadCount(items.filter((n) => !n.isRead).length);
      })
      .catch(() => {
        setNotifications([]);
        setUnreadCount(0);
      });
  }, []);

  return { notifications, unreadCount };
}
