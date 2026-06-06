"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { login, register } from "@/api/auth";
import { getCurrentUser } from "@/api/user";
import { TOKEN_STORAGE_KEY } from "@/api/client";
import { getHttpErrorMessage } from "@/types/http";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [message, setMessage] = useState("使用内置账号 admin / admin123 登录体验控制台");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ username, password });
      window.localStorage.setItem(TOKEN_STORAGE_KEY, response.data.access_token);
      await getCurrentUser();
      setMessage("登录成功，正在进入 Hyperspace 控制台");
      router.push("/dashboard");
    } catch (error) {
      setMessage(getHttpErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister() {
    setIsLoading(true);

    try {
      const response = await register({ username, password });
      setMessage(`账号已创建：${response.data.username}`);
    } catch (error) {
      setMessage(getHttpErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-hero">
        <nav className="brand-row" aria-label="Hyperspace">
          <div className="brand-mark">H</div>
          <div>
            <strong>Hyperspace</strong>
            <span>超空间科技</span>
          </div>
        </nav>

        <div className="hero-copy">
          <p className="eyebrow">AI Agent Application Studio</p>
          <h1>面向真实业务的 AI 智能体应用服务</h1>
          <p>
            超空间科技专注 AI 智能应用与前沿交互探索，帮助团队把 Agent
            能力落地到客服、运营、知识管理、流程自动化和企业内部工具中。
          </p>
        </div>

        <div className="signal-grid" aria-label="核心能力">
          <div>
            <span>01</span>
            <strong>智能体编排</strong>
            <p>多工具调用、上下文记忆、任务规划与人机协作闭环。</p>
          </div>
          <div>
            <span>02</span>
            <strong>前沿交互</strong>
            <p>面向业务场景设计自然、快速、可解释的操作体验。</p>
          </div>
          <div>
            <span>03</span>
            <strong>工程交付</strong>
            <p>从原型验证到可部署系统，兼顾效率、稳定性和扩展性。</p>
          </div>
        </div>
      </section>

      <section className="login-panel" aria-label="登录">
        <div className="panel-heading">
          <span className="status-dot" />
          <p>Workspace Access</p>
          <h2>进入控制台</h2>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <label>
            用户名
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </label>

          <label>
            密码
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </label>

          <button className="primary-button" disabled={isLoading} type="submit">
            {isLoading ? "处理中..." : "登录 Hyperspace"}
          </button>

          <button
            className="secondary-button"
            disabled={isLoading}
            type="button"
            onClick={handleRegister}
          >
            创建当前账号
          </button>
        </form>

        <div className="message-box">
          <span>状态</span>
          <p>{message}</p>
        </div>
      </section>
    </main>
  );
}
