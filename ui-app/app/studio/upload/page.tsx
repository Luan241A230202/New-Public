"use client";

import { useState } from "react";
import { 
  Upload, X, Video, Image, FileText, 
  Clock, Eye, Globe, Lock,
  Tag, List, DollarSign, CheckCircle, AlertCircle
} from "lucide-react";

export default function UploadVideo() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Tải lên video</h1>
        
        {!file ? (
          <div 
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border-2 border-dashed border-white/30 hover:border-purple-400 transition-all text-center"
          >
            <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Kéo thả video vào đây</h3>
            <p className="text-gray-300 mb-6">Hoặc chọn file từ máy tính</p>
            <label className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg cursor-pointer inline-block">
              <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
              Chọn file
            </label>
            <p className="text-gray-400 text-sm mt-4">MP4, MOV, AVI, WebM (Max: 10GB)</p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-white font-semibold">{file.name}</p>
                  <p className="text-gray-300 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={() => setFile(null)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
