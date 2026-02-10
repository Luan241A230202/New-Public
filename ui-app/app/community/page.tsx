"use client";

import { MessageSquare, Heart, Share2, Users } from "lucide-react";

export default function Community() {
  const posts = [
    { id: 1, author: "Tech Channel", content: "Xin chào mọi người! Video mới sắp ra mắt", likes: 234, comments: 45 },
    { id: 2, author: "Dev Tips", content: "Ai đang học React Server Components?", likes: 156, comments: 78 },
    { id: 3, author: "Code Master", content: "Tips TypeScript hữu ích hôm nay", likes: 389, comments: 92 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">Cộng đồng</h1>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                <div>
                  <h3 className="text-white font-semibold">{post.author}</h3>
                  <p className="text-gray-400 text-sm">2 giờ trước</p>
                </div>
              </div>
              <p className="text-white mb-4">{post.content}</p>
              <div className="flex items-center gap-6 text-gray-300">
                <button className="flex items-center gap-2 hover:text-purple-400"><Heart className="w-5 h-5" />{post.likes}</button>
                <button className="flex items-center gap-2 hover:text-purple-400"><MessageSquare className="w-5 h-5" />{post.comments}</button>
                <button className="flex items-center gap-2 hover:text-purple-400"><Share2 className="w-5 h-5" />Chia sẻ</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
