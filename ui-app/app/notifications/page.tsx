'use client';

import { Bell, Heart, MessageSquare, UserPlus, Video, Gift, TrendingUp, Settings, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');

  const notifications = [
    { icon: Heart, type: 'like', title: 'New Like', message: 'User123 liked your video "Amazing Content"', time: '5 minutes ago', unread: true, color: 'text-red-500' },
    { icon: MessageSquare, type: 'comment', title: 'New Comment', message: 'Creator456 commented on your video', time: '1 hour ago', unread: true, color: 'text-blue-500' },
    { icon: UserPlus, type: 'subscribe', title: 'New Subscriber', message: 'You have a new subscriber!', time: '2 hours ago', unread: true, color: 'text-green-500' },
    { icon: Gift, type: 'gift', title: 'Gift Received', message: 'Someone sent you a gift worth 100 stars', time: '5 hours ago', unread: false, color: 'text-purple-500' },
    { icon: Video, type: 'upload', title: 'Upload Complete', message: 'Your video has been published successfully', time: '1 day ago', unread: false, color: 'text-cyan-500' },
    { icon: TrendingUp, type: 'trending', title: 'Trending Video', message: 'Your video is now trending!', time: '2 days ago', unread: false, color: 'text-orange-500' },
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
    ? notifications.filter(n => n.unread)
    : notifications.filter(n => n.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="w-8 h-8" />
            Notifications
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'All', icon: Bell },
              { key: 'unread', label: 'Unread', icon: null },
              { key: 'like', label: 'Likes', icon: Heart },
              { key: 'comment', label: 'Comments', icon: MessageSquare },
              { key: 'subscribe', label: 'Subscribers', icon: UserPlus },
              { key: 'gift', label: 'Gifts', icon: Gift },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === f.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {f.icon && <f.icon className="w-4 h-4" />}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm">
              <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-gray-600 dark:text-gray-400">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notif, i) => (
              <div
                key={i}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all ${
                  notif.unread ? 'border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                    <notif.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        {notif.title}
                        {notif.unread && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{notif.message}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-all">
                      <Check className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-all">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mark All Read */}
        {filteredNotifications.some(n => n.unread) && (
          <div className="mt-6 text-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
              Mark All as Read
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
