// app/page.jsx
"use client";

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon phần thưởng */}
        <div className="text-8xl mb-6 animate-bounce">🎁</div>
        
        {/* Tiêu đề */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          CHÚC MỪNG BẠN!
        </h1>
        
        {/* Thông báo */}
        <p className="text-xl text-white mb-8">
          Bạn đã trúng thưởng đặc biệt!
        </p>
        
        {/* Nút nhận thưởng */}
        <Link href="/nhanthuong">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-2xl py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
            NHẬN THƯỞNG NGAY
          </button>
        </Link>
        
        {/* Chú thích nhỏ */}
        <p className="mt-4 text-sm text-white/80">
          * Nhấn vào nút để nhận phần thưởng
        </p>
      </div>
    </div>
  );
}