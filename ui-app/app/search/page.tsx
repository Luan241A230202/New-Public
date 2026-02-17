'use client';

import { Search as SearchIcon, Filter, SlidersHorizontal, Play, Eye, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex gap-4 items-center mb-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search videos, creators, playlists..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            {['all', 'videos', 'creators', 'playlists', 'live'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Search Results</h2>
          <p className="text-gray-600 dark:text-gray-400">Found 1,234 results</p>
        </div>

        <div className="grid gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Link
              key={i}
              href={`/video/${i}`}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="flex gap-4">
                <div className="w-80 aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-xl"></div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-lg">
                    12:34
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    Amazing Search Result Video Title {i}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                    <div>
                      <div className="font-medium">Creator Name</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">2.5M subscribers</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    This is a video description that shows what the video is about and helps users decide if they want to watch it.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      125K views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      2 days ago
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
