export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-8 text-center">
      <div className="mb-4">
        <img src="/logo.png" alt="Logo" className="h-10 mx-auto" />
      </div>
      <div className="mb-4 space-x-6">
        <a href="/about" className="hover:text-blue-300 transition">Về chúng tôi</a>
        <a href="/courses" className="hover:text-blue-300 transition">Khóa học</a>
        <a href="/contact" className="hover:text-blue-300 transition">Liên hệ</a>
      </div>
      <div className="mb-4 space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition"
        >Facebook</a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >Instagram</a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >YouTube</a>
      </div>
      <div className="text-xs text-gray-400">
        © {new Date().getFullYear()} Learn English. All rights reserved.
      </div>
    </footer>
  );
}

