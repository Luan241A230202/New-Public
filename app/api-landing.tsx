/**
 * Luxury API Platform Landing Page
 * Purple & Black Theme - Enterprise Grade
 */

import Link from "next/link";

export default function LuxuryAPILanding() {
  // API Statistics
  const stats = [
    { value: "398+", label: "HTTP Endpoints", glow: true },
    { value: "275+", label: "Route Files", glow: false },
    { value: "99.9%", label: "Uptime SLA", glow: true },
    { value: "< 50ms", label: "Avg Response", glow: false },
  ];

  // API Categories
  const categories = [
    {
      name: "Authentication & Users",
      endpoints: 40,
      icon: "🔐",
      color: "from-purple-500 to-purple-700",
    },
    {
      name: "Video Management",
      endpoints: 75,
      icon: "🎬",
      color: "from-purple-600 to-purple-800",
    },
    {
      name: "Payment & NFT",
      endpoints: 35,
      icon: "💎",
      color: "from-purple-500 to-purple-900",
    },
    {
      name: "ML/AI & Analytics",
      endpoints: 20,
      icon: "🤖",
      color: "from-purple-400 to-purple-700",
    },
    {
      name: "Infrastructure",
      endpoints: 30,
      icon: "⚙️",
      color: "from-purple-600 to-purple-900",
    },
    {
      name: "Real-time & CDN",
      endpoints: 15,
      icon: "⚡",
      color: "from-purple-500 to-purple-800",
    },
  ];

  // Featured Endpoints
  const featured = [
    {
      method: "POST",
      path: "/api/auth/login",
      description: "Authenticate users with NextAuth",
      color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
    },
    {
      method: "GET",
      path: "/api/videos/trending",
      description: "Get trending video content",
      color: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    },
    {
      method: "POST",
      path: "/api/ml/recommendations",
      description: "ML-powered personalized recommendations",
      color: "bg-purple-500/20 border-purple-500/30 text-purple-400",
    },
    {
      method: "GET",
      path: "/api/graphql",
      description: "GraphQL query layer for flexible data fetching",
      color: "bg-pink-500/20 border-pink-500/30 text-pink-400",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="luxury-hero relative mb-16">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="luxury-badge luxury-badge-glow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
              </span>
              All Systems Operational
            </span>
            <span className="luxury-badge">v4.16.28</span>
          </div>

          <h1 className="mb-4 text-6xl font-extrabold leading-tight md:text-7xl lg:text-8xl">
            Enterprise API
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-xl text-purple-200/80">
            Production-ready RESTful & GraphQL APIs. Built for scale, secured by design,
            powered by cutting-edge ML/AI technology.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/api-docs" className="luxury-btn luxury-btn-primary">
              📚 Explore Documentation
            </Link>
            <Link href="#endpoints" className="luxury-btn luxury-btn-ghost">
              🚀 View Endpoints
            </Link>
            <button className="luxury-btn luxury-btn-ghost">
              ⚡ Get API Key
            </button>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="luxury-float absolute right-20 top-20 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="luxury-float absolute bottom-20 left-20 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl" style={{ animationDelay: "1s" }}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`luxury-card text-center ${stat.glow ? "luxury-card-premium" : ""}`}
            >
              <div className="luxury-stat-value">{stat.value}</div>
              <div className="luxury-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* API Categories */}
      <section id="endpoints" className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-4xl font-bold">API Categories</h2>
          <p className="text-lg text-purple-300/70">
            Comprehensive coverage across all platform features
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="luxury-card luxury-glow group cursor-pointer"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-4xl">{category.icon}</span>
                <span className="luxury-badge">{category.endpoints} endpoints</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-purple-200">
                {category.name}
              </h3>
              <div className="h-1 w-20 rounded-full bg-gradient-to-r opacity-60 group-hover:w-full group-hover:opacity-100 transition-all duration-500" 
                   style={{ backgroundImage: `linear-gradient(to right, var(--luxury-purple-500), var(--luxury-purple-700))` }}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Endpoints */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-4xl font-bold">Featured Endpoints</h2>
          <p className="text-lg text-purple-300/70">
            Most popular and powerful API endpoints
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((endpoint, index) => (
            <div key={index} className="luxury-card luxury-glass">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`rounded-lg border px-3 py-1 text-xs font-bold ${endpoint.color}`}
                >
                  {endpoint.method}
                </span>
                <code className="text-sm font-semibold text-purple-300">
                  {endpoint.path}
                </code>
              </div>
              <p className="text-sm text-purple-200/70">{endpoint.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/api-docs" className="luxury-btn luxury-btn-primary">
            View All 398+ Endpoints →
          </Link>
        </div>
      </section>

      {/* Code Example */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-4xl font-bold">Quick Start</h2>
          <p className="text-lg text-purple-300/70">
            Get started in seconds with our SDKs
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* JavaScript Example */}
          <div className="luxury-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-purple-200">JavaScript / Node.js</h3>
              <span className="luxury-badge">npm</span>
            </div>
            <div className="luxury-code">
              <pre className="text-sm">
                <code>{`// Install SDK
npm install @videoshare/api-client

// Initialize
import { VideoShareAPI } from '@videoshare/api-client';

const api = new VideoShareAPI({
  apiKey: process.env.API_KEY
});

// Get trending videos
const trending = await api.videos.trending({
  limit: 10,
  period: '24h'
});

console.log(trending);`}</code>
              </pre>
            </div>
          </div>

          {/* cURL Example */}
          <div className="luxury-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-purple-200">cURL</h3>
              <span className="luxury-badge">HTTP</span>
            </div>
            <div className="luxury-code">
              <pre className="text-sm">
                <code>{`# Make API request
curl -X GET \\
  https://api.example.com/api/videos/trending \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"

# Response
{
  "success": true,
  "data": {
    "videos": [...],
    "total": 150,
    "page": 1
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-4xl font-bold">Enterprise Features</h2>
          <p className="text-lg text-purple-300/70">
            Production-grade infrastructure built for reliability
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "🔒", title: "Enterprise Security", desc: "OAuth 2.0, JWT, Rate limiting" },
            { icon: "⚡", title: "High Performance", desc: "< 50ms avg response time" },
            { icon: "📊", title: "Real-time Analytics", desc: "Track usage, performance, errors" },
            { icon: "🌍", title: "Multi-region CDN", desc: "Global content delivery" },
            { icon: "🤖", title: "ML/AI Powered", desc: "Intelligent recommendations" },
            { icon: "📈", title: "Auto-scaling", desc: "Handle millions of requests" },
          ].map((feature, index) => (
            <div key={index} className="luxury-card text-center">
              <div className="mb-3 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-purple-200">{feature.title}</h3>
              <p className="text-sm text-purple-300/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="luxury-hero text-center">
          <h2 className="mb-4 text-4xl font-bold">Ready to Build?</h2>
          <p className="mb-8 text-xl text-purple-200/80">
            Join thousands of developers building on our platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/api-docs" className="luxury-btn luxury-btn-primary">
              Get Started Free
            </Link>
            <Link href="/register" className="luxury-btn luxury-btn-ghost">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Status Footer */}
      <section className="mb-8">
        <div className="luxury-glass rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="mb-1 text-lg font-bold text-purple-200">System Status</h3>
              <p className="text-sm text-purple-300/70">All services operational</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="api-status api-status-online">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
                API Gateway
              </span>
              <span className="api-status api-status-online">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
                Database
              </span>
              <span className="api-status api-status-online">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
                CDN
              </span>
              <span className="api-status api-status-online">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
                WebSocket
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
