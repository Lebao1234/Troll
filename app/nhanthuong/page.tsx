// app/nhanthuong/page.jsx
"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function NhanThuongPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tự động phát video khi component mount
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Đợi video load
          videoRef.current.load();
          
          // Sửa rotation metadata của video - phát hiện và counter-rotate
          const fixRotation = () => {
            if (videoRef.current && videoContainerRef.current) {
              const video = videoRef.current;
              
              // Lấy kích thước thực của video frames (không tính rotation metadata)
              const videoWidth = video.videoWidth;
              const videoHeight = video.videoHeight;
              
              if (videoWidth > 0 && videoHeight > 0) {
                // Lấy kích thước container
                const container = videoContainerRef.current;
                const containerWidth = container.offsetWidth || container.clientWidth;
                
                // Kiểm tra nếu video có rotation metadata
                // Browser tự động áp dụng rotation, làm cho videoWidth/videoHeight bị swap
                // Nếu video thực tế là ngang (width > height) nhưng hiển thị dọc, thì bị xoay
                
                // Reset transform trước
                video.style.transform = 'rotate(0deg)';
                video.style.width = '100%';
                video.style.height = 'auto';
                video.style.maxHeight = '600px';
                video.style.transformOrigin = 'center center';
                video.style.objectFit = 'contain';
                
                // Đợi một chút để browser render
                setTimeout(() => {
                  if (videoRef.current) {
                    const actualDisplayWidth = videoRef.current.offsetWidth;
                    const actualDisplayHeight = videoRef.current.offsetHeight;
                    
              
                    if (videoWidth < videoHeight && actualDisplayWidth > actualDisplayHeight && actualDisplayHeight > 0) {
                      videoRef.current.style.transform = 'rotate(-90deg)';
                      const scale = Math.min(containerWidth / videoHeight, 600 / videoWidth);
                      videoRef.current.style.width = `${videoHeight * scale}px`;
                      videoRef.current.style.height = `${videoWidth * scale}px`;
                    }
                  }
                }, 100);
              }
            }
          };
          
          videoRef.current.addEventListener('loadedmetadata', fixRotation);
          videoRef.current.addEventListener('loadeddata', fixRotation);
          videoRef.current.addEventListener('resize', fixRotation);
          
          // Thử autoplay
          const playPromise = videoRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Autoplay prevented, adding user gesture requirement");
              // Nếu autoplay bị chặn, thêm event listener cho user click
              const playOnClick = () => {
                if (videoRef.current) {
                  videoRef.current.play();
                }
                document.removeEventListener('click', playOnClick);
              };
              document.addEventListener('click', playOnClick);
            });
          }
        } catch (error) {
          console.error("Error playing video:", error);
        }
      }
    };

    playVideo();
  }, []);

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
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
                <p className="text-2xl font-bold text-white">
                  GÀ
                </p>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 mt-2">
                BẠN ĐÃ BỊ SCAM!
              </h1>
              <p className="text-4xl md:text-3xl font-bold text-yellow-300 mt-2">
                BẠN CHỈ CÓ RICKROLL THUI!!!
              </p>
            </div>
          </div>
        </div>

        {/* Video Container - Local Video */}
        <div className="mb-8">
          <div 
            ref={videoContainerRef}
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px'
            }}
          >
            
            {/* Local Video Element */}
            <video
              ref={videoRef}
              className="w-full h-auto max-h-150"
              style={{ 
                transform: 'rotate(0deg)',
                transformOrigin: 'center center',
                objectFit: 'contain',
                display: 'block'
              }}
              autoPlay
              muted // Thêm muted để tăng khả năng autoplay
              playsInline
              controls
              loop
              preload="auto"
            >
              <source src="/videos/rickroll.mp4" type="video/mp4" />
              <source src="/videos/rickroll.webm" type="video/webm" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
            
            {/* Overlay instructions nếu autoplay bị chặn */}
            <div id="autoplay-overlay" className="absolute inset-0 bg-black/80 flex-hidden items-center justify-center hidden">
              <div className="text-center p-6 bg-gray-900/90 rounded-xl max-w-md">
                <div className="text-4xl mb-4">▶️</div>
                <p className="text-xl font-bold mb-2">Nhấn vào video để phát!</p>
                <p className="text-gray-300">Trình duyệt yêu cầu tương tác trước khi phát video.</p>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.play();
                      const overlay = document.getElementById('autoplay-overlay');
                      if (overlay) {
                        overlay.style.display = 'none';
                      }
                    }
                  }}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                  Bấm để xem Rickroll
                </button>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-gray-800/80 p-4 rounded-b-2xl border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">🎵 Rick Astley - Never Gonna Give You Up</h3>
                <p className="text-gray-400">Phần thưởng internet huyền thoại (1.5B+ lượt xem)</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={replayVideo}
            className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Phát lại từ đầu</span>
          </button>
          
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 10; // Tua đến 10 giây
              }
            }}
            className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
          >
            <span>⏩</span>
            <span>Tua đến đoạn hay</span>
          </button>
          
          <button
            onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.muted) {
                  videoRef.current.muted = false;
                } else {
                  videoRef.current.muted = true;
                }
              }
            }}
            className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
          >
            <span>🔊</span>
            <span>Bật/Tắt tiếng</span>
          </button>
          
          <Link href="/">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 border border-gray-700">
              <span>←</span>
              <span>Quay lại trang chính</span>
            </button>
          </Link>
        </div>

        {/* Troll Message */}
        <div className="bg-linear-to-r from-red-900/30 to-orange-900/30 p-6 rounded-2xl border border-red-700/50 mb-8">
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

        {/* Audio Fallback Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const video = document.querySelector('video');
              const overlay = document.getElementById('autoplay-overlay');
              
              // Kiểm tra autoplay
              setTimeout(() => {
                if (video && video.paused) {
                  // Nếu video không tự phát, hiển thị overlay
                  if (overlay) overlay.style.display = 'flex';
                }
              }, 1000);
              
              // Khi video bắt đầu phát, ẩn overlay
              video.addEventListener('play', function() {
                if (overlay) overlay.style.display = 'none';
              });
            });
          `
        }} />
      </div>
    </div>
  );
}