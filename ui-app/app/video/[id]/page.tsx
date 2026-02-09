'use client';

import { Play, ThumbsUp, ThumbsDown, Share2, Download, Flag, Eye, Clock, Star, Gift, MessageSquare, Heart, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function VideoPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all group-hover:scale-110">
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                </button>
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 text-white rounded-lg text-sm font-medium">
                12:34
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h1 className="text-3xl font-bold mb-4">Amazing Video Title Goes Here</h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-5 h-5" />
                    125,432 views
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    2 days ago
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <Link href="/profile/creator" className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                  <div>
                    <div className="font-semibold">Creator Name</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">2.5M subscribers</div>
                  </div>
                </Link>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                  Subscribe
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 py-4 flex-wrap">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    liked ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>2,345</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                  <ThumbsDown className="w-5 h-5" />
                  <span>45</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    saved ? 'bg-yellow-600 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-all">
                  <Gift className="w-5 h-5" />
                  <span>Gift</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                  <Flag className="w-5 h-5" />
                  <span>Report</span>
                </button>
              </div>

              {/* Description */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  This is an amazing video description that tells viewers all about the content. 
                  It includes tags, links, and other important information about the video.
                  #gaming #tutorial #awesome
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                Comments (234)
              </h2>

              {/* Add Comment */}
              <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-cyan-400"></div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-400"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Username {i}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        This is a great comment about the video! Love it! 🔥
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span>12</span>
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Related Videos */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold mb-4">Related Videos</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Link key={i} href={`/video/${i}`} className="flex gap-3 group">
                    <div className="w-40 aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex-shrink-0 relative">
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                        8:42
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600">
                        Related Video Title {i}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Creator</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">1.2K views</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
