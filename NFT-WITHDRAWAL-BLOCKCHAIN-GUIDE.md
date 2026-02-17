# NFT Withdrawal & Blockchain Integration Guide

## Overview

Complete implementation guide for NFT withdrawal to personal wallets (on-chain export) with multi-chain support, IPFS storage, and smart contract integration.

## Core Features

### 1. NFT Withdrawal System
- Withdraw NFT to personal wallet (on-chain)
- User pays gas fees and all costs
- Pre-storage on NFT.Storage or Lighthouse.storage
- Priority implementation feature

### 2. Multi-Chain Support

**Supported Blockchains** (User Choice):
- **Polygon** (Primary): Contract at `0xF6E5fEB76959f59c80023392386B997B068c27c6`
- **Solana**
- **BSC** (Binance Smart Chain)
- **Ethereum**

### 3. Export Rules & Marketplace Freeze

**Before Export**:
- Internal marketplace frozen when export pending
- Must complete or cancel auction before withdrawal
- Cannot withdraw during active bidding
- NFT status set to "EXPORT_PENDING"

**After Export**:
- NFT status changed to "EXPORTED"
- Cannot be traded on internal marketplace
- Shows as "read-only mirror" in platform
- Displays on-chain owner information

### 4. Metadata Options

Users can choose metadata storage approach:

**Option A - Public URL** (Cheaper, Faster):
- `animation_url` points to mp4/hls public URL
- Lighter on gas fees
- Standard NFT appearance
- Faster minting process

**Option B - IPFS Upload** (Premium, Authentic):
- Full video uploaded to IPFS
- Higher gas fees (scales with video size)
- "True NFT" standard compliant
- More elegant, luxurious, noble appearance
- Better for collectors and premium content

### 5. Smart Contract Specifications

**ERC721 Standard Contract**:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VideoNFT is ERC721, Ownable {
    // Deterministic tokenId generation
    function getTokenId(uint256 chainId, uint256 nftId) 
        public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked("SRNFT:", chainId, nftId)));
    }
    
    // Mint function
    function mint(
        address to,
        uint256 nftId,
        string memory metadataURI
    ) external onlyOwner {
        uint256 tokenId = getTokenId(block.chainid, nftId);
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }
    
    // Read-only mirror mode
    bool public readOnlyMode = true;
    
    // Prevent transfers when in read-only mode (configurable)
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        require(!readOnlyMode || from == address(0), 
            "Transfers disabled in read-only mode");
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
```

**Deterministic TokenId Formula**:
```solidity
tokenId = uint256(keccak256(abi.encodePacked("SRNFT:", chainid, nftId)))
```
- Prevents format/namespace collisions
- Distinguishes between environments/versions
- Consistent across all chains

### 6. Contract Management System

**Features**:
- Change contract addresses without breaking existing NFTs
- Admin UI for contract changes
- 24-hour delay before changes take effect
- Admin notifications
- Comprehensive event logging

**Event Log Structure**:
```typescript
interface ContractChangeLog {
  id: string;
  userId: string; // Who made the change
  timestamp: Date; // When
  fromAddress: string; // Old contract
  toAddress: string; // New contract
  chain: 'polygon' | 'solana' | 'bsc' | 'eth';
  status: 'pending' | 'approved' | 'executed';
  approvedBy?: string;
  executedAt?: Date;
}
```

**Security Measures**:
- 24-hour mandatory delay
- Multi-signature approval (optional)
- Complete audit trail
- Prevents unauthorized changes
- Anti-hack protection

## IPFS Integration

### NFT.Storage API

```typescript
import { NFTStorage, File } from 'nft.storage';

const client = new NFTStorage({ 
  token: process.env.NFT_STORAGE_API_KEY 
});

async function uploadToIPFS(videoFile: File, metadata: NFTMetadata) {
  // Upload video
  const videoIPFS = await client.storeBlob(videoFile);
  
  // Create metadata
  const nftMetadata = {
    name: metadata.title,
    description: metadata.description,
    image: metadata.thumbnail,
    animation_url: `ipfs://${videoIPFS}`,
    attributes: metadata.attributes
  };
  
  // Upload metadata
  const metadataIPFS = await client.storeBlob(
    new Blob([JSON.stringify(nftMetadata)])
  );
  
  return {
    videoIPFS: `ipfs://${videoIPFS}`,
    metadataIPFS: `ipfs://${metadataIPFS}`
  };
}
```

### Lighthouse.storage API

```typescript
import lighthouse from '@lighthouse-web3/sdk';

async function uploadToLighthouse(videoFile: File, metadata: NFTMetadata) {
  const apiKey = process.env.LIGHTHOUSE_API_KEY;
  
  // Upload video
  const videoUpload = await lighthouse.upload(
    videoFile,
    apiKey
  );
  
  // Upload metadata
  const metadataUpload = await lighthouse.uploadText(
    JSON.stringify(metadata),
    apiKey
  );
  
  return {
    videoHash: videoUpload.Hash,
    metadataHash: metadataUpload.Hash
  };
}
```

## Wallet Addresses Configuration

```typescript
const WALLET_ADDRESSES = {
  'Ethereum': '0x8f492Ce715291Ad22feF80e244de5ea3aB875979',
  'BSC': '0x8f492Ce715291Ad22feF80e244de5ea3aB875979',
  'Polygon': '0x8f492Ce715291Ad22feF80e244de5ea3aB875979',
  'Base': '0x8f492Ce715291Ad22feF80e244de5ea3aB875979',
  'Solana': '4pcqM758FvxBaqNY3ccJYSDZtQp7ok2y7aC4xTp5knAr',
  'Sui': '0x22e37b59a7970a597c22ac7f0f6e23f6c7ba53174eedffa4074a2aaf874c28b5'
};
```

## Database Schema

### NFT Exports Table
```sql
CREATE TABLE nft_exports (
  id UUID PRIMARY KEY,
  nft_id UUID REFERENCES nfts(id),
  user_id UUID REFERENCES users(id),
  chain VARCHAR(20), -- 'polygon', 'solana', 'bsc', 'eth'
  wallet_address VARCHAR(255),
  metadata_option VARCHAR(20), -- 'public_url' or 'ipfs_upload'
  ipfs_video_hash VARCHAR(255),
  ipfs_metadata_hash VARCHAR(255),
  contract_address VARCHAR(255),
  token_id VARCHAR(255),
  transaction_hash VARCHAR(255),
  status VARCHAR(20), -- 'pending', 'uploading_ipfs', 'minting', 'complete', 'failed'
  gas_estimate DECIMAL(20, 8),
  gas_used DECIMAL(20, 8),
  export_fee DECIMAL(20, 8),
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_nft_exports_nft_id ON nft_exports(nft_id);
CREATE INDEX idx_nft_exports_user_id ON nft_exports(user_id);
CREATE INDEX idx_nft_exports_status ON nft_exports(status);
```

### Contract Change Log
```sql
CREATE TABLE contract_change_log (
  id UUID PRIMARY KEY,
  changed_by UUID REFERENCES users(id),
  chain VARCHAR(20),
  from_address VARCHAR(255),
  to_address VARCHAR(255),
  scheduled_at TIMESTAMP,
  executed_at TIMESTAMP,
  status VARCHAR(20), -- 'pending', 'approved', 'executed', 'cancelled'
  reason TEXT,
  approved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Export Flow APIs

```typescript
// 1. Initiate Export
POST /api/nft/export/initiate
Body: {
  nftId: string;
  chain: 'polygon' | 'solana' | 'bsc' | 'eth';
  walletAddress: string;
  metadataOption: 'public_url' | 'ipfs_upload';
}
Response: {
  exportId: string;
  estimatedGasFee: number;
  estimatedTotalCost: number;
}

// 2. Upload to IPFS (if selected)
POST /api/nft/export/upload-ipfs
Body: {
  exportId: string;
}
Response: {
  videoIPFS: string;
  metadataIPFS: string;
  uploadCost: number;
}

// 3. Mint On-Chain
POST /api/nft/export/mint-onchain
Body: {
  exportId: string;
  signedTransaction: string;
}
Response: {
  transactionHash: string;
  tokenId: string;
  explorerUrl: string;
}

// 4. Check Export Status
GET /api/nft/export/status/:exportId
Response: {
  status: string;
  progress: number;
  currentStep: string;
  error?: string;
}

// 5. Cancel Export
POST /api/nft/export/cancel
Body: {
  exportId: string;
}
```

### Contract Management APIs

```typescript
// Schedule Contract Change
POST /api/admin/contracts/schedule-change
Body: {
  chain: string;
  newAddress: string;
  reason: string;
}

// List Pending Changes
GET /api/admin/contracts/pending-changes

// Approve Change
POST /api/admin/contracts/approve-change
Body: {
  changeId: string;
}

// View Change Log
GET /api/admin/contracts/change-log
```

## User Interface

### Export Page Components

1. **Chain Selector**
   - Radio buttons or cards for each chain
   - Display gas fee estimates
   - Show network status

2. **Metadata Option Selector**
   - Two options with descriptions
   - Price comparison
   - Recommendations based on video size

3. **Wallet Address Display**
   - Show receiving address
   - Copy button
   - QR code (optional)

4. **Gas Estimation Display**
   - Real-time gas price
   - Total cost calculation
   - Warning if unusually high

5. **Transaction Status Tracker**
   - Step-by-step progress
   - Current phase indicator
   - Estimated time remaining

6. **Admin Contract Manager**
   - Contract addresses for each chain
   - Schedule change interface
   - Pending changes queue
   - Change history log

## Security Considerations

### Before Export
- Verify NFT ownership
- Check auction status
- Validate wallet address
- Estimate gas costs
- Confirm user has sufficient balance

### During Export
- Freeze marketplace listing
- Monitor transaction status
- Handle network failures gracefully
- Implement retry logic

### After Export
- Update NFT status in database
- Emit export event
- Log transaction details
- Notify user of completion

### Smart Contract Security
- Professional audit required before deployment
- Use OpenZeppelin libraries
- Implement emergency pause
- Multi-sig for admin functions

## Testing Strategy

### Unit Tests
- TokenId generation
- Metadata formatting
- Gas estimation
- Wallet validation

### Integration Tests
- IPFS upload flow
- Contract deployment
- Minting process
- Status updates

### End-to-End Tests
- Complete export flow
- Multi-chain scenarios
- Error recovery
- Contract changes

## Additional Features

### HTTP 401 for Protected Videos
Change password-protected video responses from 404 to 401 for better security.

### Mobile UI (m.youtube.com style)
Optimize export interface for mobile devices with touch-friendly controls.

### PeerTube Sync
Integration with `peertube3.cpy.re/videos/browse` for external video synchronization.

## Implementation Timeline

**Week 1-2**: Smart contract development
**Week 3-4**: IPFS integration
**Week 5-6**: Multi-chain support
**Week 7-8**: Export UI and flow
**Week 9-10**: Contract management system
**Week 11-12**: Testing and security audit

**Total**: 12 weeks

## Success Criteria

- NFTs successfully exported to all 4 chains
- User pays gas fees correctly
- IPFS storage working reliably
- Contract changes work without breaking NFTs
- 24-hour delay enforced
- Complete audit trail maintained
- Professional security audit passed
- < 5% export failure rate

---

**Version**: 1.0  
**Status**: Implementation Guide  
**Chains**: Polygon, Solana, BSC, Ethereum  
**Storage**: NFT.Storage, Lighthouse  
**Security**: Audit Required
