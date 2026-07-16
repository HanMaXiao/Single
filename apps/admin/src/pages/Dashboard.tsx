import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  BatteryCharging,
  Boxes,
  CalendarCheck,
  Gem,
  Grid2X2,
  Layers3,
  Leaf,
  List,
  type LucideIcon,
  PackagePlus,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_296px]">
      <div className="space-y-3">
        <section className="relative overflow-hidden rounded-lg border border-white/80 bg-gradient-to-r from-sky-50 via-emerald-50 to-lime-50 px-6 py-4">
          <div className="relative z-10">
            <p className="mb-2 flex items-center gap-2 text-sm font-medium text-nature-stem">
              <Sparkles className="h-4 w-4 text-lime-500" />
              欢迎登录森游星球
            </p>
            <h2 className="text-2xl font-black text-nature-moss">文旅 AI 眼镜运营台已就绪</h2>
          </div>
          <div className="absolute right-8 top-2 h-20 w-28 rotate-[-8deg] rounded-lg border border-white/70 bg-white/45 shadow-sm" />
          <Leaf className="absolute right-20 top-8 h-12 w-12 text-lime-300/70" />
        </section>

        <Card className="leaf-glow border-white/80 bg-white/95">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-black text-nature-moss">设备统计</CardTitle>
            <div className="flex items-center gap-2">
              <select className="h-8 rounded-lg border border-stone-100 bg-white px-3 text-xs font-medium text-nature-moss shadow-sm">
                <option>全部项目</option>
              </select>
              <div className="rounded-lg bg-stone-100 p-1">
                <button
                  type="button"
                  className="rounded-md bg-white px-3 py-1.5 text-xs font-bold text-nature-moss shadow-sm"
                >
                  设备状态
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  流转状态
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              <DeviceMetric
                icon={BatteryCharging}
                label="设备总数"
                value="2"
                accent="text-sky-700"
              />
              <DeviceMetric label="正常" value="2" tone="leaf" />
              <DeviceMetric label="异常" value="0" tone="orange" />
              <DeviceMetric label="已损坏" value="0" />
              <DeviceMetric label="已丢失" value="0" />
              <DeviceMetric label="已报废" value="0" />
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[460px] border-white/80 bg-white/95">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-black text-nature-moss">我的项目</CardTitle>
            <div className="flex rounded-lg bg-stone-100 p-1">
              <button type="button" className="rounded-md bg-white p-2 text-nature-moss shadow-sm">
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button type="button" className="p-2 text-muted-foreground">
                <List className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex gap-3">
                <div className="h-16 w-20 rounded-lg bg-gradient-to-br from-lime-200 via-emerald-100 to-sky-100" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-black text-nature-moss">四川峨眉山景区</h3>
                    <span className="rounded-md bg-nature-leaf px-2 py-0.5 text-[11px] font-black text-nature-moss">
                      正常
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">AI 导览眼镜租借与内容运营</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 divide-x divide-stone-100 text-center">
                <ProjectStat label="今日收入" value="¥0" />
                <ProjectStat label="今日订单" value="0" />
                <ProjectStat label="下单商品" value="0" />
                <ProjectStat label="订单金额" value="¥0" />
              </div>
            </div>
            <div className="mt-64 flex justify-end gap-4 text-sm text-muted-foreground">
              <span>共 1 条</span>
              <span className="rounded-md border border-stone-200 px-3 py-1 font-bold text-nature-moss">
                1
              </span>
              <span>20 条/页</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-3">
        <Card className="border-white/80 bg-white/95">
          <CardHeader>
            <CardTitle className="text-lg font-black text-nature-moss">快捷入口</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <QuickGroup
              title="管理入口"
              items={[
                { label: '新建项目', icon: PackagePlus },
                { label: '订单管理', icon: ReceiptText },
                { label: '设备资产', icon: Boxes },
              ]}
            />
            <QuickGroup title="应用入口" items={[{ label: '内容中心', icon: Gem }]} />
            <QuickGroup
              title="最近访问"
              items={[
                { label: '项目运营统计', icon: BarChart3 },
                { label: '资产运营', icon: ShieldCheck },
                { label: '内容资产', icon: Layers3 },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="min-h-[260px] border-white/80 bg-white/95">
          <CardHeader>
            <CardTitle className="text-lg font-black text-nature-moss">待办事项</CardTitle>
          </CardHeader>
          <CardContent className="flex min-h-[170px] flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-lime-50 text-lime-500">
              <CalendarCheck className="h-7 w-7" />
            </div>
            <p className="text-sm font-semibold text-nature-moss">暂无待办</p>
            <p className="mt-1 text-xs text-muted-foreground">
              新的核销、退款与设备异常会出现在这里
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function DeviceMetric({
  icon: Icon,
  label,
  value,
  accent = 'text-slate-600',
  tone,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  accent?: string;
  tone?: 'leaf' | 'orange';
}) {
  const ringClass =
    tone === 'leaf'
      ? 'border-nature-leaf text-nature-stem'
      : tone === 'orange'
        ? 'border-orange-100 text-orange-500'
        : 'border-stone-100 text-muted-foreground';

  return (
    <div className="flex items-center gap-3 border-r border-stone-100 last:border-r-0">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border-4 bg-white ${ringClass}`}
      >
        {Icon ? <Icon className="h-5 w-5" /> : <span className="text-xs font-black">{label}</span>}
      </div>
      <span className={`text-3xl font-black ${tone === 'leaf' ? 'text-lime-500' : accent}`}>
        {value}
      </span>
    </div>
  );
}

function ProjectStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-black text-nature-moss">{value}</p>
    </div>
  );
}

function QuickGroup({
  title,
  items,
}: {
  title: string;
  items: { label: string; icon: LucideIcon }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-black text-nature-moss">{title}</h3>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <button
            type="button"
            key={item.label}
            className="group flex min-h-20 flex-col items-center justify-start gap-2 rounded-lg p-2 text-center transition duration-200 hover:bg-lime-50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-nature-leaf transition duration-200 group-hover:-translate-y-0.5 group-hover:border-nature-leaf group-hover:brightness-105">
              <item.icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold leading-tight text-nature-moss">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
