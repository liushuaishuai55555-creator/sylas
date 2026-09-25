import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function StartPage() {
  return (
    <main className="start-page">
      <div className="start-page-inner">
        <a className="start-back" href="/"><ArrowLeft size={18} aria-hidden="true" />返回首页</a>
        <div className="start-panel">
          <span className="start-kicker">YOUR CREATOR JOURNEY</span>
          <h1>下一步，开始创作。</h1>
          <p>这里是注册 / 登录流程的页面占位。正式接入时，“开始创作”将进入真实的账号流程。</p>
          <div className="start-options" aria-label="账号入口占位">
            <div><span>01</span><strong>注册新账号</strong><small>为你的创作之旅做好准备</small><ArrowUpRight size={22} aria-hidden="true" /></div>
            <div><span>02</span><strong>登录已有账号</strong><small>继续未完成的创作</small><ArrowUpRight size={22} aria-hidden="true" /></div>
          </div>
          <p className="start-hint">演示页面 · 暂未连接真实账号系统</p>
        </div>
      </div>
    </main>
  );
}
