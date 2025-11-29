'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Chat() {
  const [password, setPassword] = useState('');
  
  // 使用 AI SDK 的钩子
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    body: { password }, // 每次发送请求都带上密码
  });

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Gemini AI 助手</h1>

      {/* 1. 密码输入区 */}
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入访问密码..."
          className="w-full p-2 border border-gray-300 rounded-lg text-center bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      {/* 2. 错误提示 */}
      {error && (
        <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-lg text-center">
          {error.message.includes('401') ? '❌ 密码错误，请重试' : '❌ 网络或服务出错'}
        </div>
      )}

      {/* 3. 聊天记录区 */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 border border-gray-100 rounded-xl shadow-inner bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">输入密码后，在下方开始提问...</div>
        )}
        
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
              m.role === 'user'
                ? 'bg-blue-600 text-white self-end ml-auto'
                : 'bg-white text-gray-800 border border-gray-200 mr-auto'
            }`}
          >
            <div className="font-bold text-xs mb-1 opacity-70">{m.role === 'user' ? '你' : 'Gemini'}</div>
            {m.content}
          </div>
        ))}
        
        {isLoading && <div className="text-gray-400 text-sm animate-pulse ml-2">Gemini 正在思考...</div>}
      </div>

      {/* 4. 输入框和发送按钮 */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={input}
          placeholder="问点什么..."
          onChange={handleInputChange}
          disabled={!password || isLoading} // 没有密码时不让输入
        />
        <button
          type="submit"
          disabled={!password || isLoading || !input}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          发送
        </button>
      </form>
    </div>
  );
}