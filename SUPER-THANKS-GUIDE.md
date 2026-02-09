# SUPER THANKS FEATURE - HƯỚNG DẪN SỬ DỤNG

## Tổng Quan

Super Thanks là tính năng cho phép người xem tặng sao (stars) cho những bình luận hay, hữu ích hoặc ấn tượng. Đây là cách tuyệt vời để thể hiện sự cảm kích và hỗ trợ các thành viên cộng đồng.

## Tính Năng Chính

### 1. **Gửi Super Thanks**
- Nhấn nút "Super Thanks" bên dưới bất kỳ bình luận nào
- Chọn số lượng sao muốn tặng (1-200 sao)
- Tùy chọn gửi ẩn danh
- Xem trước tier (Bronze, Silver, Gold, Platinum, Diamond)

### 2. **Hệ Thống Tier (Cấp Bậc)** - ⚡ **CẬP NHẬT MỚI: GẤP ĐÔI**

#### 🔶 Bronze (1-10 sao) 
- Gradient: Amber 700 → Amber 600
- Viền: Màu amber
- Hiệu ứng: Shimmer nhẹ, 1 sparkle

#### ⚪ Silver (11-20 sao)
- Gradient: Gray 400 → Gray 300
- Viền: Màu xám bạc
- Hiệu ứng: Shimmer trung bình, 1-2 sparkles

#### 🟡 Gold (21-50 sao)
- Gradient: Yellow 500 → Amber 500
- Viền: Màu vàng
- Hiệu ứng: Shimmer mạnh, 2-3 sparkles

#### ⬜ Platinum (51-100 sao)
- Gradient: Slate 300 → Slate 200
- Viền: Màu bạch kim
- Hiệu ứng: Shimmer rất mạnh, 3-4 sparkles

#### 💎 Diamond (101+ sao)
- Gradient: Purple 500 → Pink 500
- Viền: Màu tím-hồng rực rỡ
- Hiệu ứng: Shimmer cực mạnh, 5 sparkles
- **Bonus**: TOP SUPPORTER badge nếu tặng tổng cộng 100+ sao

### 3. **Hiệu Ứng Đặc Biệt**

#### 🌟 Shimmer Effect (Ánh Sáng Chạy)
- Ánh sáng trắng chạy qua bình luận từ trái sang phải
- Lặp lại liên tục với chu kỳ 3 giây
- Tạo cảm giác lung linh, nổi bật

#### ✨ Sparkle Effects (Ngôi Sao Nhảy Múa)
- Số lượng ngôi sao: 1-5 (tùy theo số sao tặng)
- Animation: Xuất hiện → bay lên → biến mất
- Màu vàng rực rỡ
- Vị trí ngẫu nhiên bên phải bình luận

#### 💫 Glow Effect (Viền Phát Sáng)
- Viền bình luận phát sáng theo màu tier
- Hiệu ứng shadow với độ mờ động
- Tăng cường khi hover chuột

#### 🔄 Spinning Star (Ngôi Sao Xoay)
- Icon ngôi sao vàng trên avatar
- Xoay chậm 360 độ trong 4 giây
- Luôn luôn chuyển động

#### 💗 Pulse Animation (Nhấp Nháy)
- Badge "Super Thanks X stars" nhấp nháy nhẹ
- Opacity thay đổi từ 1.0 → 0.7 → 1.0
- Chu kỳ 2 giây

#### 📈 Hover Effects (Hiệu Ứng Hover)
- Scale tăng lên 102% khi hover
- Shadow tăng cường
- Transition mượt mà 300ms
- Tạo cảm giác tương tác

### 4. **Badge Hệ Thống**

#### ⭐ Super Thanks Badge
- Hiển thị: "Super Thanks X stars"
- Màu nền: Gradient theo tier
- Icon: Ngôi sao vàng fill
- Font: Bold, màu trắng
- Animation: Pulse

#### 👑 TOP SUPPORTER Badge
- Điều kiện: Tặng >50 sao và là người tặng nhiều nhất
- Gradient: Purple 600 → Pink 600
- Icon: Vương miện
- Animation: Animate-pulse (Tailwind)
- Font: Bold, màu trắng

### 5. **Sắp Xếp Bình Luận**

Thứ tự ưu tiên:
1. Bình luận được ghim (pinned)
2. Bình luận được thả tim (hearted) bởi creator
3. **Super Thanks comments (theo số sao giảm dần)**
4. Bình luận thông thường (theo thời gian)

### 6. **Tùy Chọn Ẩn Danh**

- Checkbox "Send anonymously" trong modal
- Nếu chọn: Hiển thị "Anonymous Supporter" thay vì tên
- Avatar vẫn hiển thị nhưng generic
- Người nhận vẫn nhận được sao

### 7. **Gamification (Hệ Thống XP)**

#### Người Gửi Super Thanks:
- XP nhận được: `stars * 2` (tối thiểu 10 sao)
- Badge: "Generous Supporter" ⭐
- Daily Goal: Gửi 1 Super Thanks/ngày

#### Người Nhận Super Thanks:
- XP nhận được: `stars` (tối thiểu 10 sao)
- Badge: "Super Creator" 🌟
- Daily Goal: Nhận 3 Super Thanks/ngày

### 8. **Giới Hạn & Quy Tắc**

- Số sao tối thiểu: 1 sao
- Số sao tối đa: 100 sao
- Không thể tặng Super Thanks cho chính mình
- Cần đủ số dư Stars trong tài khoản
- Video không bị xóa
- Comment không bị ẩn hoặc xóa

## API Endpoint

```
POST /api/comments/[id]/super-thanks
```

**Request Body:**
```json
{
  "stars": 25,
  "anonymous": false
}
```

**Response:**
```json
{
  "success": true,
  "comment": {
    "id": "comment-123",
    "isSuperThanks": true,
    "superThanksStars": 25,
    "superThanksQty": 1
  },
  "transactionId": "tx-456"
}
```

## UI Components

### Modal Super Thanks
- Width: max-w-md (responsive)
- Background: White (dark mode: gray-800)
- Border radius: 2xl (rounded-2xl)
- Shadow: 2xl
- Animation: Scale-in (0.2s ease-out)

### Star Selector
- Type: Range slider (1-100)
- Style: Gradient fill (yellow-orange)
- Quick buttons: 5, 10, 25, 50, 100
- Real-time tier preview

### Tier Preview Box
- Border: 2px solid (tier color)
- Background: Gradient with opacity
- Display: Tier name + star count

## CSS Classes Chính

```css
.super-thanks-comment     // Container cho Super Thanks comment
.shimmer-effect           // Hiệu ứng ánh sáng chạy
.sparkle-effect          // Hiệu ứng ngôi sao nhảy múa
.spinning-star           // Ngôi sao xoay
.pulse-animation         // Animation nhấp nháy
.animate-scale-in        // Scale in modal
```

## Best Practices

### Cho Người Dùng:
1. Tặng Super Thanks cho các bình luận thực sự hữu ích
2. Không spam Super Thanks
3. Sử dụng anonymous nếu muốn riêng tư
4. Chọn số sao phù hợp với giá trị bình luận

### Cho Nhà Sáng Tạo:
1. Trả lời các Super Thanks comments
2. Tạo nội dung chất lượng để khuyến khích Super Thanks
3. Cảm ơn TOP SUPPORTER
4. Tương tác với cộng đồng

### Cho Developers:
1. Kiểm tra số dư Stars trước khi gửi
2. Validate input (1-100 stars)
3. Handle errors gracefully
4. Optimize animations (use CSS transforms)
5. Implement proper rate limiting

## Troubleshooting

### Không Thể Gửi Super Thanks:
- Kiểm tra số dư Stars
- Đảm bảo không phải comment của chính mình
- Kiểm tra video vẫn còn tồn tại
- Đăng nhập lại nếu cần

### Hiệu Ứng Không Hiển Thị:
- Kiểm tra CSS animations được load
- Clear browser cache
- Kiểm tra dark mode settings
- Disable browser extensions có thể block animations

### API Errors:
- 401: Chưa đăng nhập
- 400: Số sao không hợp lệ hoặc không đủ số dư
- 404: Comment không tồn tại
- 500: Lỗi server (thử lại sau)

## Future Enhancements

### Đang Lên Kế Hoạch:
- [ ] Super Thanks cho video (không chỉ comments)
- [ ] Leaderboard TOP SUPPORTERS toàn platform
- [ ] Custom messages kèm Super Thanks
- [ ] Super Thanks streaks và combos
- [ ] Animated emoji reactions
- [ ] Voice/video thank you messages
- [ ] Super Thanks notifications push
- [ ] Monthly Super Thanks summary
- [ ] Creator analytics dashboard
- [ ] Super Thanks goal tracking

---

**Phiên bản tài liệu**: 1.0  
**Ngày cập nhật**: 2026-02-09  
**Tác giả**: New Public Platform Team
