/**
 * Luxury API Documentation Page
 * Purple & Black Theme - Enterprise Grade
 */

import { Metadata } from 'next';
import SwaggerUIComponent from './SwaggerUI';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API Documentation - Luxury API Platform',
  description: 'Interactive API documentation with 398+ endpoints - Enterprise grade platform',
};

export default function SwaggerPage() {
  const stats = [
    { label: "Total Endpoints", value: "398+", icon: "🚀" },
    { label: "Categories", value: "40+", icon: "📁" },
    { label: "Uptime", value: "99.9%", icon: "✅" },
    { label: "Avg Response", value: "< 50ms", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="luxury-hero mb-8">
        <div className="relative z-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="luxury-badge luxury-badge-glow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
              </span>
              Live Documentation
            </span>
            <span className="luxury-badge">v4.16.28</span>
            <span className="luxury-badge">OpenAPI 3.0.3</span>
          </div>

          <h1 className="mb-3 text-5xl font-extrabold lg:text-6xl">
            API Documentation
          </h1>
          <p className="mb-6 max-w-3xl text-xl text-purple-200/80">
            Explore our comprehensive API with 398+ endpoints. RESTful, GraphQL, WebSocket - all in one platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/" className="luxury-btn luxury-btn-ghost">
              ← Back to Home
            </Link>
            <a href="#swagger" className="luxury-btn luxury-btn-primary">
              📖 Browse Endpoints
            </a>
            <button className="luxury-btn luxury-btn-ghost">
              🔑 Get API Key
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="luxury-card-premium text-center">
            <div className="mb-2 text-3xl">{stat.icon}</div>
            <div className="luxury-stat-value text-3xl">{stat.value}</div>
            <div className="luxury-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <div className="luxury-card">
          <h2 className="mb-4 text-xl font-bold text-purple-200">Quick Navigation</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Authentication", path: "#tag/Authentication", icon: "🔐" },
              { name: "Videos", path: "#tag/Videos", icon: "🎬" },
              { name: "Payments", path: "#tag/Payments", icon: "💳" },
              { name: "ML/AI", path: "#tag/ML-AI", icon: "🤖" },
              { name: "Analytics", path: "#tag/Analytics", icon: "📊" },
              { name: "CDN", path: "#tag/CDN", icon: "🌍" },
              { name: "WebSocket", path: "#tag/WebSocket", icon: "⚡" },
              { name: "GraphQL", path: "#tag/GraphQL", icon: "💎" },
            ].map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="luxury-glass flex items-center gap-3 rounded-xl p-3 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-sm font-semibold text-purple-200">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Swagger UI Section */}
      <div id="swagger" className="luxury-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-purple-200">Interactive API Explorer</h2>
          <div className="flex gap-2">
            <span className="api-status api-status-online">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              Online
            </span>
          </div>
        </div>
        
        <div className="luxury-code overflow-hidden">
          <SwaggerUIComponent />
        </div>
      </div>

      {/* SDK Section */}
      <div className="mt-8">
        <div className="luxury-card">
          <h2 className="mb-4 text-2xl font-bold text-purple-200">SDK & Client Libraries</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "JavaScript / Node.js", icon: "💛", desc: "npm install @videoshare/api" },
              { name: "iOS / Swift", icon: "🍎", desc: "CocoaPods & SPM supported" },
              { name: "Android / Kotlin", icon: "🤖", desc: "Gradle & Maven ready" },
            ].map((sdk, index) => (
              <div key={index} className="luxury-glass rounded-xl p-4">
                <div className="mb-2 text-3xl">{sdk.icon}</div>
                <h3 className="mb-1 font-bold text-purple-200">{sdk.name}</h3>
                <p className="text-sm text-purple-300/70">{sdk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
