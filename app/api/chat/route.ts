import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// 设置为 Edge 运行环境，速度更快且免费额度支持好
export const runtime = 'edge';

export async function POST(req: Request) {
  // 1. 获取前端发来的消息和密码
  const { messages, password } = await req.json();

  // 2. 验证密码 (这个 SITE_PASSWORD 稍后在 Vercel 网页上设置)
  if (password !== process.env.SITE_PASSWORD) {
    return new Response('密码错误，请联系管理员', { status: 401 });
  }

  // 3. 调用 Google Gemini 模型 (使用 gemini-1.5-flash，速度快且免费)
  const result = await streamText({
    model: google('gemini-1.5-flash'),
    messages,
  });

  // 4. 返回流式数据
  return result.toDataStreamResponse();
}