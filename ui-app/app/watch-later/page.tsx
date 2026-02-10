"use client";

import { Clock, X, Play, Eye, ThumbsUp } from "lucide-react";

export default function WatchLater() {
  const videos = [
    { id: 1, title: "Học Next.js 15 từ đầu", channel: "Tech Channel", views: 15000, likes: 890, duration: "25:30" },
    { id: 2, title: "React Server Components", channel: "Dev Tips", views: 8900, likes: 650, duration: "18:45" },
    { id: 3, title: "TypeScript Advanced", channel: "Code Master", views: 12000, likes: 1200, duration: "32:15" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-10 h-10 text-purple-400" />
          <div>
            <h1 className="text-4xl font-bold text-white">Xem sau</h1>
            <p className="text-gray-300">{videos.length} video</p>
          </div>
        </div>

        <div className="grid gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 flex gap-4 hover:bg-white/20 transition-all">
              <div className="w-48 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-gray-300 mb-2">{video.channel}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{video.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" />{video.likes}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{video.duration}</span>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg h-fit">
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
