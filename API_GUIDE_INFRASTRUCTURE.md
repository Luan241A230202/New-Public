# Hướng Dẫn Sử Dụng Infrastructure APIs

> **Phiên bản**: v4.16.27  
> **Ngày**: 2026-02-18  
> **Tổng số APIs**: 25 endpoints

## Tổng Quan

Hệ thống Infrastructure APIs cung cấp các công cụ để quản lý, giám sát và vận hành nền tảng VideoShare. Tất cả APIs đều có authentication và nhiều endpoint yêu cầu quyền admin.

### Response Format Chuẩn

Tất cả APIs trả về format nhất quán:

```json
{
  "success": true,
  "data": { /* dữ liệu cụ thể */ },
  "message": "Operation successful",
  "timestamp": "2026-02-18T00:00:00Z"
}
```

Error format:
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2026-02-18T00:00:00Z"
}
```

---

## P0 Critical APIs (10 endpoints)

### 1. Rate Limiting

#### GET /api/rate-limits/status
Kiểm tra trạng thái rate limit của user hiện tại.

**Auth**: Required (user)  
**Response**:
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "limits": {
      "general": {
        "current": 45,
        "resetAt": 1708214400000
      }
    },
    "timestamp": "2026-02-18T00:00:00Z"
  }
}
```

#### POST /api/rate-limits/reset
Reset rate limits (admin only).

**Auth**: Required (admin)  
**Body**:
```json
{
  "userId": "user_123",      // optional: reset cho user cụ thể
  "bucket": "api:upload"     // optional: reset bucket cụ thể
}
```

### 2. System Health & Monitoring

#### GET /api/system/health
Health check endpoint cho monitoring tools.

**Auth**: None required  
**Response**:
```json
{
  "success": true,
  "data": {
    "overall": "healthy",
    "checks": {
      "database": { "status": "healthy" },
      "redis": { "status": "healthy" },
      "api": { "status": "healthy", "uptime": 86400 }
    }
  }
}
```

**Status Codes**:
- `200` - System healthy
- `503` - System unhealthy

#### GET /api/system/metrics
Metrics chi tiết về hệ thống (admin only).

**Auth**: Required (admin)  
**Response**:
```json
{
  "success": true,
  "data": {
    "process": {
      "uptime": 86400,
      "memory": { "heapUsed": 123456789, "heapTotal": 234567890 }
    },
    "database": {
      "users": 1000,
      "videos": 5000,
      "views": 50000
    },
    "redis": {
      "connected": true,
      "dbSize": 12345
    }
  }
}
```

### 3. Backup & Restore

#### POST /api/backup/create
Tạo backup mới của platform.

**Auth**: Required (admin)  
**Body**:
```json
{
  "type": "MANUAL"  // FULL | INCREMENTAL | MANUAL
}
```

**Response**:
```json
{
  "success": true,
  "data": { "backupId": "backup_123" },
  "message": "Backup created successfully"
}
```

#### GET /api/backup/list
Liệt kê các backups có sẵn.

**Auth**: Required (admin)  
**Query Params**: `?page=1&limit=20`

**Response**:
```json
{
  "success": true,
  "data": {
    "backups": [
      {
        "id": "backup_123",
        "type": "MANUAL",
        "status": "COMPLETED",
        "size": 1234567890,
        "createdAt": "2026-02-18T00:00:00Z",
        "completedAt": "2026-02-18T00:05:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

#### POST /api/backup/restore
Restore từ backup (yêu cầu confirmation token).

**Auth**: Required (admin)  
**Body**:
```json
{
  "backupId": "backup_123",
  "confirmationToken": "secure-token-min-10-chars"
}
```

### 4. Audit Logs & Compliance

#### GET /api/audit/logs
Xem audit logs (admin only).

**Auth**: Required (admin)  
**Query Params**:
- `?page=1&limit=50`
- `&action=USER_LOGIN` - filter by action
- `&userId=user_123` - filter by user
- `&dateFrom=2026-02-01T00:00:00Z`
- `&dateTo=2026-02-18T23:59:59Z`

**Response**:
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log_123",
        "userId": "user_123",
        "action": "VIDEO_DELETE",
        "resource": "video:456",
        "details": { "videoId": "456" },
        "ipAddress": "192.168.1.1",
        "createdAt": "2026-02-18T00:00:00Z"
      }
    ],
    "pagination": { /* ... */ },
    "filters": { "action": "VIDEO_DELETE" }
  }
}
```

**Common Actions**:
- `USER_LOGIN`, `VIDEO_DELETE`, `ADMIN_CONFIG_UPDATE`
- `BACKUP_CREATE`, `BACKUP_RESTORE`
- `CACHE_CLEAR`, `RATE_LIMIT_RESET`
- `WEBHOOK_REGISTER`, `FEATURE_FLAG_TOGGLE`

#### POST /api/audit/export
Export audit logs (CSV hoặc JSON).

**Auth**: Required (admin)  
**Body**:
```json
{
  "format": "CSV",  // CSV | JSON
  "dateFrom": "2026-02-01T00:00:00Z",
  "dateTo": "2026-02-18T23:59:59Z",
  "action": "USER_LOGIN"  // optional filter
}
```

**Response**: File download (CSV hoặc JSON)

### 5. GDPR Compliance

#### POST /api/gdpr/export-data
Export toàn bộ dữ liệu của user (GDPR compliant).

**Auth**: Required (user)  
**Response**:
```json
{
  "success": true,
  "data": {
    "exportDate": "2026-02-18T00:00:00Z",
    "exportJobId": "export_123",
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "User Name",
      "videos": [ /* ... */ ],
      "comments": [ /* ... */ ],
      "likes": [ /* ... */ ]
    },
    "note": "This is your complete data package as per GDPR requirements."
  }
}
```

---

## P1 High Priority APIs (8 endpoints)

### 6. Cache Management

#### POST /api/cache/clear
Xóa Redis cache (admin only).

**Auth**: Required (admin)  
**Body**:
```json
{
  "keys": ["key1", "key2"],           // optional: xóa keys cụ thể
  "pattern": "videoshare:cache:*"     // optional: xóa theo pattern
}
```

Nếu không có params → xóa toàn bộ cache (cẩn thận!)

#### GET /api/cache/stats
Xem thống kê Redis cache.

**Auth**: Required (admin)  
**Response**:
```json
{
  "success": true,
  "data": {
    "stats": {
      "dbSize": 12345,
      "connected": true,
      "used_memory": "50MB"
    },
    "keysByPattern": {
      "videoshare:ratelimit:*": 100,
      "videoshare:session:*": 50,
      "videoshare:cache:*": 200
    }
  }
}
```

### 7. Batch Operations

#### POST /api/batch/videos/update
Cập nhật hàng loạt videos (max 100).

**Auth**: Required (admin)  
**Body**:
```json
{
  "videos": [
    {
      "id": "video_1",
      "data": {
        "title": "New Title",
        "status": "PUBLISHED",
        "isSensitive": false
      }
    },
    {
      "id": "video_2",
      "data": { "description": "New description" }
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "batchJobId": "batch_123",
    "processedItems": 2,
    "failedItems": 0,
    "results": [
      { "id": "video_1", "success": true },
      { "id": "video_2", "success": true }
    ]
  }
}
```

#### POST /api/batch/users/action
Thao tác hàng loạt users (admin only).

**Auth**: Required (admin)  
**Body**:
```json
{
  "userIds": ["user_1", "user_2", "user_3"],
  "action": "BAN",  // BAN | UNBAN | VERIFY | MUTE_7D | UNMUTE
  "reason": "Spam violation"
}
```

#### GET /api/batch/status
Kiểm tra trạng thái batch job.

**Auth**: Required (admin)  
**Query Params**: `?id=batch_123` (hoặc không có để list tất cả)

### 8. Import/Export

#### POST /api/import/videos
Import videos từ YouTube/Vimeo (max 10 per request).

**Auth**: Required (user)  
**Body**:
```json
{
  "sources": [
    {
      "url": "https://youtube.com/watch?v=abc123",
      "platform": "YOUTUBE",
      "metadata": {
        "title": "Custom title",
        "description": "Custom description"
      }
    }
  ]
}
```

#### POST /api/export/data
Export dữ liệu platform (admin only).

**Auth**: Required (admin)  
**Body**:
```json
{
  "type": "ANALYTICS",  // ANALYTICS | USERS | VIDEOS
  "format": "JSON",      // JSON | CSV
  "filters": {
    "dateFrom": "2026-02-01T00:00:00Z",
    "dateTo": "2026-02-18T23:59:59Z"
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "exportJobId": "export_123",
    "status": "PENDING"
  }
}
```

#### GET /api/export/status
Kiểm tra trạng thái export job.

**Auth**: Required (user/admin)  
**Query Params**: `?id=export_123`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "export_123",
    "type": "ANALYTICS",
    "status": "COMPLETED",
    "format": "JSON",
    "fileUrl": "/exports/export_123.json",
    "completedAt": "2026-02-18T00:05:00Z",
    "expiresAt": "2026-02-25T00:05:00Z"
  }
}
```

---

## P2 Medium Priority APIs (7 endpoints)

### 9. Webhooks

#### POST /api/webhooks/register
Đăng ký webhook endpoint.

**Auth**: Required (user)  
**Body**:
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["video.uploaded", "video.published", "payment.completed"],
  "secret": "your-webhook-secret-min-16-chars"
}
```

**Supported Events**:
- `video.uploaded`, `video.published`
- `user.verified`
- `payment.completed`
- `nft.minted`
- `comment.created`

#### GET /api/webhooks/list
Liệt kê webhooks đã đăng ký.

**Auth**: Required (user/admin)  
**Query Params**: `?page=1&limit=20`

#### POST /api/webhooks/test
Test webhook endpoint.

**Auth**: Required (user)  
**Body**:
```json
{
  "webhookId": "webhook_123",
  "payload": {  // optional custom payload
    "test": true
  }
}
```

### 10. Feature Flags

#### GET /api/features/list
Xem danh sách feature flags.

**Auth**: Required (user)  
- User thường: chỉ thấy flags enabled
- Admin: thấy tất cả flags

**Response**:
```json
{
  "success": true,
  "data": {
    "features": [
      {
        "id": "feat_1",
        "name": "new_player_ui",
        "enabled": true,
        "rolloutPercent": 100,
        "description": "New video player UI"
      }
    ]
  }
}
```

#### POST /api/features/toggle
Bật/tắt feature flag (admin only).

**Auth**: Required (admin)  
**Body**:
```json
{
  "name": "new_player_ui",
  "enabled": true,
  "rolloutPercent": 50  // 0-100
}
```

### 11. Session Management

#### GET /api/sessions/list
Xem các sessions đang hoạt động của user.

**Auth**: Required (user)  
**Response**:
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session_1",
        "deviceInfo": "Chrome on Windows",
        "ipAddress": "192.168.1.1",
        "lastActiveAt": "2026-02-18T00:00:00Z",
        "expiresAt": "2026-02-25T00:00:00Z",
        "createdAt": "2026-02-11T00:00:00Z"
      }
    ]
  }
}
```

#### DELETE /api/sessions/[id]
Kết thúc session cụ thể (remote logout).

**Auth**: Required (user)  
**Response**:
```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

---

## Error Codes

| Code | Ý nghĩa |
|------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid payload |
| 401 | Unauthorized - Not authenticated |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## Security Best Practices

1. **Authentication**: Tất cả APIs yêu cầu JWT token (trừ `/api/system/health`)
2. **Authorization**: Admin APIs kiểm tra role nghiêm ngặt
3. **Rate Limiting**: Áp dụng cho tất cả endpoints
4. **Audit Logging**: Tất cả thao tác quan trọng được ghi log
5. **Validation**: Zod schema validation cho mọi request body
6. **HTTPS**: Luôn sử dụng HTTPS trong production

---

## Examples

### Check System Health (cURL)
```bash
curl https://your-domain.com/api/system/health
```

### Export User Data (JavaScript)
```javascript
const response = await fetch('/api/gdpr/export-data', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.data.exportJobId);
```

### Batch Update Videos (TypeScript)
```typescript
const response = await fetch('/api/batch/videos/update', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ADMIN_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    videos: [
      { id: 'video_1', data: { title: 'New Title' } },
      { id: 'video_2', data: { status: 'PUBLISHED' } }
    ]
  })
});

const result = await response.json();
console.log(`Processed: ${result.data.processedItems}, Failed: ${result.data.failedItems}`);
```

---

## Troubleshooting

### 401 Unauthorized
- Kiểm tra JWT token có hợp lệ không
- Token có hết hạn không
- Header Authorization có đúng format: `Bearer <token>`

### 403 Forbidden
- API yêu cầu admin role nhưng user không phải admin
- Kiểm tra `session.user.role === 'ADMIN'`

### 429 Rate Limit Exceeded
- Đợi cho đến khi `resetAt` timestamp
- Admin có thể reset với `/api/rate-limits/reset`

### 503 Service Unavailable
- Database hoặc Redis không kết nối được
- Kiểm tra `/api/system/health` để diagnose

---

**Cập nhật cuối**: 2026-02-18  
**Version**: v4.16.27  
**Liên hệ**: Xem `README.md` và `CHANGELOG.md` cho thông tin thêm
