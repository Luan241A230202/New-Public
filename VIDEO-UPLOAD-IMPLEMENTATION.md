# Video Upload Implementation Guide

## Overview

Complete implementation guide for professional video upload system at `/upload` with YouTube-style features including drag & drop, multi-file upload, progress tracking, and comprehensive metadata editing.

## Features

### 1. Drag & Drop Multi-File Upload
- Drag zone with visual feedback
- Click to browse alternative
- Multiple file selection (Ctrl/Cmd + Click)
- File validation (format, size, resolution)
- Preview thumbnails before upload

### 2. Video List Sidebar (YouTube-style)
- Scrollable video list
- Individual video cards showing:
  - Thumbnail preview
  - File name (editable)
  - File size and duration
  - Upload progress bar
  - Status badge (pending/uploading/processing/complete/error)
  - Action buttons (edit, remove, cancel)
- Active video highlighting
- Card animations

### 3. Detail Editor
**Basic Information**:
- Title (100 char limit with counter)
- Description (5000 char, rich text editor)
- Category dropdown
- Visibility selector:
  - 🌍 Công khai (Public)
  - 🔗 Không công khai (Unlisted)
  - 🔒 Riêng tư (Private)
- Tags input (chip-based, max 15 tags)

**Thumbnail Management**:
- Auto-generated thumbnails (3 options from video)
- Custom thumbnail upload (drag & drop)
- Crop/resize tool
- Preview display
- Recommended: 1280x720

**Advanced Settings**:
- Allow comments (toggle)
- Age restriction (18+ toggle)
- Category selection
- Language selection
- License (Standard/Creative Commons)
- Recording date
- Location (GPS or manual)

### 4. Progress Tracking

**Individual Progress**:
- Per-video progress bar (0-100%)
- Upload speed indicator (MB/s)
- Time remaining estimate
- Current phase:
  - 📤 Uploading (0-80%)
  - ⚙️ Processing (80-95%)
  - ✅ Complete (100%)
- Pause/Resume buttons
- Cancel button with confirmation

**Overall Progress**:
- Total upload percentage
- Videos completed count (e.g., 3/5)
- Total size uploaded
- Overall time remaining
- Success/error summary

### 5. Upload All Button
- Large prominent button
- Validates all videos before upload
- Batch upload initiation
- Shows completion state
- Success notification

## Technical Implementation

### Component Structure

```typescript
// ui-app/app/upload/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { Upload, File, Check, AlertCircle } from 'lucide-react';

interface VideoFile {
  id: string;
  file: File;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string;
  visibility: 'public' | 'unlisted' | 'private';
  tags: string[];
  settings: {
    allowComments: boolean;
    ageRestriction: boolean;
    language: string;
    license: string;
  };
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'complete' | 'error';
  uploadSpeed?: number;
  timeRemaining?: number;
  error?: string;
}

export default function UploadPage() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  // Handle file drop/selection
  const handleFilesAdded = useCallback((files: FileList) => {
    // Validation and processing
  }, []);

  // Handle upload initiation
  const handleUploadAll = async () => {
    // Upload logic
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <VideoSidebar 
        videos={videos}
        selectedId={selectedVideoId}
        onSelect={setSelectedVideoId}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {videos.length === 0 ? (
          <DropZone onFilesAdded={handleFilesAdded} />
        ) : (
          <>
            <VideoEditor 
              video={videos.find(v => v.id === selectedVideoId)}
              onUpdate={updateVideo}
            />
            <UploadAllButton 
              videos={videos}
              onUpload={handleUploadAll}
            />
          </>
        )}
      </div>
    </div>
  );
}
```

### API Integration

**Upload Flow**:
1. **POST /api/upload/init** - Initialize upload session
2. **POST /api/upload/sign-part** - Get presigned URL for chunk
3. **POST /api/upload/complete** - Complete upload, trigger processing

**Chunk Upload** (for large files):
- 5MB chunks
- Parallel upload (3 concurrent)
- Resumable on network failure
- Progress aggregation

### State Management

```typescript
// Upload state
const [uploadState, setUploadState] = useState({
  isUploading: false,
  uploadedCount: 0,
  totalCount: 0,
  overallProgress: 0
});

// Video state per file
interface VideoState {
  file: File;
  metadata: VideoMetadata;
  uploadProgress: number;
  status: UploadStatus;
  error?: string;
}
```

### File Validation

```typescript
const validateFile = (file: File): ValidationResult => {
  // Format check
  const allowedFormats = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'];
  if (!allowedFormats.includes(file.type)) {
    return { valid: false, error: 'Định dạng không hỗ trợ' };
  }

  // Size check (max 2GB)
  if (file.size > 2 * 1024 * 1024 * 1024) {
    return { valid: false, error: 'Tệp quá lớn (tối đa 2GB)' };
  }

  return { valid: true };
};
```

### Vietnamese Language Labels

```typescript
const labels = {
  // Upload Zone
  dragDropText: 'Kéo và thả video vào đây',
  orClickText: 'hoặc nhấp để chọn tệp',
  supportedFormats: 'Hỗ trợ: MP4, AVI, MOV, MKV',
  maxSize: 'Tối đa 2GB mỗi tệp',

  // Editor
  title: 'Tiêu đề',
  description: 'Mô tả',
  thumbnail: 'Hình thu nhỏ',
  category: 'Danh mục',
  visibility: 'Khả năng hiển thị',
  tags: 'Thẻ tag',
  
  // Visibility options
  public: 'Công khai',
  unlisted: 'Không công khai',
  private: 'Riêng tư',

  // Settings
  advancedSettings: 'Cài đặt nâng cao',
  allowComments: 'Cho phép bình luận',
  ageRestriction: 'Giới hạn độ tuổi',
  
  // Actions
  uploadAll: 'Tải lên tất cả',
  pause: 'Tạm dừng',
  resume: 'Tiếp tục',
  cancel: 'Hủy',
  remove: 'Xóa',
  save: 'Lưu',

  // Status
  pending: 'Đang chờ',
  uploading: 'Đang tải lên',
  processing: 'Đang xử lý',
  complete: 'Hoàn thành',
  error: 'Lỗi'
};
```

## Responsive Design

### Desktop (1024px+)
- Two-column layout: Sidebar (300px) + Editor (fill)
- All features visible
- Drag & drop full-screen overlay

### Tablet (768-1023px)
- Collapsible sidebar
- Single column editor
- Touch-friendly buttons

### Mobile (< 768px)
- Bottom sheet sidebar
- Stack layout
- Simplified editor with tabs
- Mobile file picker
- Touch-optimized controls

## Dark Mode Support

All components styled for both light and dark themes with proper contrast ratios.

## Error Handling

### Upload Errors
- Network failure → Retry with exponential backoff
- File too large → Clear error message with limits
- Invalid format → Format validation before upload
- Server error → Detailed error message, support contact

### User Experience
- Loading states with spinners
- Success notifications with confetti
- Error messages with retry options
- Progress persistence (resume after page refresh)

## Performance Optimization

### Features
- Lazy loading components
- Virtual scrolling for video list
- Thumbnail lazy loading
- Chunk upload for large files
- Progress debouncing (update UI every 100ms)
- Memory cleanup after upload

## Testing Checklist

- [ ] Drag & drop functionality
- [ ] Multi-file selection
- [ ] File validation (format, size)
- [ ] Upload progress accuracy
- [ ] Thumbnail generation
- [ ] Form validation
- [ ] API integration
- [ ] Error handling
- [ ] Mobile responsive
- [ ] Dark mode
- [ ] Vietnamese language
- [ ] Performance (large files)

## Implementation Timeline

**Week 1**: Basic upload UI and drag & drop
**Week 2**: Video list sidebar and progress tracking
**Week 3**: Detail editor and metadata forms
**Week 4**: API integration and chunk upload
**Week 5**: Testing, optimization, and deployment

**Total**: 5 weeks

## Success Criteria

- Support drag & drop upload
- Handle multiple files simultaneously
- Display accurate progress for each video
- Enable comprehensive metadata editing
- Provide YouTube-quality user experience
- Support files up to 2GB
- 95%+ upload success rate
- < 3s initial page load

---

**Version**: 1.0  
**Status**: Implementation Guide  
**Framework**: Next.js 15 + TypeScript  
**Styling**: Tailwind CSS  
**Language**: Vietnamese (Tiếng Việt)
