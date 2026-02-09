'use client';

import { Play, Eye, ThumbsUp, Star, Gift, Settings, Users, Video, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Profile Header */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-end gap-6 flex-wrap">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-4 border-white dark:border-gray-800 -mt-16"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">Creator Name</h1>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold">
                    Verified
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  @username • Content creator sharing amazing videos
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <strong>2.5M</strong> subscribers
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    <strong>342</strong> videos
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <strong>125M</strong> views
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                  Subscribe
                </button>
                <Link
                  href="/settings"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Star, label: 'Stars Earned', value: '12.5K', color: 'text-yellow-600' },
            { icon: Gift, label: 'Gifts Received', value: '8.2K', color: 'text-pink-600' },
            { icon: ThumbsUp, label: 'Total Likes', value: '156K', color: 'text-blue-600' },
            { icon: Calendar, label: 'Member Since', value: '2024', color: 'text-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-6">
          <div className="flex gap-1 p-2 border-b border-gray-200 dark:border-gray-700">
            {['Videos', 'Playlists', 'Community', 'About'].map((tab) => (
              <button
                key={tab}
                className="px-6 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Link key={i} href={`/video/${i}`} className="group">
                  <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden mb-2">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                      12:34
                    </div>
                  </div>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                    Video Title {i}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>125K views</span>
                    <span>•</span>
                    <span>2 days ago</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
