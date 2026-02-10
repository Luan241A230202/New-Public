import { Play, TrendingUp, Star, Eye, ThumbsUp, Clock, Sparkles, Zap, Award, Gift } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-8 py-8 container mx-auto px-4">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">Welcome to New Public</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Nền tảng video với NFT & Monetization
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Chia sẻ, kiếm tiền và xây dựng cộng đồng với công nghệ blockchain
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/upload"
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Tải video lên
            </Link>
            <Link
              href="/explore"
              className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/30 transition-all inline-flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Khám phá
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-purple-600"></div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Play, label: 'Videos', value: '45.8K', color: 'text-blue-600' },
          { icon: Eye, label: 'Lượt xem', value: '12.4M', color: 'text-purple-600' },
          { icon: Star, label: 'Creators', value: '8.2K', color: 'text-yellow-600' },
          { icon: Award, label: 'NFTs', value: '15.6K', color: 'text-pink-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Trending Videos */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-red-500" />
            Videos Trending
          </h2>
          <Link href="/trending" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            Xem tất cả
            <Play className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Link key={i} href={`/video/${i}`} className="group">
              <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden mb-3 group-hover:shadow-xl transition-all">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-lg font-medium">
                  12:34
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs rounded-lg font-bold uppercase flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Live
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                  Amazing Video Title That Is Very Long {i}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                  <span className="font-medium">Creator Name</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    1.2K
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    234
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    2 days ago
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-500" />
          Danh mục nổi bật
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Gaming', icon: '🎮', color: 'from-green-400 to-cyan-500' },
            { name: 'Music', icon: '🎵', color: 'from-pink-400 to-red-500' },
            { name: 'Education', icon: '📚', color: 'from-blue-400 to-indigo-500' },
            { name: 'Entertainment', icon: '🎬', color: 'from-purple-400 to-pink-500' },
            { name: 'Technology', icon: '💻', color: 'from-cyan-400 to-blue-500' },
            { name: 'Sports', icon: '⚽', color: 'from-orange-400 to-red-500' },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${cat.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative text-center">
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="font-semibold">{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Tính năng nổi bật</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Gift,
              title: 'NFT Marketplace',
              description: 'Mint, mua bán và sưu tập NFT video từ các creators yêu thích',
              color: 'text-pink-600',
              bg: 'bg-pink-50 dark:bg-pink-900/20',
            },
            {
              icon: Star,
              title: 'Stars System',
              description: 'Tip creators, unlock content và tham gia các hoạt động cộng đồng',
              color: 'text-yellow-600',
              bg: 'bg-yellow-50 dark:bg-yellow-900/20',
            },
            {
              icon: Award,
              title: 'Membership',
              description: 'Trở thành thành viên VIP để nhận nhiều quyền lợi độc quyền',
              color: 'text-purple-600',
              bg: 'bg-purple-50 dark:bg-purple-900/20',
            },
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bg} mb-4`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
