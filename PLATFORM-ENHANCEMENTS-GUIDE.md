# Platform Enhancements Guide

Complete implementation guide for advanced Vietnamese requirements.

## Overview

This document covers 5 major feature enhancements requested in Vietnamese:
1. NFT & Pricing System
2. Video Visibility Levels
3. Premium Memberships
4. Community Posts
5. Multi-language Support

---

## 1. NFT & Pricing System

### 1.1 Admin-Controlled NFT Pricing

**Requirement**: Admin decides NFT minting prices

**Implementation**:
- Admin dashboard settings for NFT pricing
- Dynamic pricing based on content type
- Configurable per collection

**Database Schema**:
```sql
CREATE TABLE nft_pricing (
  id UUID PRIMARY KEY,
  content_type VARCHAR(50), -- 'video', 'collection', 'post'
  base_price_stars INTEGER,
  min_price_stars INTEGER,
  max_price_stars INTEGER,
  currency VARCHAR(20), -- 'STARS', 'USDT', 'ETH'
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**API**:
- GET /api/admin/nft/pricing
- PATCH /api/admin/nft/pricing

### 1.2 6-Digit PIN for Stars Security

**Requirement**: Optional 6-digit PIN for Stars transactions

**Features**:
- User sets up 6-digit PIN in settings
- Required for Stars purchases/transfers
- PIN verification before transactions
- Lockout after 3 failed attempts
- Recovery via email

**Database Schema**:
```sql
CREATE TABLE user_security (
  user_id UUID PRIMARY KEY,
  stars_pin_hash VARCHAR(255),
  pin_enabled BOOLEAN DEFAULT false,
  failed_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**APIs**:
- POST /api/me/security/pin/setup
- POST /api/me/security/pin/verify
- POST /api/me/security/pin/reset
- PATCH /api/me/security/pin/toggle

### 1.3 Mint Fees to Treasury

**Requirement**: NFT mint fees go to treasury/admin for future promotions

**Implementation**:
- Mint fee collected during NFT creation
- Transferred to admin treasury wallet
- Tracked for promotional budgets

**Database Schema**:
```sql
CREATE TABLE treasury_transactions (
  id UUID PRIMARY KEY,
  type VARCHAR(50), -- 'mint_fee', 'platform_fee', 'withdrawal'
  amount_stars INTEGER,
  source_user_id UUID,
  nft_id UUID,
  created_at TIMESTAMP
);
```

### 1.4 Platform Fee (1%)

**Requirement**: 1% platform fee on NFT sales

**Implementation**:
- Automatic deduction on marketplace sales
- Goes to platform treasury
- Displayed clearly before purchase

### 1.5 Royalty System

**Requirement**: 20%-50%-80% royalty splits

**Features**:
- Creator royalty: 0-10% (configurable)
- Split ratios:
  - 20% to creator, 80% to author
  - 50% to creator, 50% to author
  - 80% to creator, 20% to author
- Set during NFT creation (unchangeable)
- Automatic distribution on each sale

**Database Schema**:
```sql
CREATE TABLE nft_royalties (
  nft_id UUID PRIMARY KEY,
  royalty_percentage DECIMAL(4,2), -- 0.00 to 10.00
  creator_split_percentage INTEGER, -- 20, 50, or 80
  creator_id UUID,
  author_id UUID,
  created_at TIMESTAMP
);

CREATE TABLE royalty_payments (
  id UUID PRIMARY KEY,
  nft_id UUID,
  sale_id UUID,
  recipient_type VARCHAR(20), -- 'creator', 'author', 'platform'
  recipient_id UUID,
  amount_stars INTEGER,
  created_at TIMESTAMP
);
```

### 1.6 Withdrawal Restrictions

**Requirement**: 10-day withdrawal restriction on first unverified NFT sale

**Implementation**:
- Track first sale of unverified NFTs
- Lock funds for 10 days
- Verify no violations
- Enable withdrawal after period

**Database Schema**:
```sql
CREATE TABLE nft_sale_restrictions (
  id UUID PRIMARY KEY,
  nft_id UUID,
  sale_id UUID,
  seller_id UUID,
  amount_stars INTEGER,
  sale_date TIMESTAMP,
  withdrawal_available_date TIMESTAMP,
  is_first_sale BOOLEAN,
  is_verified BOOLEAN,
  can_withdraw BOOLEAN,
  created_at TIMESTAMP
);
```

### 1.7 Collection Minting Fees

**Requirement**: Fixed collection minting fees based on blockchain

**Pricing**:
- Ethereum (ETH): 0.50 ETH
- BNB Smart Chain: 1.00 BNB
- Polygon/Solana: 1 BNB equivalent in Stars/USDT

**Implementation**:
- Calculate fee based on selected blockchain
- Convert to Stars if paying with Stars
- Display clearly before collection creation

---

## 2. Video Visibility Levels

### 2.1 Six Visibility Types

**Types**:

1. **Công khai (Public)** - Anyone can see
2. **Hạn chế (Restricted)** - Only with link
3. **Riêng tư (Private)** - Only owner
4. **Nội bộ (Internal)** - Members only, indexed but hidden for guests
5. **Được bảo vệ mật khẩu (Password Protected)** - Password required
6. **Đặt lịch đăng (Scheduled)** - Publish on specific date

### 2.2 Database Schema

```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  visibility VARCHAR(20), -- 'public', 'restricted', 'private', 'internal', 'password', 'scheduled'
  password_hash VARCHAR(255), -- for password protected
  scheduled_publish_date TIMESTAMP, -- for scheduled
  allow_indexing BOOLEAN, -- for internal
  -- ... other fields
);

CREATE TABLE video_access_logs (
  id UUID PRIMARY KEY,
  video_id UUID,
  user_id UUID,
  access_type VARCHAR(20),
  accessed_at TIMESTAMP
);
```

### 2.3 Access Control Logic

**Public**: No restrictions

**Restricted**: 
- Not listed in search
- Accessible via direct link only

**Private**:
- Only owner can access
- Not indexed, not searchable

**Internal**:
- Only authenticated members
- Indexed in search engines
- Hidden from guest users

**Password Protected**:
- Prompt for password on access
- Store password hash, not plain text
- One-time verification per session

**Scheduled**:
- Visible only after scheduled date
- Automatically changes to Public/selected visibility
- Countdown timer shown to owner

### 2.4 APIs

- PATCH /api/videos/[id]/visibility
- POST /api/videos/[id]/password
- POST /api/videos/[id]/schedule
- POST /api/videos/[id]/verify-password

---

## 3. Premium Memberships

### 3.1 Premium Tier

**Features**:
- ✅ Verified badge
- ✅ Can mint NFTs and collections
- ✅ Only see boost ads (other ads hidden)
- ✅ Custom avatar from NFT collections
- ✅ Priority support

**Pricing**: Admin-configurable in Stars

**Database Schema**:
```sql
CREATE TABLE premium_tiers (
  id UUID PRIMARY KEY,
  name VARCHAR(50), -- 'premium', 'premium_plus'
  price_stars INTEGER,
  duration_days INTEGER, -- 30, 90, 365
  features JSONB,
  is_active BOOLEAN,
  created_at TIMESTAMP
);

CREATE TABLE user_premium (
  user_id UUID PRIMARY KEY,
  tier VARCHAR(20),
  started_at TIMESTAMP,
  expires_at TIMESTAMP,
  auto_renew BOOLEAN,
  is_active BOOLEAN
);
```

### 3.2 Premium+ Tier

**Features**:
- ✅ All Premium features
- ✅ Optional boost ads (can disable)
- ✅ Access to private videos (creator permission)
- ✅ Comment highlighting (distinctive badge)
- ✅ 4 free boosts per month
- ✅ Limited quantity (admin-selected)
- ✅ Can be auctioned

**Special Properties**:
- Limited slots (e.g., 1000 total)
- Auction system for new slots
- Transferable via marketplace

**Database Schema**:
```sql
CREATE TABLE premium_plus_slots (
  id UUID PRIMARY KEY,
  slot_number INTEGER,
  owner_user_id UUID,
  acquired_via VARCHAR(20), -- 'purchase', 'auction', 'transfer'
  acquired_at TIMESTAMP,
  price_stars INTEGER
);

CREATE TABLE premium_plus_auctions (
  id UUID PRIMARY KEY,
  slot_id UUID,
  start_price_stars INTEGER,
  current_bid_stars INTEGER,
  current_bidder_id UUID,
  starts_at TIMESTAMP,
  ends_at TIMESTAMP,
  status VARCHAR(20) -- 'active', 'completed', 'cancelled'
);

CREATE TABLE premium_perks_usage (
  user_id UUID,
  month DATE,
  free_boosts_used INTEGER DEFAULT 0,
  free_boosts_limit INTEGER DEFAULT 4,
  PRIMARY KEY (user_id, month)
);
```

### 3.3 Premium APIs

- POST /api/premium/subscribe
- GET /api/premium/status
- PATCH /api/premium/settings
- GET /api/premium-plus/slots
- POST /api/premium-plus/auction/bid
- POST /api/premium/boost/redeem

---

## 4. Community Posts (YouTube-style)

### 4.1 Post Types

1. **Văn bản (Text)** - Thoughts, announcements
2. **Hình ảnh/GIF (Images/GIFs)** - Visual content
3. **Thăm dò ý kiến (Polls)** - Audience polls
4. **Video** - Embed YouTube or platform videos
5. **Liên kết (Links)** - External links

### 4.2 Display Locations

- Tab Cộng đồng (Community tab) on channel
- Trang chủ (Homepage) - "Channel Posts" section
- Trang Đăng ký (Subscription Feed)
- Trang Shorts (if applicable)

### 4.3 Database Schema

```sql
CREATE TABLE community_posts (
  id UUID PRIMARY KEY,
  author_id UUID,
  type VARCHAR(20), -- 'text', 'image', 'poll', 'video', 'link'
  content TEXT,
  media_urls TEXT[], -- for images/gifs
  video_id UUID, -- for embedded videos
  link_url TEXT, -- for links
  visibility VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE community_polls (
  id UUID PRIMARY KEY,
  post_id UUID,
  question TEXT,
  options JSONB, -- [{"id": 1, "text": "Option 1", "votes": 0}]
  ends_at TIMESTAMP,
  created_at TIMESTAMP
);

CREATE TABLE community_poll_votes (
  id UUID PRIMARY KEY,
  poll_id UUID,
  user_id UUID,
  option_id INTEGER,
  voted_at TIMESTAMP,
  UNIQUE(poll_id, user_id)
);

CREATE TABLE community_post_reactions (
  id UUID PRIMARY KEY,
  post_id UUID,
  user_id UUID,
  reaction_type VARCHAR(20), -- 'like', 'love', 'haha', 'wow'
  created_at TIMESTAMP,
  UNIQUE(post_id, user_id, reaction_type)
);

CREATE TABLE community_post_comments (
  id UUID PRIMARY KEY,
  post_id UUID,
  user_id UUID,
  content TEXT,
  parent_comment_id UUID,
  created_at TIMESTAMP
);
```

### 4.4 Community Post APIs

- POST /api/community/posts/create
- GET /api/community/posts
- POST /api/community/posts/[id]/react
- POST /api/community/posts/[id]/comment
- POST /api/community/polls/[id]/vote
- GET /api/community/feed

### 4.5 UI Components

**Post Card**:
- Author avatar + name + verification badge
- Post timestamp
- Content (text/image/poll/video/link)
- Interaction buttons (like, comment, share)
- Comment section

**Poll Component**:
- Question
- Options with progress bars
- Vote button
- Results (after voting or poll end)

**Feed Layout**:
- Masonry/card grid
- Infinite scroll
- Filter by post type
- Sort by recent/popular

---

## 5. Multi-language Support

### 5.1 Supported Languages

- English (en)
- Vietnamese (vi) - default
- Chinese (zh)
- Indonesian (id)
- Malaysian (ms)
- And more...

### 5.2 Implementation

**i18n Framework**: Next.js with i18next

**Translation Files**:
```
locales/
  en/
    common.json
    video.json
    nft.json
    premium.json
  vi/
    common.json
    video.json
    nft.json
    premium.json
  zh/
    ...
  id/
    ...
```

**Database Schema**:
```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY,
  language VARCHAR(10) DEFAULT 'vi',
  timezone VARCHAR(50),
  currency VARCHAR(10),
  updated_at TIMESTAMP
);
```

### 5.3 Language Selector

**Member Settings**:
- Settings > Language & Region
- Dropdown with all languages
- Save preference to database

**Footer**:
- Language selector dropdown
- Available for guests
- Stores in cookie/localStorage

### 5.4 Translation Management

**Content Translation**:
- User-generated content in original language
- Auto-translate option (Google Translate API)
- Community translations
- Show original language indicator

**APIs**:
- GET /api/languages
- PATCH /api/me/language
- GET /api/translations/[key]

---

## 6. NFT Post-Minting Restrictions

### 6.1 Locked Fields

**After NFT minting, these CANNOT be changed**:
- Title
- Tags

**Can still be edited**:
- Description/content
- Thumbnail (if not part of NFT metadata)
- Category (for browsing, not NFT metadata)

### 6.2 Implementation

```sql
CREATE TABLE nft_metadata (
  nft_id UUID PRIMARY KEY,
  original_title VARCHAR(255),
  original_tags TEXT[],
  minted_at TIMESTAMP,
  is_locked BOOLEAN DEFAULT true
);
```

**UI**:
- Disabled input fields with tooltip
- Warning before minting
- "Locked" badge on NFT videos

---

## 7. Implementation Roadmap

### Phase 1: Core Infrastructure (Weeks 1-2)
- Database schema migrations
- API foundations
- Security (PIN system)

### Phase 2: NFT System (Weeks 3-4)
- Pricing system
- Royalty calculations
- Withdrawal restrictions
- Collection minting

### Phase 3: Video Visibility (Week 5)
- Six visibility types
- Access control
- Password protection
- Scheduling system

### Phase 4: Premium Memberships (Weeks 6-7)
- Premium tier
- Premium+ tier with auctions
- Perk management
- Badge system

### Phase 5: Community Posts (Weeks 8-9)
- Post types
- Feed system
- Polls
- Reactions

### Phase 6: Multi-language (Week 10)
- Translation system
- UI updates
- Language selector

### Phase 7: Testing & Polish (Weeks 11-12)
- Integration testing
- Performance optimization
- UI/UX polish
- Documentation

---

## 8. Admin Dashboard Requirements

### 8.1 NFT Management
- Set mint pricing
- Configure royalty splits
- View treasury balance
- Approve/reject NFTs
- Set collection fees

### 8.2 Premium Management
- Set Premium prices
- Set Premium+ slot count
- Manage auctions
- View member statistics

### 8.3 Content Moderation
- Review community posts
- Manage visibility settings
- Monitor password-protected content

### 8.4 Language Management
- Add/edit translations
- Set default language
- View language statistics

---

## 9. Security Considerations

### 9.1 PIN Security
- bcrypt hashing
- Rate limiting (3 attempts)
- Temporary lockout
- Email recovery

### 9.2 Payment Security
- Two-factor for large transactions
- Transaction limits
- Fraud detection
- Withdrawal verification

### 9.3 NFT Security
- Smart contract audits
- Royalty enforcement
- Metadata immutability
- IPFS storage

---

## 10. Performance Optimization

### 10.1 Caching Strategy
- Video metadata
- NFT data
- Premium status
- Language translations

### 10.2 Database Indexing
- User visibility queries
- NFT sales lookups
- Community post feeds
- Premium membership status

### 10.3 CDN Usage
- NFT images/videos
- User avatars
- Community post media

---

## Summary

This comprehensive guide covers all Vietnamese requirements:

✅ **NFT & Pricing**: Complete system with admin control, PIN security, fees, royalties
✅ **Video Visibility**: Six levels with full access control
✅ **Premium Tiers**: Premium & Premium+ with all features
✅ **Community Posts**: YouTube-style with 5 post types
✅ **Multi-language**: Complete i18n system

**Status**: Ready for implementation
**Estimated Timeline**: 12 weeks
**Team Size**: 5-7 developers
**Priority**: High-value features

---

**Version**: 1.0
**Date**: 2026-02-09
**Language**: Vietnamese + English
**Scope**: Enterprise-level enhancements
