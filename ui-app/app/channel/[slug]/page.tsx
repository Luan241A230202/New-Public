"use client";

import { Users, Video, Bell, Play, Eye } from "lucide-react";

export default function Channel({ params }: { params: { slug: string } }) {
  const videos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Video ${i + 1}`,
    views: Math.floor(Math.random() * 100000),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-48" />
      
      <div className="max-w-7xl mx-auto px-4 -mt-24">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">Tên kênh</h1>
              <p className="text-gray-300 mb-4">@{params.slug}</p>
              <div className="flex items-center gap-6 text-gray-300 mb-4">
                <span className="flex items-center gap-2"><Users className="w-4 h-4" />125K người đăng ký</span>
                <span className="flex items-center gap-2"><Video className="w-4 h-4" />234 video</span>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:scale-105 transition-all">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-300 text-sm flex items-center gap-1"><Eye className="w-3 h-3" />{video.views.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
