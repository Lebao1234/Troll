// app/nhanthuong/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NhanThuongPage() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Bắt đầu muted để autoplay

  useEffect(() => {
    // Tự động bật âm thanh sau 3 giây
    const unmuteTimer = setTimeout(() => {
      setIsMuted(false);
    }, 3000);

    return () => clearTimeout(unmuteTimer);
  }, []);

  // Link YouTube với các parameters
  const youtubeUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-linear-to-r from-red-900/50 to-orange-900/50 p-4 rounded-xl border border-red-700 mb-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-6xl animate-bounce">🐔</div>
                <p className="text-2xl font-bold text-white">GÀ</p>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 mt-2">
                BẠN ĐÃ BỊ SCAM!
              </h1>
              <p className="text-3xl font-bold text-yellow-300 mt-2">
                BẠN CHỈ CÓ RICKROLL THUI!!!
              </p>
            </div>
          </div>
        </div>

        {/* YouTube Video Container */}
        <div className="mb-8">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500">
            
            {/* YouTube Embed */}
            <div className="relative pb-[56.25%] h-0"> {/* 16:9 aspect ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={youtubeUrl}
                title="Rick Astley - Never Gonna Give You Up"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setVideoLoaded(true)}
              />
            </div>

            {/* Loading overlay */}
            {!videoLoaded && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 mx-auto mb-4"></div>
                  <p className="text-yellow-300 font-bold text-xl">Đang tải Rickroll...</p>
                </div>
              </div>
            )}

            {/* Mute/Unmute indicator */}
            {isMuted && videoLoaded && (
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg animate-pulse">
                🔊 Đang phát (tạm tắt tiếng để autoplay)
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="bg-gray-800/80 p-4 rounded-b-2xl border-t border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">🎵 Rick Astley - Never Gonna Give You Up</h3>
                <p className="text-gray-400">Phần thưởng internet huyền thoại (1.5B+ lượt xem)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                <div className="text-sm bg-red-600 px-3 py-1 rounded-full">TRENDING</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              // Reload iframe với trạng thái mute mới
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.src = iframe.src.replace(/mute=\d/, `mute=${isMuted ? 0 : 1}`);
              }
            }}
            className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
          >
            <span>🔊</span>
            <span>{isMuted ? 'Bật tiếng' : 'Tắt tiếng'}</span>
          </button>
          
          <button
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                // Reload video để phát lại từ đầu
                iframe.src = iframe.src.replace(/&t=\d+s?/, '') + '&t=0s';
              }
            }}
            className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Phát lại từ đầu</span>
          </button>
          
          <button
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                // Tua đến đoạn chorus (33 giây)
                iframe.src = iframe.src.replace(/&t=\d+s?/, '') + '&t=33s';
              }
            }}
            className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
          >
            <span>⏩</span>
            <span>Tua đến đoạn hay</span>
          </button>
          
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
          >
            <span>📺</span>
            <span>Mở trên YouTube</span>
          </a>
          
          <Link href="/">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2 border border-gray-700">
              <span>←</span>
              <span>Quay lại</span>
            </button>
          </Link>
        </div>

        {/* Video Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">🎵</div>
            <div className="font-bold">1987</div>
            <div className="text-sm text-gray-400">Năm phát hành</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">⏱️</div>
            <div className="font-bold">3:32</div>
            <div className="text-sm text-gray-400">Thời lượng</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">👁️</div>
            <div className="font-bold">1.5B+</div>
            <div className="text-sm text-gray-400">Lượt xem</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-bold">#1</div>
            <div className="text-sm text-gray-400">Meme Internet</div>
          </div>
        </div>

        {/* Troll Message */}
        <div className="bg-linear-to-r from-red-900/30 to-orange-900/30 p-6 rounded-2xl border border-red-700/50">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🎭</div>
            <div>
              <h3 className="text-xl font-bold mb-2">CHỈ NHỮNG CON GÀ MỚI BỊ RICKROLLED!</h3>
              <p className="text-gray-300 mb-2">
                Chúc mừng! Bạn vừa trải nghiệm meme internet kinh điển nhất.
                Video này đã troll hàng triệu người trên toàn thế giới!
              </p>
              <p className="text-yellow-300 font-bold">
                "Never gonna give you up, never gonna let you down..." 🎵
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Tips */}
        <div className="mt-6 p-4 bg-blue-900/20 rounded-xl">
          <div className="text-sm text-blue-300 text-center">
            📱 <strong>Lưu ý trên mobile:</strong> Video tự động phát (tạm tắt tiếng). 
            Nhấn vào biểu tượng 🔊 trên video để bật âm thanh.
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm pt-6 border-t border-gray-800">
          <p>© 2024 Classic Rickroll Experience - Trang web troll vui vẻ</p>
          <p className="mt-1">Không có phần thưởng thực tế, chỉ có niềm vui! 😄</p>
          <div className="flex justify-center gap-6 mt-4 text-xl">
            <span className="hover:text-yellow-400 transition-colors">🎵</span>
            <span className="hover:text-blue-400 transition-colors">🎸</span>
            <span className="hover:text-red-400 transition-colors">🎤</span>
            <span className="hover:text-green-400 transition-colors">💃</span>
          </div>
        </div>
      </div>
    </div>
  );
}