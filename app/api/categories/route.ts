import { NextRequest } from "next/server";

const categories = [
  { id: "gaming", name: "Gaming", icon: "🎮", description: "Video game và live stream" },
  { id: "education", name: "Giáo dục", icon: "📚", description: "Học tập và hướng dẫn" },
  { id: "entertainment", name: "Giải trí", icon: "🎬", description: "Phim ảnh và show" },
  { id: "music", name: "Âm nhạc", icon: "🎵", description: "MV và nhạc sống" },
  { id: "tech", name: "Công nghệ", icon: "💻", description: "Review và tin tức công nghệ" },
  { id: "sports", name: "Thể thao", icon: "⚽", description: "Thể thao và fitness" },
  { id: "food", name: "Ẩm thực", icon: "🍔", description: "Nấu ăn và review đồ ăn" },
  { id: "travel", name: "Du lịch", icon: "✈️", description: "Khám phá thế giới" },
  { id: "lifestyle", name: "Lifestyle", icon: "🌟", description: "Cuộc sống hàng ngày" },
  { id: "news", name: "Tin tức", icon: "📰", description: "Tin tức và sự kiện" },
];

export async function GET(req: NextRequest) {
  return Response.json({ categories });
}
