"use client";

import { TrendingUp, Play, Eye, ThumbsUp, MessageSquare } from "lucide-react";

export default function Trending() {
  const videos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Video thịnh hành #${i + 1}`,
    channel: "Creator Name",
    views: Math.floor(Math.random() * 1000000),
    likes: Math.floor(Math.random() * 50000),
    comments: Math.floor(Math.random() * 5000),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">Xu hướng</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:scale-105 transition-all">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{video.channel}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{(video.views / 1000).toFixed(0)}K</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{(video.likes / 1000).toFixed(0)}K</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{video.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
