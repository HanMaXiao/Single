"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { clearSession } from "@/api/auth";
import { TOKEN_STORAGE_KEY } from "@/api/client";

const services = [
  {
    title: "Agent 应用咨询",
    description: "梳理业务流程、识别可自动化节点，并输出可执行的智能体方案。"
  },
  {
    title: "知识库与检索增强",
    description: "连接企业资料、文档和业务系统，让 AI 回答更可靠、更可追溯。"
  },
  {
    title: "工作流自动化",
    description: "把审批、跟进、通知、数据整理等重复任务交给可控的智能流程。"
  },
  {
    title: "前沿交互原型",
    description: "探索语音、多模态、实时协作与可视化操作界面。"
  }
];

const metrics = [
  ["应用方向", "Agent / RAG / Workflow"],
  ["交付节奏", "快速原型到工程化上线"],
  ["服务目标", "高效、可落地、可扩展"],
  ["接口状态", "FastAPI 服务已接入"]
];

export default function DashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await clearSession();
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    router.replace("/");
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <Link className="brand-row compact" href="/">
          <div className="brand-mark">H</div>
          <div>
            <strong>Hyperspace</strong>
            <span>超空间科技</span>
          </div>
        </Link>

        <button className="text-button" type="button" onClick={handleLogout}>
          退出登录
        </button>
      </header>

      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Hyperspace Control Center</p>
          <h1>AI 智能应用与前沿交互探索平台</h1>
          <p>
            我们提供高效可落地的 Agent 智能体应用服务，帮助企业从单点 AI
            工具升级为可持续迭代的智能应用体系。
          </p>
        </div>
        <div className="mission-panel">
          <span>Mission</span>
          <strong>让 AI 应用真正进入业务现场</strong>
          <p>
            从需求拆解、智能体设计、接口集成到部署运维，围绕结果交付而不是概念展示。
          </p>
        </div>
      </section>

      <section className="metrics-grid" aria-label="项目概览">
        {metrics.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="section-block">
        <div className="section-title">
          <span>Services</span>
          <h2>核心服务能力</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <div className="card-icon">AI</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-band">
        <div>
          <span>01</span>
          <strong>发现</strong>
          <p>明确业务目标、数据来源和可落地边界。</p>
        </div>
        <div>
          <span>02</span>
          <strong>构建</strong>
          <p>设计 Agent 能力、API 接入、交互流程与运行策略。</p>
        </div>
        <div>
          <span>03</span>
          <strong>上线</strong>
          <p>部署、监控、优化，形成持续迭代的智能应用资产。</p>
        </div>
      </section>
    </main>
  );
}
