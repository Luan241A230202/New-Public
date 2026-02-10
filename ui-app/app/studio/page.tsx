"use client";

import Link from "next/link";
import { 
  Video, Upload, BarChart3, DollarSign, Users, 
  TrendingUp, Eye, ThumbsUp, MessageSquare,
  PlayCircle, Clock, Settings
} from "lucide-react";

export default function StudioDashboard() {
  const stats = {
    totalViews: 1245678,
    subscribers: 45230,
    likes: 89450,
    revenue: 12345,
    videos: 127,
    comments: 8934,
  };

  const recentVideos = [
    { id: 1, title: "Hướng dẫn Next.js 15", views: 12500, likes: 890, duration: "15:30" },
    { id: 2, title: "React Server Components", views: 8900, likes: 650, duration: "22:15" },
    { id: 3, title: "TypeScript Tips 2024", views: 6700, likes: 540, duration: "18:45" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Studio Dashboard</h1>
            <p className="text-gray-300">Quản lý kênh của bạn</p>
          </div>
          <Link 
            href="/studio/upload"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Tải lên video
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-gray-300 text-sm mb-1">Tổng lượt xem</p>
            <p className="text-3xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
            <p className="text-green-400 text-sm mt-2">+12.5% so với tháng trước</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-gray-300 text-sm mb-1">Người theo dõi</p>
            <p className="text-3xl font-bold text-white">{stats.subscribers.toLocaleString()}</p>
            <p className="text-green-400 text-sm mt-2">+8.3% so với tháng trước</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-gray-300 text-sm mb-1">Doanh thu tháng này</p>
            <p className="text-3xl font-bold text-white">${stats.revenue.toLocaleString()}</p>
            <p className="text-green-400 text-sm mt-2">+15.7% so với tháng trước</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link 
            href="/studio/videos"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
          >
            <Video className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Video của tôi</h3>
            <p className="text-gray-300 text-sm">Quản lý video đã tải lên</p>
          </Link>

          <Link 
            href="/studio/analytics"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
          >
            <BarChart3 className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Phân tích</h3>
            <p className="text-gray-300 text-sm">Xem thống kê chi tiết</p>
          </Link>

          <Link 
            href="/studio/monetization"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
          >
            <DollarSign className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Thu nhập</h3>
            <p className="text-gray-300 text-sm">Quản lý thu nhập</p>
          </Link>

          <Link 
            href="/studio/community"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
          >
            <Users className="w-8 h-8 text-pink-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-1">Cộng đồng</h3>
            <p className="text-gray-300 text-sm">Tương tác với người xem</p>
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Video gần đây</h2>
            <Link href="/studio/videos" className="text-purple-400 hover:text-purple-300">
              Xem tất cả →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentVideos.map((video) => (
              <div 
                key={video.id}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <div className="w-32 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{video.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {video.views.toLocaleString()} lượt xem
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {video.likes.toLocaleString()} thích
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {video.duration}
                    </span>
                  </div>
                </div>

                <Link 
                  href={`/studio/videos/${video.id}`}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Chỉnh sửa
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
