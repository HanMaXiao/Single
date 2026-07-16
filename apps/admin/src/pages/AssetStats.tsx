import { BatteryCharging, ChevronDown, Copy, Download, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
	{ label: "设备总数", value: "2", icon: BatteryCharging, tone: "text-sky-700" },
	{ label: "正常", value: "2", tone: "text-lime-500", ring: "border-nature-leaf" },
	{ label: "异常", value: "0", tone: "text-orange-500" },
	{ label: "已损坏", value: "0", tone: "text-slate-600" },
	{ label: "已丢失", value: "0", tone: "text-slate-600" },
	{ label: "已报废", value: "0", tone: "text-slate-600" },
];

const statusLegend: Array<[string, string]> = [
	["正常", "bg-blue-500"],
	["异常", "bg-red-400"],
	["已报废", "bg-slate-500"],
	["已丢失", "bg-slate-300"],
	["已损坏", "bg-red-700"],
];

const flowLegend: Array<[string, string]> = [
	["未流转", "bg-orange-300"],
	["调拨中", "bg-violet-400"],
	["售后中", "bg-pink-400"],
	["借用中", "bg-indigo-400"],
	["盘点中", "bg-teal-500"],
];

export function AssetStatsPage() {
	return (
		<div className="space-y-3">
			<div className="text-sm font-black text-nature-moss">资产统计</div>
			<div className="flex h-10 items-end gap-8 border-b border-stone-200">
				{["数据总览", "设备投放", "设备统计", "售后统计"].map((tab) => (
					<button
						key={tab}
						type="button"
						className={`h-10 border-b-2 text-sm font-black transition duration-200 ${
							tab === "数据总览"
								? "border-nature-leaf text-nature-moss"
								: "border-transparent text-muted-foreground hover:text-nature-moss"
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			<Card className="min-h-[calc(100vh-132px)] border-white/80 bg-white/95">
				<CardContent className="grid min-h-[720px] p-0 md:grid-cols-[200px_minmax(0,1fr)]">
					<aside className="border-r border-stone-200 bg-stone-50/80">
						<button
							type="button"
							className="relative flex h-14 w-full items-center bg-stone-100 px-5 text-left text-sm font-black text-nature-moss after:absolute after:-right-2 after:top-1/2 after:h-4 after:w-4 after:-translate-y-1/2 after:rotate-45 after:bg-stone-100"
						>
							设备总览
						</button>
					</aside>

					<div className="p-5">
						<h1 className="mb-5 text-xl font-black text-nature-moss">设备总览</h1>
						<div className="mb-6 flex flex-wrap items-center gap-3 border-b border-stone-200 pb-5">
							<select className="h-9 w-full max-w-xs rounded-md border border-stone-200 bg-white px-3 text-sm text-muted-foreground outline-none focus:border-nature-leaf">
								<option>全部项目</option>
							</select>
							<select className="h-9 w-full max-w-xs rounded-md border border-stone-200 bg-white px-3 text-sm text-muted-foreground outline-none focus:border-nature-leaf">
								<option>请选择设备状态</option>
							</select>
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

						<section className="rounded-lg border border-stone-200 bg-white p-5">
							<div className="mb-8 flex items-center justify-between">
								<h2 className="text-lg font-black text-nature-moss">
									核心指标
									<span className="ml-2 text-xs font-medium text-muted-foreground">
										统计数据为实时数据
									</span>
								</h2>
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
										设备流转状态
									</button>
								</div>
							</div>
							<div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
								{metrics.map((metric) => (
									<Metric key={metric.label} {...metric} />
								))}
							</div>
						</section>

						<section className="mt-4 rounded-lg border border-stone-200 bg-white p-5">
							<div className="mb-8 flex items-center justify-between">
								<h2 className="text-lg font-black text-nature-moss">按设备类别统计</h2>
								<div className="flex gap-2">
									<IconButton icon={Copy} />
									<IconButton icon={Download} />
								</div>
							</div>

							<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
								<Legend items={statusLegend} />
								<Legend items={flowLegend} />
							</div>

							<div className="grid min-h-[420px] gap-8 md:grid-cols-2">
								<BarPanel label="Glasses" color="bg-blue-500" />
								<BarPanel label="Glasses" color="bg-orange-300" />
							</div>
						</section>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function Metric({
	label,
	value,
	icon: Icon,
	tone,
	ring = "border-stone-100",
}: {
	label: string;
	value: string;
	icon?: LucideIcon;
	tone: string;
	ring?: string;
}) {
	return (
		<div className="flex items-center gap-3 border-r border-stone-100 last:border-r-0">
			<div
				className={`flex h-12 w-12 items-center justify-center rounded-full border-4 bg-white ${ring}`}
			>
				{Icon ? (
					<Icon className="h-5 w-5 text-slate-400" />
				) : (
					<span className="text-xs text-muted-foreground">{label}</span>
				)}
			</div>
			<span className={`text-3xl font-black ${tone}`}>{value}</span>
		</div>
	);
}

function Legend({ items }: { items: Array<[string, string]> }) {
	return (
		<div className="flex flex-wrap gap-4">
			{items.map(([label, color]) => (
				<span
					key={label}
					className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"
				>
					<i className={`h-3.5 w-3.5 rounded-full ${color}`} />
					{label}
				</span>
			))}
		</div>
	);
}

function BarPanel({ label, color }: { label: string; color: string }) {
	return (
		<div className="flex items-end justify-center gap-3 border-l border-dashed border-stone-100 pb-8">
			<span className="mb-3 text-xs text-muted-foreground">{label}</span>
			<div className={`h-64 w-3/4 rounded-t-sm ${color}`} />
		</div>
	);
}

function IconButton({ icon: Icon }: { icon: LucideIcon }) {
	return (
		<button
			type="button"
			className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 bg-white text-nature-moss transition duration-200 hover:bg-lime-50"
		>
			<Icon className="h-4 w-4" />
		</button>
	);
}
