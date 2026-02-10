'use client';

import { Image, ExternalLink, Copy, Heart, Share2, Clock, Eye, Tag } from 'lucide-react';

export default function NFTDetailsPage({ params }: { params: { id: string } }) {
  const attributes = [
    { trait: 'Background', value: 'Blue', rarity: '15%' },
    { trait: 'Body', value: 'Golden', rarity: '5%' },
    { trait: 'Eyes', value: 'Laser', rarity: '3%' },
    { trait: 'Accessory', value: 'Crown', rarity: '2%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* NFT Image */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="aspect-square bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 rounded-xl mb-4"></div>
            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Favorite
              </button>
              <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-white/60 text-sm mb-1">Collection Name</div>
                  <h1 className="text-3xl font-bold">NFT #{params.id}</h1>
                </div>
                <button className="p-2 hover:bg-white/20 rounded-lg">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div>
                  <div className="text-white/60 text-sm">Owner</div>
                  <div className="font-mono flex items-center gap-2">
                    0x1234...ABCD
                    <button className="p-1 hover:bg-white/20 rounded">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-white/60 text-sm mb-1">Token ID</div>
                  <div className="font-bold">{params.id}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-white/60 text-sm mb-1">Token Standard</div>
                  <div className="font-bold">ERC-721</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-white/60 text-sm mb-1">Chain</div>
                  <div className="font-bold">Ethereum</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-white/60 text-sm mb-1">Last Sale</div>
                  <div className="font-bold">2.5 ETH</div>
                </div>
              </div>

              <p className="text-white/80 mb-4">
                This is an amazing NFT from a prestigious collection. It features unique traits and has historical significance in the NFT space.
              </p>

              <div className="flex items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  1.2K views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  234 favorites
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Minted 6 months ago
                </span>
              </div>
            </div>

            {/* Attributes */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tag className="w-6 h-6" />
                Attributes
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {attributes.map((attr, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-white/60 text-sm mb-1">{attr.trait}</div>
                    <div className="font-bold mb-1">{attr.value}</div>
                    <div className="text-xs text-blue-400">{attr.rarity} rarity</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-4">Contract Information</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-white/60">Contract Address</div>
                  <div className="font-mono flex items-center gap-2">
                    0xABCD...1234
                    <button className="p-1 hover:bg-white/20 rounded">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white/60">Token Standard</div>
                  <div>ERC-721</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white/60">Blockchain</div>
                  <div>Ethereum Mainnet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
