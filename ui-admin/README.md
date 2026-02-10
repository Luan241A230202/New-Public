# UI Admin - Admin Dashboard

Dashboard quản trị hệ thống cho New Public Platform.

## Công nghệ

- **Next.js 14+** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **Recharts** - Data visualization

## Cài đặt

```bash
npm install
```

## Chạy development

```bash
npm run dev
```

Mở [http://localhost:3001](http://localhost:3001) trong trình duyệt.

## Tính năng

### Dashboard
- Thống kê tổng quan hệ thống
- Biểu đồ người dùng, video, doanh thu
- Hoạt động gần đây

### Quản lý Users
- Danh sách users
- Tìm kiếm và lọc
- Ban/unban users
- Điều chỉnh Stars balance
- Xem lịch sử giao dịch

### Quản lý Videos
- Danh sách tất cả videos
- Kiểm duyệt video
- Publish/hide/delete
- Cập nhật metadata
- Requeue processing

### Quản lý Thanh toán
- Dashboard thanh toán
- Danh sách deposits
- Fraud alerts
- Coupons
- Bundles
- Reconciliation
- Export reports

### Quản lý Nội dung
- Báo cáo vi phạm
- Comments moderation
- AI moderation queue
- Ban words/patterns

### Cấu hình hệ thống
- Site config
- Payment config
- Storage config
- API keys
- Theme presets
- HLS config
- Subtitles

### Quản lý Boost
- Boost plans
- Boost orders
- Statistics

### Quản lý Gifts & Stars
- Gift items
- Star transactions
- Adjust balances

### Quản lý NFT
- NFT contracts
- Listings
- Auctions

## Phân quyền

Chỉ users có role **ADMIN** mới được truy cập dashboard này.

## Cấu trúc thư mục

```
ui-admin/
├── app/
│   ├── layout.tsx        # Admin layout
│   ├── page.tsx          # Dashboard tổng quan
│   ├── users/            # User management
│   ├── videos/           # Video management
│   ├── payments/         # Payment management
│   ├── reports/          # Reports & moderation
│   ├── config/           # System config
│   └── ...
├── components/
│   ├── ui/               # UI components
│   ├── charts/           # Chart components
│   └── ...
└── lib/
    ├── api.ts            # Admin API client
    └── ...
```

## API Backend

Admin dashboard sử dụng các endpoints trong `/api/admin/*`. Tất cả đều yêu cầu quyền admin.

## Security

- NextAuth session check
- Admin role verification
- CSRF protection
- Rate limiting

## Deploy

```bash
npm run build
npm start
```
