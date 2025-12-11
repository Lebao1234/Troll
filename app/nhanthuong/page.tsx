// app/nhanthuong/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NhanThuongPage() {
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // Set video đã sẵn sàng sau 2 giây
    const timer = setTimeout(() => {
      setIsVideoReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-linear-to-br from-red-900/50 to-orange-900/50 p-4 rounded-xl border border-red-700 mb-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-6xl animate-bounce">🐔</div>
                <p className="text-2xl font-bold text-white">
                  GÀ
                </p>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 mt-2">
                BẠN ĐÃ BỊ SCAM!
              </h1>
              <p className="text-5xl md:text-4xl font-bold text-yellow-300 mt-2">
                BẠN CHỈ CÓ RICKROLL THUI!!!
              </p>
            </div>
          </div>
        </div>

        {/* Video Container */}
        <div className="mb-8">
          {/* YouTube Player - Full controls */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500">
            {/* Loading overlay */}
            {!isVideoReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 mx-auto mb-4"></div>
                  <p className="text-yellow-300 font-bold text-xl">Đang tải phần thưởng của bạn...</p>
                  <p className="text-gray-400 mt-2">Rick Astley - Are We There Yet?</p>
                </div>
              </div>
            )}
            
            {/* YouTube Embed - Full player với controls */}
            <div className={`aspect-w-16 aspect-h-9 transition-opacity duration-500 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}>
              <iframe
                className="w-full h-100 md:h-125 lg:h-150"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=1"
                title="Rick Astley - Never Gonna Give You Up"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.src = iframe.src.replace(/autoplay=\d/, 'autoplay=1');
                setIsVideoReady(false);
                setTimeout(() => setIsVideoReady(true), 100);
              }
            }}
            className="bg-linear-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Phát lại từ đầu</span>
          </button>
          
          <a
            href="https://youtu.be/dQw4w9WgXcQ?t=10"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-linear-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
          >
            <span>⏩</span>
            <span>Tua đến đoạn hay</span>
          </a>
          
          <Link href="/">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 border border-gray-700">
              <span>←</span>
              <span>Quay lại trang chính</span>
            </button>
          </Link>
        </div>

        {/* Troll Message */}
        <div className="bg-linear-to-br from-red-900/30 to-orange-900/30 p-6 rounded-2xl border border-red-700/50 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🎭</div>
            <div>
              <h3 className="text-xl font-bold mb-2">CHỈ NHỮNG CON GÀ MỚI BỊ RICKROLLED!</h3>
              <p className="text-gray-300 mb-2">
                Chúc mừng! Bạn vừa trải nghiệm một trong những meme internet kinh điển nhất mọi thời đại.
                Video này đã troll hàng triệu người trên toàn thế giới!
              </p>
              <p className="text-yellow-300 font-bold">
                "Never gonna give you up, never gonna let you down..." 🎵
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}