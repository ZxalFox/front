"use client";
import React from "react";

const Notifications = () => {
  // const [notifications, setNotifications] = useState<string[]>([]);

  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Diário de Emoções</h1>

      {/* Notificações */}
      {/* {notifications.length > 0 && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white p-4 rounded shadow-md">
          {notifications.map((notif, index) => (
            <p key={index}>{notif}</p>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Notifications;
