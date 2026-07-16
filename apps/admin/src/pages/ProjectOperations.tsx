import { Card, CardContent } from '@/components/ui/card';
import { Banknote, ClipboardList, Gem, PackageOpen, ShieldAlert } from 'lucide-react';

const incomeStats = [
  { label: '当日收入', value: '¥0.00', icon: Gem, tone: 'bg-lime-50 text-nature-leaf' },
  { label: '订单金额', value: '¥0.00', icon: ClipboardList, tone: 'bg-sky-50 text-blue-500' },
  { label: '退款金额', value: '¥0.00', icon: Banknote, tone: 'bg-amber-50 text-amber-500' },
  { label: '赔偿金额', value: '¥0.00', icon: ShieldAlert, tone: 'bg-rose-50 text-rose-500' },
];

const productStats: Array<[string, string, string]> = [
  ['结算商品', '0个', 'bg-nature-leaf'],
  ['下单商品', '0个', 'bg-slate-500'],
  ['体验中商品', '0个', 'bg-blue-500'],
  ['退款商品', '0个', 'bg-amber-500'],
  ['免单商品', '0个', 'bg-slate-300'],
];

const orderBars: Array<[string, string]> = [
  ['完结订单', 'bg-nature-leaf'],
  ['已支付订单', 'bg-nature-moss'],
  ['未支付订单', 'bg-slate-500'],
  ['已取消订单', 'bg-slate-300'],
  ['已完成订单', 'bg-nature-moss'],
  ['体验中订单', 'bg-slate-500'],
  ['待服务订单', 'bg-slate-300'],
  ['退款订单', 'bg-red-400'],
];

export function ProjectOperationsPage() {
  return (
    <div className="space-y-3">
      <div className="text-sm font-black text-nature-moss">项目运营统计</div>
      <div className="flex h-10 items-end gap-8 border-b border-stone-200">
        {['运营总览', '运营统计'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`h-10 border-b-2 text-sm font-black transition duration-200 ${
              tab === '运营总览'
                ? 'border-nature-leaf text-nature-moss'
                : 'border-transparent text-muted-foreground hover:text-nature-moss'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card className="border-white/80 bg-white/95">
        <CardContent className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-xl font-black text-nature-moss">运营快照</h1>
            <select className="h-9 w-56 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-nature-moss">
              <option>全部项目</option>
            </select>
          </div>

          <section>
            <h2 className="mb-5 text-base font-black text-nature-moss">营收情况</h2>
            <div className="grid gap-6 lg:grid-cols-4">
              {incomeStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-lg ${stat.tone}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-3xl font-medium text-black">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 grid gap-3 xl:grid-cols-[0.7fr_1fr]">
            <section className="rounded-lg border border-stone-200 bg-white p-5">
              <h2 className="mb-8 text-base font-black text-nature-moss">商品数据</h2>
              <div className="grid min-h-[270px] grid-cols-[1fr_0.95fr] items-center gap-8">
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                  <PackageOpen className="mb-3 h-14 w-14 text-stone-200" />
                  <span className="text-sm">暂无数据</span>
                </div>
                <div className="space-y-0">
                  {productStats.map(([label, value, color]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-stone-100 py-4 last:border-b-0"
                    >
                      <span className="flex items-center gap-3 text-sm text-muted-foreground">
                        <i className={`h-3 w-3 rounded-full ${color}`} />
                        {label}：
                      </span>
                      <span className="text-2xl font-medium text-black">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-stone-200 bg-white p-5">
              <div className="mb-20 flex items-center justify-between">
                <h2 className="text-base font-black text-nature-moss">订单数据</h2>
                <span className="text-xs text-muted-foreground">数据来源：2026年07月13日</span>
              </div>
              <div className="grid grid-cols-4 gap-x-5 gap-y-8 xl:grid-cols-8">
                {orderBars.map(([label, color]) => (
                  <div key={label} className="text-center">
                    <p className="mb-2 text-sm font-semibold text-muted-foreground">0</p>
                    <div className={`mx-auto h-3 w-24 rounded-full ${color}`} />
                    <p className="mt-2 text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/80 bg-white/95">
        <CardContent className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-nature-moss">历史数据</h2>
            <div className="flex gap-3">
              <select className="h-9 w-56 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-nature-moss">
                <option>全部项目</option>
              </select>
              <div className="h-9 rounded-md border border-stone-200 bg-white px-4 leading-9 text-sm text-muted-foreground">
                2025-07-13 → 2026-07-12
              </div>
            </div>
          </div>
          <div className="mb-5 inline-flex rounded-lg bg-stone-100 p-1">
            {['财务', '资产', '运营'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`rounded-md px-4 py-2 text-sm font-black ${
                  tab === '财务' ? 'bg-white text-nature-moss shadow-sm' : 'text-muted-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="min-h-[180px] rounded-lg border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-nature-moss">财务</h3>
              <select className="h-9 rounded-md border border-stone-200 bg-white px-3 text-sm text-nature-moss">
                <option>收入</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
