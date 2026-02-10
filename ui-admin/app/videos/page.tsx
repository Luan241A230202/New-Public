'use client';

import { Video, Search, Filter, Eye, ThumbsUp, MessageSquare, Flag, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function VideosManagementPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const videos = [
    { id: 1, title: 'Amazing Video Content', creator: 'John Doe', views: '125K', likes: '2.5K', status: 'PUBLISHED', flagged: false, duration: '12:34', published: '2 days ago' },
    { id: 2, title: 'Tutorial: How to Create', creator: 'Jane Smith', views: '89K', likes: '1.8K', status: 'PUBLISHED', flagged: false, duration: '25:15', published: '5 days ago' },
    { id: 3, title: 'Controversial Content', creator: 'Bob Wilson', views: '45K', likes: '234', status: 'FLAGGED', flagged: true, duration: '8:42', published: '1 day ago' },
    { id: 4, title: 'Pending Review Video', creator: 'Alice Johnson', views: '0', likes: '0', status: 'PENDING', flagged: false, duration: '15:30', published: '1 hour ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Video className="w-8 h-8" />
          Videos Management
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Videos', value: '45,678', icon: Video, color: 'text-blue-600' },
          { label: 'Published', value: '42,345', icon: CheckCircle, color: 'text-green-600' },
          { label: 'Pending', value: '234', icon: Clock, color: 'text-yellow-600' },
          { label: 'Flagged', value: '89', icon: Flag, color: 'text-red-600' },
          { label: 'Removed', value: '3,010', icon: XCircle, color: 'text-gray-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos by title, creator..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'published', 'pending', 'flagged'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium capitalize ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-4">
              <div className="w-64 aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex-shrink-0 relative">
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                  {video.duration}
                </div>
                {video.flagged && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs rounded flex items-center gap-1">
                    <Flag className="w-3 h-3" />
                    Flagged
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by {video.creator} • {video.published}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    video.status === 'PUBLISHED' ? 'bg-green-100 text-green-600' :
                    video.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {video.status}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {video.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {video.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    Comments
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  {video.status === 'PENDING' && (
                    <>
                      <button className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                  {video.flagged && (
                    <button className="px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/30 flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      Review Reports
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
