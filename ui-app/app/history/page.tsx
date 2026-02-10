"use client";

import { History as HistoryIcon, Play, X, Trash2 } from "lucide-react";

export default function History() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <HistoryIcon className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Lịch sử xem</h1>
          </div>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Xóa lịch sử
          </button>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <p className="text-gray-300">Lịch sử xem video của bạn sẽ hiển thị ở đây</p>
        </div>
      </div>
    </div>
  );
}
