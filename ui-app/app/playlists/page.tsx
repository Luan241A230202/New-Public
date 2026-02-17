"use client";

import { List, Plus, Video } from "lucide-react";
import Link from "next/link";

export default function Playlists() {
  const playlists = [
    { id: 1, name: "Yêu thích", videoCount: 45, thumbnail: "" },
    { id: 2, name: "Học lập trình", videoCount: 23, thumbnail: "" },
    { id: 3, name: "Giải trí", videoCount: 67, thumbnail: "" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <List className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Playlist của tôi</h1>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tạo playlist mới
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Link key={playlist.id} href={`/playlist/${playlist.id}`} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{playlist.name}</h3>
              <p className="text-gray-300 text-sm">{playlist.videoCount} video</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
