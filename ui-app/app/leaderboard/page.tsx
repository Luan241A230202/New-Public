"use client";

import { Trophy, Medal, Star, TrendingUp } from "lucide-react";

export default function Leaderboard() {
  const users = [
    { rank: 1, name: "User1", points: 12500, level: 50, badge: "🥇" },
    { rank: 2, name: "User2", points: 11200, level: 48, badge: "🥈" },
    { rank: 3, name: "User3", points: 10800, level: 45, badge: "🥉" },
    { rank: 4, name: "User4", points: 9500, level: 42, badge: "" },
    { rank: 5, name: "User5", points: 8900, level: 40, badge: "" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-10 h-10 text-yellow-400" />
          <h1 className="text-4xl font-bold text-white">Bảng xếp hạng</h1>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.rank} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex items-center gap-6">
              <div className="text-3xl font-bold text-white w-12">{user.badge || user.rank}</div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                <p className="text-gray-300">Level {user.level}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  {user.points.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm">điểm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
