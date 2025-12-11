// app/nhanthuong/page.jsx
"use client";

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function NhanThuongPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fix video rotation khi có metadata
    const fixVideoRotation = () => {
      // Lấy kích thước thực của video
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      
      if (videoWidth === 0 || videoHeight === 0) return;
      
      // Reset transform
      video.style.transform = 'none';
      video.style.objectFit = 'contain';
      
      // Nếu video bị xoay (thường là portrait video được encode sai)
      if (videoWidth < videoHeight) {
        // Video portrait, có thể bị xoay ngang
        const container = video.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const scale = containerWidth / videoHeight;
          
          video.style.transform = `rotate(-90deg) scale(${scale})`;
          video.style.transformOrigin = 'center center';
        }
      }
    };

    // Tự động phát video
    const autoPlayVideo = async () => {
      try {
        video.muted = true; // Cần muted để autoplay work
        video.playsInline = true;
        
        await video.play();
        setShowPlayOverlay(false);
        
        // Sau 2 giây thử bật âm thanh
        setTimeout(() => {
          if (video) video.muted = false;
        }, 2000);
      } catch (error) {
        console.log("Autoplay blocked, showing play button");
        setShowPlayOverlay(true);
      }
    };

    // Event listeners
    video.addEventListener('loadedmetadata', fixVideoRotation);
    video.addEventListener('loadeddata', autoPlayVideo);
    video.addEventListener('resize', fixVideoRotation);

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', fixVideoRotation);
      video.removeEventListener('loadeddata', autoPlayVideo);
      video.removeEventListener('resize', fixVideoRotation);
    };
  }, []);

  // Handler functions
  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setShowPlayOverlay(false);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleSkipToChorus = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 33; // Đoạn chorus
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-linear-to-br from-red-900/50 to-orange-900/50 p-4 rounded-xl border border-red-700 mb-4">
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

        {/* Video Container */}
        <div className="mb-8">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500 min-h-100 flex items-center justify-center">
            
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full max-h-150 object-contain"
              playsInline
              controls
              loop
              preload="auto"
            >
              <source src="/videos/rickroll.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
            
            {/* Play Overlay */}
            {showPlayOverlay && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <div className="text-7xl mb-6">▶️</div>
                  <h3 className="text-3xl font-bold text-yellow-300 mb-4">
                    NHẤN ĐỂ XEM RICKROLL!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Đây là video troll kinh điển nhất internet
                  </p>
                  <button
                    onClick={handlePlayVideo}
                    className="bg-linear-to-br from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold text-2xl py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-all"
                  >
                    🎬 BẤM ĐỂ XEM
                  </button>
                  <p className="text-sm text-gray-400 mt-4">
                    Trình duyệt yêu cầu bạn bấm để phát video
                  </p>
                </div>
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
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-gray-400">5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={handleReplay}
            className="bg-linear-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Phát lại</span>
          </button>
          
          <button
            onClick={handleSkipToChorus}
            className="bg-linear-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
          >
            <span>⏩</span>
            <span>Tua đến đoạn hay</span>
          </button>
          
          <button
            onClick={toggleMute}
            className="bg-linear-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
          >
            <span>🔊</span>
            <span>Bật/Tắt tiếng</span>
          </button>
          
          <Link href="/">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2 border border-gray-700">
              <span>←</span>
              <span>Quay lại</span>
            </button>
          </Link>
        </div>

        {/* Troll Message */}
        <div className="bg-linear-to-br from-red-900/30 to-orange-900/30 p-6 rounded-2xl border border-red-700/50">
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
          <p className="text-sm text-blue-300 text-center">
            📱 Trên điện thoại: Nhấn vào nút "BẤM ĐỂ XEM" để phát video
          </p>
        </div>
      </div>
    </div>
  );
}