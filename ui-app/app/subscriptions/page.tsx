"use client";

import { Users, Bell, BellOff } from "lucide-react";

export default function Subscriptions() {
  const channels = [
    { id: 1, name: "Tech Channel", subscribers: "125K", avatar: "" },
    { id: 2, name: "Dev Tips", subscribers: "89K", avatar: "" },
    { id: 3, name: "Code Master", subscribers: "234K", avatar: "" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">Đã đăng ký</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div key={channel.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg text-center mb-1">{channel.name}</h3>
              <p className="text-gray-300 text-sm text-center mb-4">{channel.subscribers} người đăng ký</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                Đã đăng ký
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
