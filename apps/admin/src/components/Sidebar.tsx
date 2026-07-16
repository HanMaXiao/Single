import { cn } from '@/lib/utils';
import {
  BarChart3,
  Cpu,
  FileText,
  Layers3,
  LayoutDashboard,
  LineChart,
  Map as MapIcon,
  PanelLeftClose,
  Settings as SettingsIcon,
  ShoppingCart,
  Sprout,
  Wallet,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const navGroups = [
  {
    label: '工作区',
    items: [{ to: '/dashboard', icon: LayoutDashboard, label: '工作台' }],
  },
  {
    label: '项目管理',
    items: [
      { to: '/attractions', icon: MapIcon, label: '全部项目' },
      { to: '/orders', icon: ShoppingCart, label: '订单管理' },
    ],
  },
  {
    label: '资产管理',
    items: [
      { to: '/devices', icon: Cpu, label: '设备资产' },
      { to: '/content', icon: FileText, label: '内容资产' },
      { to: '/finance', icon: Wallet, label: '资产运营' },
    ],
  },
  {
    label: '数据看板',
    items: [
      { to: '/project-operations', icon: BarChart3, label: '项目运营统计' },
      { to: '/asset-stats', icon: LineChart, label: '资产统计' },
    ],
  },
  {
    label: '运营配置',
    items: [{ to: '/settings', icon: SettingsIcon, label: '商品与营销' }],
  },
] as const;

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="leaf-glow hidden w-[172px] shrink-0 rounded-lg border border-white/80 bg-white/95 p-3 md:flex md:flex-col">
      <div className="mb-5 flex h-10 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-nature-moss text-nature-leaf">
            <Sprout className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-black leading-none text-nature-moss">森游星球</p>
            <p className="mt-1 text-[10px] font-medium text-muted-foreground">AI Guide</p>
          </div>
        </div>
        <Layers3 className="h-4 w-4 text-muted-foreground" />
      </div>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <div className="px-2 pb-1 text-[11px] font-medium text-stone-400">{group.label}</div>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'group relative flex h-10 items-center gap-2 overflow-hidden rounded-lg px-3 text-sm font-semibold transition duration-200',
                    isActive
                      ? 'bg-[#151a15] text-white shadow-sm'
                      : 'text-nature-moss hover:bg-lime-50 hover:text-black'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-[#b7ec4f]/25" />
                    )}
                    <item.icon
                      className={cn(
                        'relative h-4 w-4 transition duration-200',
                        isActive ? 'text-[#b7ec4f]' : 'text-nature-moss group-hover:text-lime-600'
                      )}
                    />
                    <span className="relative">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-stone-100 pt-3">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-xs font-medium text-muted-foreground transition duration-200 hover:bg-lime-50 hover:text-nature-moss"
        >
          <span>{t('admin.title')}</span>
          <PanelLeftClose className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
