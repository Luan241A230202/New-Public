# Quick Start: Infrastructure APIs (v4.16.27)

> **Cho developer mới**: Đây là tài liệu nhanh về 25 APIs infrastructure vừa được thêm vào platform.

## 🎯 Tóm tắt

**Ngày**: 2026-02-18  
**Version**: v4.16.27  
**Số APIs mới**: 25 endpoints  
**Database models mới**: 7 models  

## 📚 Tài liệu quan trọng

1. **API_GUIDE_INFRASTRUCTURE.md** - Hướng dẫn chi tiết sử dụng 25 APIs
2. **MISSING-APIS-IMPLEMENTATION.md** - Đặc tả kỹ thuật và status
3. **API-COMPLETENESS-AUDIT.md** - Audit report và coverage
4. **CHANGELOG.md** - Lịch sử thay đổi v4.16.27

## 🚀 APIs theo mức ưu tiên

### P0 Critical (10 APIs) - Production Essential

**Rate Limiting**
```
GET  /api/rate-limits/status       - Xem rate limit của user
POST /api/rate-limits/reset        - Reset rate limits (admin)
```

**System Health**
```
GET  /api/system/health            - Health check (public)
GET  /api/system/metrics           - System metrics (admin)
```

**Backup & Restore**
```
POST /api/backup/create            - Tạo backup (admin)
GET  /api/backup/list              - List backups (admin)
POST /api/backup/restore           - Restore backup (admin)
```

**Audit & Compliance**
```
GET  /api/audit/logs               - Xem audit logs (admin)
POST /api/audit/export             - Export logs (admin)
POST /api/gdpr/export-data         - GDPR data export (user)
```

### P1 High Priority (8 APIs) - Operational Efficiency

**Cache Management**
```
POST /api/cache/clear              - Clear Redis cache (admin)
GET  /api/cache/stats              - Cache statistics (admin)
```

**Batch Operations**
```
POST /api/batch/videos/update      - Bulk video updates (admin)
POST /api/batch/users/action       - Bulk user actions (admin)
GET  /api/batch/status             - Job status (admin)
```

**Import/Export**
```
POST /api/import/videos            - Import from YouTube/Vimeo
POST /api/export/data              - Export data (admin)
GET  /api/export/status            - Check export status
```

### P2 Medium Priority (7 APIs) - Advanced Features

**Webhooks**
```
POST /api/webhooks/register        - Register webhook
GET  /api/webhooks/list            - List webhooks
POST /api/webhooks/test            - Test webhook
```

**Feature Flags**
```
GET  /api/features/list            - List feature flags
POST /api/features/toggle          - Toggle flag (admin)
```

**Session Management**
```
GET  /api/sessions/list            - List active sessions
DELETE /api/sessions/[id]          - End session (remote logout)
```

## 💾 Database Models mới

```prisma
// Audit trail
model AuditLog {
  id, userId, action, resource, details, ipAddress, userAgent, createdAt
}

// Backup tracking
model Backup {
  id, type, status, size, location, metadata, createdBy, createdAt, completedAt
}

// Batch job tracking
model BatchJob {
  id, type, status, totalItems, processedItems, failedItems, params, result
}

// Feature toggles
model FeatureFlag {
  id, name, description, enabled, rolloutPercent, metadata
}

// Multi-device sessions
model UserSession {
  id, userId, token, deviceInfo, ipAddress, userAgent, lastActiveAt, expiresAt
}

// Export jobs
model ExportJob {
  id, type, status, format, fileUrl, fileSize, params, expiresAt
}

// Webhook registrations
model Webhook {
  id, url, events, secret, enabled, createdBy, lastTriggeredAt
}
```

## 🔧 Setup nhanh

### 1. Generate Prisma Client
```bash
npm run prisma:generate
```

### 2. Push Schema to Database
```bash
npm run prisma:push
# hoặc
npm run prisma:migrate
```

### 3. Test Health Endpoint
```bash
curl http://localhost:3000/api/system/health
```

## 📖 Ví dụ sử dụng

### Check System Health
```javascript
const health = await fetch('/api/system/health');
const data = await health.json();
console.log(data.data.overall); // "healthy"
```

### Export User Data (GDPR)
```javascript
const response = await fetch('/api/gdpr/export-data', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  }
});
const userData = await response.json();
```

### Batch Update Videos (Admin)
```javascript
const response = await fetch('/api/batch/videos/update', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ADMIN_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    videos: [
      { id: 'video_1', data: { title: 'New Title' } },
      { id: 'video_2', data: { status: 'PUBLISHED' } }
    ]
  })
});
```

## 🔐 Security

- **Authentication**: Tất cả APIs yêu cầu JWT (trừ /system/health)
- **Authorization**: Admin APIs kiểm tra role ADMIN
- **Validation**: Zod schema validation cho tất cả request bodies
- **Audit**: Mọi thao tác quan trọng được log vào AuditLog
- **Rate Limiting**: Áp dụng cho tất cả endpoints

## ⚠️ Lưu ý quan trọng

1. **Admin APIs**: Luôn kiểm tra role trước khi gọi
2. **Batch Operations**: Giới hạn 100 items per request
3. **Export Jobs**: Files hết hạn sau 7-30 ngày
4. **Webhooks**: Cần secret key cho security
5. **Feature Flags**: Rollout percentage 0-100%

## 🆘 Troubleshooting

**401 Unauthorized**
- Check JWT token validity
- Ensure Authorization header: `Bearer <token>`

**403 Forbidden**
- API requires admin role
- Check `session.user.role === 'ADMIN'`

**503 Service Unavailable**
- Check `/api/system/health` for details
- Verify database and Redis connections

## 📞 Support

- **Full Guide**: `API_GUIDE_INFRASTRUCTURE.md`
- **Implementation Details**: `MISSING-APIS-IMPLEMENTATION.md`
- **API Coverage**: `API-COMPLETENESS-AUDIT.md`
- **Changelog**: `CHANGELOG.md` (v4.16.27)

---

**Last Updated**: 2026-02-18  
**Version**: v4.16.27  
**Total Platform APIs**: 295+ endpoints ✅
