# UI Auth - Authentication Frontend

Modern authentication interface for New Public Platform with beautiful UI and complete functionality.

## Tính năng

### Đăng nhập & Đăng ký
- ✨ Modern login form với social login
- 📝 Registration với email verification
- 🔑 Remember me functionality
- 🎨 Beautiful gradient design

### Quản lý mật khẩu
- 🔐 Forgot password flow
- ✉️ Email reset password
- 🔄 Change password
- 💪 Password strength indicator

### Bảo mật nâng cao
- 🔒 Two-factor authentication (2FA)
- 📱 TOTP/SMS authentication
- 🔑 Backup codes
- ✅ Email verification

### Giao diện
- 🎨 Modern gradient design
- 🌙 Dark/Light mode support
- 📱 Fully responsive
- ⚡ Fast and smooth animations
- 🎯 Clear error messages
- 🔍 Input validation
- 💡 Helpful tooltips

## Công nghệ

- **Next.js 15.2.9** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with gradients
- **Lucide React** - Modern icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Cài đặt

```bash
cd ui-auth
npm install
```

## Chạy development

```bash
npm run dev
```

Mở [http://localhost:3003](http://localhost:3003) trong trình duyệt.

## Cấu trúc pages

```
ui-auth/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page / redirect
│   └── auth/
│       ├── login/              # Đăng nhập
│       ├── register/           # Đăng ký
│       ├── forgot-password/    # Quên mật khẩu
│       ├── reset-password/     # Reset mật khẩu
│       ├── verify-email/       # Xác thực email
│       ├── 2fa-setup/          # Thiết lập 2FA
│       └── 2fa-verify/         # Xác thực 2FA
├── components/
│   ├── ui/                     # UI components
│   └── auth/                   # Auth-specific components
└── lib/
    ├── api.ts                  # Auth API client
    └── validation.ts           # Form schemas
```

## API Endpoints

Authentication sử dụng các endpoints:
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/[...nextauth]` - Đăng nhập (NextAuth)
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/reset-password` - Reset mật khẩu
- `POST /api/auth/verify-email` - Xác thực email
- `POST /api/me/2fa/enable` - Bật 2FA
- `POST /api/me/2fa/verify` - Xác thực 2FA

## Security Features

- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Secure password hashing
- ✅ Email verification
- ✅ 2FA support
- ✅ Session management
- ✅ Brute force protection

## Design System

### Colors
- Primary: Blue gradient (#3B82F6 → #8B5CF6)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Warning: Orange (#F59E0B)

### Typography
- Font: Inter (system font fallback)
- Headings: Bold, gradient text
- Body: Regular, high contrast

### Components
- Rounded corners (0.75rem)
- Subtle shadows
- Smooth transitions
- Focus states with rings
- Loading states

## Deploy

```bash
npm run build
npm start
```
