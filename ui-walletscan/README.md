# UI WalletScan - Wallet Scanner Frontend

Ứng dụng scan và theo dõi ví blockchain cho New Public Platform.

## Công nghệ

- **Next.js 14+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching

## Cài đặt

```bash
npm install
```

## Chạy development

```bash
npm run dev
```

Mở [http://localhost:3002](http://localhost:3002) trong trình duyệt.

## Tính năng

### Wallet Search
- Tìm kiếm ví theo address
- Tìm kiếm theo username
- History gần đây

### Wallet Details
- Token balances
- NFT holdings
- Transaction history
- Ledger entries

### NFT Explorer
- NFT collection
- NFT transfers
- NFT metadata

### Transaction Explorer
- Chi tiết transaction
- Decode transaction data
- Status và confirmations

### Contract Info
- Contract details
- ABI information
- Verified contracts

### Analytics
- Swap history
- Payout history
- Asset distribution

## Blockchain Support

- Ethereum
- Polygon
- BSC
- Solana
- Tron
- và nhiều chains khác

## Cấu trúc thư mục

```
ui-walletscan/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Search page
│   ├── wallet/[address]/   # Wallet details
│   ├── tx/[hash]/          # Transaction details
│   ├── contract/[address]/ # Contract info
│   └── nft/[id]/           # NFT details
├── components/
│   ├── ui/                 # UI components
│   ├── wallet/             # Wallet components
│   ├── blockchain/         # Blockchain components
│   └── ...
└── lib/
    ├── api.ts              # WalletScan API client
    ├── blockchain.ts       # Blockchain utilities
    └── ...
```

## API Backend

WalletScan frontend kết nối với endpoints tại `/api/external/wallet-scan/*`.

Xem `API-Documentation.txt` để biết chi tiết các endpoints.

## Features Roadmap

- [ ] Multi-chain support
- [ ] Real-time balance updates
- [ ] Price charts
- [ ] Portfolio tracking
- [ ] Alerts & notifications
- [ ] CSV export
- [ ] PDF reports

## Deploy

```bash
npm run build
npm start
```
