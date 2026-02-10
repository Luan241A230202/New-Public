'use client';

import { FileCode, Copy, ExternalLink, CheckCircle, AlertCircle, Code } from 'lucide-react';

export default function ContractDetailsPage({ params }: { params: { address: string } }) {
  const functions = [
    { name: 'transfer', type: 'write', inputs: '(address to, uint256 amount)' },
    { name: 'balanceOf', type: 'read', inputs: '(address account)' },
    { name: 'approve', type: 'write', inputs: '(address spender, uint256 amount)' },
    { name: 'totalSupply', type: 'read', inputs: '()' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <FileCode className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Smart Contract</h1>
              <div className="flex items-center gap-2 text-sm">
                <code className="font-mono">{params.address}</code>
                <button className="p-1 hover:bg-white/20 rounded">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-white/20 rounded">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Verified
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Balance', value: '125.5 ETH' },
              { label: 'Transactions', value: '12,345' },
              { label: 'Token Transfers', value: '45,678' },
              { label: 'Contract Age', value: '245 days' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3">
                <div className="text-white/60 text-sm mb-1">{stat.label}</div>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contract Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-bold mb-4">Contract Information</h2>
          <div className="space-y-3">
            {[
              { label: 'Contract Name', value: 'MyToken' },
              { label: 'Compiler Version', value: 'v0.8.19+commit.7dd6d404' },
              { label: 'Optimization', value: 'Yes with 200 runs' },
              { label: 'EVM Version', value: 'default' },
              { label: 'License', value: 'MIT' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/10">
                <div className="text-white/60">{item.label}</div>
                <div className="font-mono">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ABI Functions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Contract Functions
          </h2>
          <div className="space-y-2">
            {functions.map((func, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    func.type === 'write' ? 'bg-orange-500/20 text-orange-300' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {func.type}
                  </span>
                  <code className="font-mono font-semibold">{func.name}</code>
                  <code className="text-white/60 font-mono text-sm">{func.inputs}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Code */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold mb-4">Contract Source Code</h2>
          <div className="bg-black/30 rounded-xl p-4 overflow-x-auto">
            <pre className="font-mono text-sm text-white/80">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyToken {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
