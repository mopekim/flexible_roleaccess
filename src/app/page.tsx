"use client";

import { useState, useEffect } from "react";

// 預設帳密
const DEFAULT_CREDENTIALS = {
  username: "admin",
  password: "password123",
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [useDefaultCredentials, setUseDefaultCredentials] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 當勾選預設帳密時自動填入
  useEffect(() => {
    if (useDefaultCredentials) {
      setUsername(DEFAULT_CREDENTIALS.username);
      setPassword(DEFAULT_CREDENTIALS.password);
    } else {
      setUsername("");
      setPassword("");
    }
  }, [useDefaultCredentials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setMessage(data.message);
      setIsSuccess(data.success);
    } catch {
      setMessage("連線錯誤，請稍後再試");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* 登入表單 */}
      <div className="relative w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* 標題 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">歡迎回來</h1>
            <p className="text-gray-300">請輸入您的帳號密碼登入</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 帳號欄位 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                帳號
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="請輸入帳號"
                required
              />
            </div>

            {/* 密碼欄位 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                密碼
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="請輸入密碼"
                required
              />

              {/* 預設帳密 Checkbox - 密碼欄位右下方 */}
              <div className="flex justify-end mt-2">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    id="defaultCredentials"
                    checked={useDefaultCredentials}
                    onChange={(e) => setUseDefaultCredentials(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                    預設帳密
                  </span>
                </label>
              </div>
            </div>

            {/* 登入按鈕 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  登入中...
                </span>
              ) : (
                "登入"
              )}
            </button>
          </form>

          {/* 訊息顯示 */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-medium ${isSuccess
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* 底部文字 */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Flexible Role Access System
        </p>
      </div>
    </div>
  );
}
