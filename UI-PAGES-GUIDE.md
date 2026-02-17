# Hướng dẫn Sử dụng Giao diện UI

## Tổng quan

Dự án bao gồm 4 ứng dụng frontend độc lập:

1. **ui-app** - Ứng dụng chính cho người dùng (23 trang)
2. **ui-auth** - Xác thực và quản lý tài khoản (4 trang)
3. **ui-admin** - Dashboard quản trị hệ thống (8 trang)
4. **ui-walletscan** - Công cụ scan blockchain và wallet (5 trang)

---

## UI-APP - Ứng dụng người dùng

### 🏠 Trang chủ và khám phá

**`/` - Trang chủ**
- Hero section với gradient đẹp mắt
- Quick stats (users, videos, creators, transactions)
- Trending videos grid
- Featured categories với hover effects
- Features showcase section
- Footer với links đầy đủ

**`/trending` - Video thịnh hành**
- Grid 12 video thịnh hành
- Sorting options (views, likes, comments)
- Real-time trending algorithm
- Category filters

**`/search` - Tìm kiếm**
- Search bar với filters
- Filter by: type, date, duration, quality
- Sort options
- Grid/List view toggle
- Results với pagination

### 🎬 Video & Xem

**`/video/[id]` - Xem video**
- Video player với controls đầy đủ
- Video info (title, views, date)
- Creator info với subscribe button
- Actions: Like, Dislike, Share, Save, Gift, Report
- Comments section với replies
- Related videos sidebar
- Chapters timeline (nếu có)

**`/watch-later` - Xem sau**
- Danh sách video đã lưu
- Quick remove button
- Auto-sync với backend
- Sort by date added

**`/history` - Lịch sử xem**
- Timeline lịch sử xem
- Clear history button
- Filter by date range
- Privacy controls

### 📺 Studio Creator

**`/studio` - Dashboard creator**
- Overview stats (views, subscribers, revenue)
- Quick actions grid
- Recent videos list
- Performance charts
- Upload button prominent

**`/studio/upload` - Upload video**
- Drag & drop upload
- File validation (MP4, MOV, AVI, WebM, max 10GB)
- Upload progress bar
- Video details form (title, description, category, tags)
- Thumbnail upload
- Visibility settings (Public, Unlisted, Private)
- Advanced options (monetization, age restriction)
- Publish button

**`/studio/videos` - Quản lý video**
- Table view của tất cả video
- Filters (published, draft, private)
- Bulk actions
- Quick edit buttons
- Analytics preview

**`/studio/analytics` - Phân tích**
- Detailed analytics charts
- Audience demographics
- Traffic sources
- Engagement metrics
- Revenue tracking

**`/studio/monetization` - Thu nhập**
- Revenue overview
- Payment history
- Payout settings
- Monetization rules
- Tax information

**`/studio/community` - Cộng đồng**
- Comments management
- Community posts
- Engagement stats
- Moderation tools

### 👤 Profile & Settings

**`/profile/[id]` - Trang profile**
- User avatar và cover
- Stats (subscribers, videos, views)
- Videos grid
- About section
- Social links
- Subscribe/Follow button

**`/settings` - Cài đặt**
- Tabbed interface:
  - Profile (avatar, name, bio)
  - Account (email, password, 2FA)
  - Privacy (who can see, who can comment)
  - Notifications (email, push, in-app)
  - Preferences (language, theme, autoplay)

**`/notifications` - Thông báo**
- Real-time notifications list
- Filter by type (likes, comments, subscribers, system)
- Mark as read
- Notification settings link

**`/wallet` - Ví Stars**
- Stars balance hiển thị lớn
- Star bundles để mua
- Transaction history
- Earnings (cho creator)
- Withdrawal options

### 📝 Playlists & Collections

**`/playlists` - Playlists của tôi**
- Grid của tất cả playlists
- Create new playlist button
- Playlist cards với video count
- Quick actions

**`/playlist/[id]` - Chi tiết playlist**
- Playlist info
- Video list với drag to reorder
- Play all button
- Auto-play toggle
- Share playlist

### 🌐 Social & Community

**`/channel/[slug]` - Kênh creator**
- Channel banner
- Creator avatar và info
- Subscribe button prominent
- Tabs: Videos, About, Community
- Videos grid
- Subscriber count

**`/subscriptions` - Kênh đã đăng ký**
- Grid của channels đã subscribe
- Notification bell toggle mỗi channel
- Latest videos feed
- Manage subscriptions

**`/community` - Bài viết cộng đồng**
- Feed của community posts
- Create post button
- Like, comment, share actions
- Poll voting
- Image/video embeds

**`/leaderboard` - Bảng xếp hạng**
- Top users by points
- Rank badges (Gold, Silver, Bronze)
- Level system
- Achievement badges
- Your rank highlight

---

## UI-AUTH - Xác thực

### `/auth/login` - Đăng nhập
- Email/Password form
- Social login buttons (Google, Facebook, Twitter, GitHub)
- Remember me checkbox
- Forgot password link
- Beautiful gradient background
- Glass morphism design

### `/auth/register` - Đăng ký
- Registration form với validation
- Password strength indicator
- Terms acceptance
- Social signup options
- Email verification required
- Auto-redirect sau register

### `/auth/forgot-password` - Quên mật khẩu
- Email input
- Rate limiting protection
- Success state với instructions
- Resend link option
- Back to login link

### `/auth/reset-password` - Đặt lại mật khẩu
- Token validation
- New password với confirmation
- Password requirements list
- Success redirect to login
- Token expiry handling

---

## UI-ADMIN - Dashboard quản trị

### `/` - Dashboard tổng quan
- Key metrics cards
- Revenue chart
- Active users chart
- Recent activity feed
- Quick actions
- System health status

### `/users` - Quản lý users
- Users table với search
- Filters (role, status, date)
- Actions: View, Edit, Ban, Delete
- User details modal
- Bulk actions
- Export CSV

### `/videos` - Quản lý videos
- Videos table
- Moderation queue
- Status filters
- Quick approve/reject
- Video preview
- Content flags

### `/payments` - Thanh toán
- Revenue overview
- Payment transactions table
- Charts by period
- Payment methods stats
- Refund management
- Export reports

### `/reports` - Báo cáo vi phạm
- Reports queue by severity
- Filter by type (spam, harassment, copyright)
- Reviewer assignment
- Action buttons (dismiss, warn, ban)
- Evidence viewer
- Resolution history

---

## UI-WALLETSCAN - Blockchain Scanner

### `/` - Tìm kiếm
- Search bar prominent
- Blockchain selector
- Quick links (Popular wallets, Recent TXs)
- Network stats
- Featured NFTs

### `/wallet/[address]` - Chi tiết ví
- Wallet address với copy button
- Balance breakdown
- Tokens list với prices
- NFTs gallery
- Transaction history
- QR code

### `/transaction/[hash]` - Chi tiết giao dịch
- TX hash và status
- Block info
- From/To addresses
- Value và fees
- Gas usage
- Input data
- Event logs

### `/nft/[id]` - Chi tiết NFT
- NFT image/video viewer
- Metadata display
- Attributes list
- Collection info
- Owner history
- Price history chart
- Marketplace links

### `/contract/[address]` - Chi tiết contract
- Contract address
- Contract type (ERC20, ERC721, etc)
- Source code viewer (nếu verified)
- ABI viewer
- Read/Write functions
- Events
- Transaction list

---

## Thiết kế chung

### 🎨 Design System

**Colors:**
- Primary gradient: Purple to Pink
- Secondary: Blue shades
- Success: Green
- Warning: Yellow/Orange
- Error: Red
- Neutral: Gray scale

**Typography:**
- Headings: Bold, large
- Body: Regular, readable
- Monospace: Code blocks

**Components:**
- Glass morphism cards
- Gradient buttons
- Hover effects
- Smooth transitions
- Loading states
- Error states
- Empty states

### 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### 🎯 Icons

- Lucide React icons throughout
- Consistent sizing
- Color matching context
- Animated on hover

### ⚡ Performance

- Code splitting
- Lazy loading
- Image optimization
- API caching
- Optimistic updates

---

## Hướng dẫn phát triển

### Cài đặt dependencies

```bash
cd ui-app  # hoặc ui-auth, ui-admin, ui-walletscan
npm install
```

### Chạy development server

```bash
npm run dev
```

### Build production

```bash
npm run build
npm start
```

### Environment variables

Tạo file `.env.local` trong mỗi thư mục ui:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3000
```

---

## Best Practices

### 1. Component Structure
- Sử dụng "use client" khi cần client-side state
- Server Components mặc định cho performance
- Tách components nhỏ, reusable

### 2. API Calls
- Sử dụng API client trong `/lib/api.ts`
- Error handling đầy đủ
- Loading states
- Retry logic

### 3. State Management
- useState cho local state
- Context API cho global state
- URL params cho filters

### 4. Styling
- Tailwind CSS classes
- Consistent spacing
- Responsive utilities
- Dark mode support

### 5. Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader friendly

---

## Roadmap

### Q1 2026
- [ ] Real-time notifications với WebSocket
- [ ] Advanced search với filters
- [ ] Playlist management nâng cao
- [ ] Live streaming support

### Q2 2026
- [ ] Mobile apps (React Native)
- [ ] PWA support
- [ ] Offline mode
- [ ] Background video playback

### Q3 2026
- [ ] AI recommendations
- [ ] Content moderation AI
- [ ] Auto-captions
- [ ] Video editing tools

### Q4 2026
- [ ] Blockchain integration đầy đủ
- [ ] NFT marketplace
- [ ] Crypto payments
- [ ] Decentralized storage

---

Để biết thêm chi tiết về API endpoints, xem file `API-Documentation.txt`.
