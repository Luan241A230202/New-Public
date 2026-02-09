'use client';

import { Play, ThumbsUp, ThumbsDown, Share2, Download, Flag, Eye, Clock, Star, Gift, MessageSquare, Heart, Bookmark, Sparkles, Crown, Award } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Comment with Super Thanks support
interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; name: string } | null;
  isSuperThanks: boolean;
  superThanksStars: number;
  superThanksQty: number;
  senderAnonymous: boolean;
  isTopSupporter: boolean;
}

export default function VideoPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [showSuperThanksModal, setShowSuperThanksModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [superThanksStars, setSuperThanksStars] = useState(5);
  const [superThanksAnonymous, setSuperThanksAnonymous] = useState(false);
  
  // Mock comments data with Super Thanks
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content: 'Amazing video! This helped me so much! 🔥',
      createdAt: '2024-01-15T10:30:00Z',
      user: { id: 'user1', name: 'John Doe' },
      isSuperThanks: true,
      superThanksStars: 75,
      superThanksQty: 3,
      senderAnonymous: false,
      isTopSupporter: true,
    },
    {
      id: '2',
      content: 'Great content! Keep it up!',
      createdAt: '2024-01-15T11:00:00Z',
      user: { id: 'user2', name: 'Jane Smith' },
      isSuperThanks: true,
      superThanksStars: 30,
      superThanksQty: 2,
      senderAnonymous: false,
      isTopSupporter: false,
    },
    {
      id: '3',
      content: 'Thanks for sharing this!',
      createdAt: '2024-01-15T12:00:00Z',
      user: { id: 'user3', name: 'Bob Johnson' },
      isSuperThanks: true,
      superThanksStars: 8,
      superThanksQty: 1,
      senderAnonymous: true,
      isTopSupporter: false,
    },
    {
      id: '4',
      content: 'Nice video!',
      createdAt: '2024-01-15T13:00:00Z',
      user: { id: 'user4', name: 'Alice Brown' },
      isSuperThanks: false,
      superThanksStars: 0,
      superThanksQty: 0,
      senderAnonymous: false,
      isTopSupporter: false,
    },
  ]);

  // Get tier based on stars
  const getTier = (stars: number) => {
    if (stars <= 5) return 'bronze';
    if (stars <= 10) return 'silver';
    if (stars <= 25) return 'gold';
    if (stars <= 50) return 'platinum';
    return 'diamond';
  };

  // Get tier colors
  const getTierColors = (stars: number) => {
    const tier = getTier(stars);
    switch (tier) {
      case 'bronze':
        return {
          gradient: 'from-amber-700 to-amber-600',
          border: 'border-amber-500',
          glow: 'shadow-amber-500/50',
          badge: 'bg-gradient-to-r from-amber-700 to-amber-600',
          text: 'text-amber-700',
        };
      case 'silver':
        return {
          gradient: 'from-gray-400 to-gray-300',
          border: 'border-gray-400',
          glow: 'shadow-gray-400/50',
          badge: 'bg-gradient-to-r from-gray-400 to-gray-300',
          text: 'text-gray-700',
        };
      case 'gold':
        return {
          gradient: 'from-yellow-500 to-amber-500',
          border: 'border-yellow-400',
          glow: 'shadow-yellow-500/50',
          badge: 'bg-gradient-to-r from-yellow-500 to-amber-500',
          text: 'text-yellow-600',
        };
      case 'platinum':
        return {
          gradient: 'from-slate-300 to-slate-200',
          border: 'border-slate-400',
          glow: 'shadow-slate-400/50',
          badge: 'bg-gradient-to-r from-slate-300 to-slate-200',
          text: 'text-slate-700',
        };
      case 'diamond':
        return {
          gradient: 'from-purple-500 to-pink-500',
          border: 'border-purple-400',
          glow: 'shadow-purple-500/50',
          badge: 'bg-gradient-to-r from-purple-500 to-pink-500',
          text: 'text-purple-600',
        };
      default:
        return {
          gradient: 'from-gray-200 to-gray-100',
          border: 'border-gray-300',
          glow: 'shadow-gray-300/50',
          badge: 'bg-gray-200',
          text: 'text-gray-600',
        };
    }
  };

  const handleSuperThanks = (comment: Comment) => {
    setSelectedComment(comment);
    setShowSuperThanksModal(true);
  };

  const sendSuperThanks = async () => {
    if (!selectedComment) return;
    
    // Here you would call the API
    // await fetch(`/api/comments/${selectedComment.id}/super-thanks`, {
    //   method: 'POST',
    //   body: JSON.stringify({ stars: superThanksStars, anonymous: superThanksAnonymous }),
    // });
    
    // Update local state
    setComments(prev => 
      prev.map(c => 
        c.id === selectedComment.id
          ? {
              ...c,
              isSuperThanks: true,
              superThanksStars: c.superThanksStars + superThanksStars,
              superThanksQty: c.superThanksQty + 1,
            }
          : c
      )
    );
    
    setShowSuperThanksModal(false);
    setSuperThanksStars(5);
    setSuperThanksAnonymous(false);
  };

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
                Comments ({comments.length})
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
                {comments.map((c) => {
                  const tierColors = getTierColors(c.superThanksStars);
                  const isSuperThanks = c.isSuperThanks;
                  
                  return (
                    <div
                      key={c.id}
                      className={`flex gap-3 relative ${
                        isSuperThanks
                          ? `super-thanks-comment p-4 rounded-xl border-2 ${tierColors.border} bg-gradient-to-br ${tierColors.gradient} bg-opacity-5 shadow-lg ${tierColors.glow} hover:scale-[1.02] transition-all duration-300`
                          : ''
                      }`}
                    >
                      {/* Shimmer effect for Super Thanks */}
                      {isSuperThanks && (
                        <>
                          <div className="absolute inset-0 shimmer-effect rounded-xl pointer-events-none"></div>
                          
                          {/* Sparkle effects - number of sparkles based on star count */}
                          {Array.from({ length: Math.min(5, Math.ceil(c.superThanksStars / 10)) }).map((_, idx) => (
                            <div
                              key={idx}
                              className="absolute sparkle-effect"
                              style={{
                                top: `${20 + idx * 15}%`,
                                right: `${10 + idx * 5}%`,
                                animationDelay: `${idx * 0.3}s`,
                              }}
                            >
                              <Sparkles className="w-4 h-4 text-yellow-400" />
                            </div>
                          ))}
                        </>
                      )}

                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex-shrink-0 relative">
                        {isSuperThanks && (
                          <div className="absolute -top-1 -right-1 spinning-star">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`font-semibold ${isSuperThanks ? 'font-bold' : ''}`}>
                            {c.senderAnonymous ? 'Anonymous Supporter' : c.user?.name || 'Unknown'}
                          </span>
                          
                          {/* Super Thanks Badge */}
                          {isSuperThanks && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white ${tierColors.badge} pulse-animation`}>
                              <Star className="w-3 h-3 fill-white" />
                              Super Thanks {c.superThanksStars} stars
                            </span>
                          )}
                          
                          {/* TOP SUPPORTER Badge */}
                          {c.isTopSupporter && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
                              <Crown className="w-3 h-3" />
                              TOP SUPPORTER
                            </span>
                          )}
                          
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className={`text-gray-700 dark:text-gray-300 mb-2 ${isSuperThanks ? 'font-medium' : ''}`}>
                          {c.content}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>12</span>
                          </button>
                          <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                            Reply
                          </button>
                          
                          {/* Super Thanks Button */}
                          {!c.senderAnonymous && (
                            <button
                              onClick={() => handleSuperThanks(c)}
                              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs font-semibold hover:from-yellow-600 hover:to-orange-600 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                              <Star className="w-3 h-3 fill-white" />
                              Super Thanks
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
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

      {/* Super Thanks Modal */}
      {showSuperThanksModal && selectedComment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                Send Super Thanks
              </h3>
              <button
                onClick={() => setShowSuperThanksModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Sending Super Thanks to:
              </p>
              <p className="font-semibold">{selectedComment.user?.name || 'Unknown'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                "{selectedComment.content}"
              </p>
            </div>

            {/* Star Amount Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Star Amount (1-100):
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={superThanksStars}
                  onChange={(e) => setSuperThanksStars(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${superThanksStars}%, #e5e7eb ${superThanksStars}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="w-20 px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-center font-bold">
                  {superThanksStars}
                  <Star className="w-4 h-4 inline ml-1 fill-white" />
                </div>
              </div>
              
              {/* Quick Select Buttons */}
              <div className="flex gap-2 mt-3">
                {[5, 10, 25, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSuperThanksStars(amount)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      superThanksStars === amount
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier Preview */}
            <div className="mb-4 p-3 rounded-xl bg-gradient-to-r ${getTierColors(superThanksStars).gradient} bg-opacity-10 border-2 ${getTierColors(superThanksStars).border}">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Tier: {getTier(superThanksStars).toUpperCase()}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getTierColors(superThanksStars).badge}`}>
                  {superThanksStars} ⭐
                </span>
              </div>
            </div>

            {/* Anonymous Option */}
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={superThanksAnonymous}
                onChange={(e) => setSuperThanksAnonymous(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm">Send anonymously</span>
            </label>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuperThanksModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendSuperThanks}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Send {superThanksStars} ⭐
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
          }
        }

        .sparkle-effect {
          animation: sparkle 2s infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .spinning-star {
          animation: spin-slow 4s linear infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .pulse-animation {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }

        .super-thanks-comment {
          position: relative;
          overflow: hidden;
        }

        .super-thanks-comment:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
                      0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 8px;
        }

        textarea::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
