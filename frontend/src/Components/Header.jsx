import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getApiBaseUrl } from "../api/config.js";

function getAvatarUrl(avatar) {
  if (!avatar) return null;
  if (avatar.startsWith('http') || avatar.startsWith('https')) return avatar;
  return `${getApiBaseUrl()}${avatar}`;
}

function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-9 w-9 object-contain" />
          <a href="/" className="font-bold text-xl text-blue-600 tracking-wide">MY ENGLISH</a>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Trang chủ</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Chủ đề</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Từ vựng</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Luyện phát âm</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Liên hệ</a>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={getAvatarUrl(user.avatar)}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {user.full_name?.first?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {user.full_name?.first} {user.full_name?.last}
              </span>
              <button onClick={logout} className="px-3 py-1 rounded-full border text-gray-700 hover:bg-gray-100">Đăng xuất</button>
            </div>
          ) : (
            <>
              <Link to="/login"  className="px-4 py-1 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
