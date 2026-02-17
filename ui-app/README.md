# UI App - Ứng dụng người dùng chính

Đây là ứng dụng frontend chính cho người dùng của New Public Platform.

## Công nghệ

- **Next.js 14+** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching và caching

## Cài đặt

```bash
npm install
```

## Chạy development

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## Tính năng chính

### Trang chủ
- Feed video trending
- Danh mục videos
- Đề xuất video cá nhân hóa

### Video Player
- Trình phát video HLS
- Comments và reactions
- Like, share, gift
- Chapter navigation

### Khám phá
- Tìm kiếm videos, creators, playlists
- Browse theo categories
- Trending hashtags

### Profile
- Thông tin cá nhân
- Videos đã upload
- Playlists
- Lịch sử xem
- Watch later

### Membership
- Mua membership plans
- Season pass
- Stars wallet
- NFT collection

### Community
- Bài viết cộng đồng
- Polls và voting
- Theo dõi creators
- Notifications

## Cấu trúc thư mục

```
ui-app/
├── app/              # App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Trang chủ
│   ├── video/        # Video pages
│   ├── search/       # Tìm kiếm
│   ├── profile/      # Profile pages
│   └── ...
├── components/       # React components
│   ├── ui/           # UI components
│   ├── video/        # Video components
│   └── ...
├── lib/              # Utilities
│   ├── api.ts        # API client
│   └── ...
└── public/           # Static files
```

## API Backend

Frontend kết nối với backend API tại `/api/*` endpoints. Xem `API-Documentation.txt` để biết chi tiết.

## Deploy

```bash
npm run build
npm start
```

hoặc deploy lên Vercel:

```bash
vercel deploy
```
