import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Edit3, Leaf, MapPinned } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const project = {
  id: 538,
  name: '四川峨眉山景区',
  status: '正常',
  scene: 'AI讲解导览',
  operator: '上海虹途奇点文化科技有限公司',
  projectNo: '816280443963019267',
  businessType: '景区',
  operationMode: '独立运营',
  assetUsage: '运营',
  database: '--',
  tags: '--',
  revenueShare: '--',
};

const contractFields: Array<[string, string]> = [
  ['OA项目财务编号', '--'],
  ['合同地址', '--'],
  ['项目上线时间', '--'],
  ['设备方', '上海虹途奇点文化科技有限公司'],
  ['rokid签约方', '灵伴科技（武汉）有限公司'],
  ['内容方', '--'],
  ['财务名称', '--'],
  ['项目负责人', '--'],
  ['项目合同', '--'],
];

const basicFields: Array<[string, string]> = [
  ['项目名称', project.name],
  ['运营方', project.operator],
  ['项目场景', project.scene],
  ['关联ARmaz数据库', project.database],
  ['项目编号', project.projectNo],
  ['运营方式', project.operationMode],
  ['资产用途', project.assetUsage],
  ['业务类型', project.businessType],
  ['营收分级', project.revenueShare],
  ['业务标签及配置', project.tags],
];

const tabs = ['项目详情', '项目配置', '关联资产', '订单管理'];

export function ProjectDetailPage() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          工作台 <span className="mx-2 text-stone-300">/</span>
          <span className="font-semibold text-nature-moss">项目详情</span>
        </div>
        <button
          type="button"
          className="inline-flex h-12 items-center gap-3 rounded-lg bg-nature-moss px-6 text-sm font-black text-white shadow-sm transition duration-200 hover:brightness-110 active:translate-y-px"
        >
          <Bot className="h-6 w-6 text-nature-leaf" />
          前往 内容创作
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <section className="flex items-end gap-4 pb-2">
        <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-lime-200 via-emerald-100 to-sky-100 shadow-sm" />
        <div className="pb-1">
          <h1 className="text-2xl font-black text-nature-moss">{project.name}</h1>
          <div className="mt-3 flex gap-2">
            <span className="rounded-md bg-nature-leaf px-2 py-1 text-xs font-black text-nature-moss">
              {project.status}
            </span>
            <span className="rounded-md bg-sky-100 px-2 py-1 text-xs font-black text-sky-700">
              {project.scene}
            </span>
          </div>
        </div>
      </section>

      <nav className="flex h-12 items-end gap-8 border-b border-stone-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`h-10 border-b-2 px-0 text-sm font-black transition duration-200 ${
              tab === '项目详情'
                ? 'border-nature-leaf text-nature-moss'
                : 'border-transparent text-muted-foreground hover:text-nature-moss'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <DetailSection title="基本信息">
        <InfoGrid fields={basicFields} />
      </DetailSection>

      <DetailSection title="章台与合同">
        <InfoGrid fields={contractFields} />
      </DetailSection>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="border-white/80 bg-white/95">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-black text-nature-moss">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-nature-leaf text-nature-moss">
            <Leaf className="h-3.5 w-3.5" />
          </span>
          {title}
        </CardTitle>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-nature-moss transition duration-200 hover:bg-lime-50"
        >
          <Edit3 className="h-4 w-4" />
          编辑
        </button>
      </CardHeader>
      <CardContent className="min-h-[260px]">{children}</CardContent>
    </Card>
  );
}

function InfoGrid({ fields }: { fields: Array<[string, string]> }) {
  return (
    <div className="grid gap-x-20 gap-y-8 pt-3 md:grid-cols-2 xl:grid-cols-3">
      {fields.map(([label, value]) => (
        <div key={label} className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">{label}</p>
          <p className="text-sm font-bold text-nature-moss">{value}</p>
        </div>
      ))}
    </div>
  );
}

export function ProjectDetailLink() {
  return (
    <NavLink
      to={`/attractions/${project.id}`}
      className="inline-flex h-8 items-center justify-center rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-nature-moss transition duration-200 hover:bg-lime-50"
    >
      <MapPinned className="mr-1.5 h-4 w-4 text-nature-stem" />
      查看详情
    </NavLink>
  );
}
