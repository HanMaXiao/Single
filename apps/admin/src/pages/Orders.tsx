import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Download, type LucideIcon, Search, Upload } from 'lucide-react';

const tabs = ['租赁订单', '门票订单', '卡券订单', '退款列表', '自助柜', '外部订单'];

const orders = [
  {
    id: '572502',
    no: 'OAR823767280885303221',
    status: '已完成',
    phone: '13318061982',
    count: 1,
    duration: '112分钟',
    sku: '测试',
    devices: ['1906092624106351', '1906092624105972'],
    operation: ['待归还0套', '完好归还2套', '损坏0套', '丢失0套'],
    source: '人工',
    project: '四川峨眉山景区',
    time: '2026-07-13 15:00:52',
    actions: ['前往详情', '添加备注'],
  },
  {
    id: '572500',
    no: 'OAR823767063813294003',
    status: '已取消',
    phone: '13318061982',
    count: 1,
    duration: '-',
    sku: '测试',
    devices: ['-'],
    operation: ['-'],
    source: '人工',
    project: '四川峨眉山景区',
    time: '2026-07-13 15:00:00',
    actions: ['前往详情', '添加备注'],
  },
  {
    id: '566396',
    no: 'OAR821682661847337377',
    status: '已完成',
    phone: '18344566244',
    count: 1,
    duration: '7922分钟',
    sku: '测试',
    devices: ['1906092624106351'],
    operation: ['待归还0套', '完好归还1套', '损坏0套', '丢失0套'],
    source: '人工',
    project: '四川峨眉山景区',
    time: '2026-07-10 20:57:20',
    actions: ['前往详情', '退款', '添加备注'],
  },
];

export function OrdersPage() {
  return (
    <div className="space-y-3">
      <div className="text-sm font-black text-nature-moss">订单管理</div>
      <div className="flex h-10 items-end gap-8 border-b border-stone-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`h-10 border-b-2 text-sm font-black transition duration-200 ${
              tab === '租赁订单'
                ? 'border-nature-leaf text-nature-moss'
                : 'border-transparent text-muted-foreground hover:text-nature-moss'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card className="min-h-[calc(100vh-132px)] border-white/80 bg-white/95">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-black text-nature-moss">租赁订单</h1>
            <button
              type="button"
              className="h-9 rounded-md bg-nature-moss px-5 text-sm font-black text-white transition duration-200 hover:brightness-110 active:translate-y-px"
            >
              闭馆检查
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-b border-stone-200 pb-5">
            <select className="h-9 w-full max-w-xs rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-nature-moss outline-none focus:border-nature-leaf">
              <option>全部项目</option>
            </select>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-300" />
              <input
                className="h-9 w-full rounded-md border border-stone-200 bg-white pl-9 pr-3 text-sm outline-none transition duration-200 placeholder:text-stone-300 focus:border-nature-leaf focus:ring-2 focus:ring-nature-leaf/20"
                placeholder="请输入订单编号或手机号"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 border-l border-stone-200 pl-4 text-sm font-black text-nature-moss"
            >
              <ChevronDown className="h-4 w-4" />
              展开更多筛选
            </button>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                className="h-9 rounded-md bg-nature-moss px-5 text-sm font-black text-white transition duration-200 hover:brightness-110 active:translate-y-px"
              >
                查询
              </button>
              <button
                type="button"
                className="h-9 rounded-md border border-stone-200 bg-white px-5 text-sm font-bold text-nature-moss transition duration-200 hover:bg-lime-50"
              >
                重置
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 py-5">
            <ActionButton icon={Upload} label="归还设备" active />
            <ActionButton label="分发卡券" />
            <ActionButton label="核销卡券" />
            <ActionButton icon={Download} label="导出订单" />
            <div className="ml-auto rounded-lg bg-stone-100 p-1">
              <button
                type="button"
                className="rounded-md bg-white px-3 py-1.5 text-xs font-black text-nature-moss shadow-sm"
              >
                全部订单
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                高风险<span className="text-red-500">(0)</span>
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                低风险<span className="text-orange-500">(0)</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-stone-200">
            <table className="min-w-[1500px] w-full border-collapse text-left text-sm">
              <thead className="bg-stone-50 text-nature-moss">
                <tr>
                  {[
                    '订单ID',
                    '订单编号',
                    '订单状态',
                    '联系方式',
                    '商品数量',
                    '订单时长',
                    'SKU名称',
                    '关联设备',
                    '设备运营状态',
                    '订单来源',
                    '项目',
                    '下单时间',
                    '操作',
                  ].map((head) => (
                    <th key={head} className="border-b border-stone-100 px-4 py-4 font-black">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-stone-100 transition duration-200 hover:bg-lime-50/50"
                  >
                    <td className="px-4 py-6 text-nature-moss">{order.id}</td>
                    <td className="px-4 py-6 font-semibold text-nature-moss">{order.no}</td>
                    <td className="px-4 py-6">
                      <OrderStatus status={order.status} />
                    </td>
                    <td className="px-4 py-6">{order.phone}</td>
                    <td className="px-4 py-6">{order.count}</td>
                    <td className="px-4 py-6">{order.duration}</td>
                    <td className="px-4 py-6 font-semibold">{order.sku}</td>
                    <td className="px-4 py-6">
                      {order.devices.map((device) => (
                        <p key={device}>{device}</p>
                      ))}
                    </td>
                    <td className="px-4 py-6">
                      {order.operation.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </td>
                    <td className="px-4 py-6">{order.source}</td>
                    <td className="px-4 py-6 font-semibold">{order.project}</td>
                    <td className="px-4 py-6">{order.time}</td>
                    <td className="px-4 py-6">
                      <div className="flex flex-wrap gap-2">
                        {order.actions.map((action) => (
                          <button
                            type="button"
                            key={action}
                            className="h-8 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-nature-moss transition duration-200 hover:bg-lime-50"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-end gap-4 text-sm text-muted-foreground">
            <span>共3条</span>
            <span className="text-stone-300">‹</span>
            <span className="rounded-md border border-stone-300 px-3 py-1 font-black text-nature-moss">
              1
            </span>
            <span className="text-stone-300">›</span>
            <select className="h-9 rounded-md border border-stone-200 bg-white px-3 text-sm text-nature-moss">
              <option>30 条/页</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  active = false,
}: {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex h-9 items-center gap-2 rounded-md px-4 text-sm font-black transition duration-200 active:translate-y-px ${
        active
          ? 'bg-nature-moss text-white hover:brightness-110'
          : 'border border-stone-200 bg-white text-nature-moss hover:bg-lime-50'
      }`}
    >
      {Icon && <Icon className={`h-4 w-4 ${active ? 'text-nature-leaf' : 'text-nature-stem'}`} />}
      {label}
    </button>
  );
}

function OrderStatus({ status }: { status: string }) {
  const done = status === '已完成';
  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-xs font-black ${
        done
          ? 'border-lime-200 bg-lime-50 text-lime-600'
          : 'border-stone-200 bg-stone-100 text-muted-foreground'
      }`}
    >
      {status}
    </span>
  );
}
