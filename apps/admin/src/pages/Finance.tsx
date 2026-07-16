import {
	ClipboardPlus,
	FilePlus2,
	FileWarning,
	type LucideIcon,
	Plus,
	Settings2,
	Truck,
	Wrench,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const deviceFlows = [
	{
		title: "设备新增",
		description: "新设备的入库登记与信息录入，以及设备的信息更新",
		icon: ClipboardPlus,
		color: "from-lime-300 to-lime-500",
		primaryAction: "新增设备",
	},
	{
		title: "设备售后",
		description: "资产在故障和丢失场景下的售后处理跟踪",
		icon: Wrench,
		color: "from-cyan-300 to-sky-500",
		primaryAction: "新增售后",
	},
	{
		title: "设备调拨",
		description: "设备在项目间的转移与分配",
		icon: Truck,
		color: "from-violet-300 to-indigo-500",
		primaryAction: "新增调拨",
	},
];

const assetFlows = [
	{
		title: "资产增补",
		description: "运营耗材和固定资产的新增长入",
		icon: FilePlus2,
		color: "from-yellow-300 to-amber-500",
		primaryAction: "新增增补",
	},
	{
		title: "资产报废/丢失",
		description: "运营耗材和固定资产处理报废/丢失的申请与审批",
		icon: FileWarning,
		color: "from-orange-300 to-orange-500",
		primaryAction: "新增报废/丢失",
	},
];

export function FinancePage() {
	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div className="text-sm font-black text-nature-moss">资产运营</div>
				<button
					type="button"
					className="h-9 rounded-md bg-nature-moss px-5 text-sm font-black text-white transition duration-200 hover:brightness-110 active:translate-y-px"
				>
					获取设备SN
				</button>
			</div>

			<Card className="min-h-[calc(100vh-96px)] border-white/80 bg-white/95">
				<CardContent className="p-6">
					<section>
						<h1 className="mb-5 text-xl font-black text-nature-moss">设备流程</h1>
						<div className="grid gap-5 xl:grid-cols-3">
							{deviceFlows.map((flow) => (
								<FlowCard key={flow.title} {...flow} />
							))}
						</div>
					</section>

					<section className="mt-8">
						<h2 className="mb-5 text-xl font-black text-nature-moss">资产流程</h2>
						<div className="grid gap-5 xl:grid-cols-3">
							{assetFlows.map((flow) => (
								<FlowCard key={flow.title} {...flow} />
							))}
						</div>
					</section>
				</CardContent>
			</Card>
		</div>
	);
}

function FlowCard({
	title,
	description,
	icon: Icon,
	color,
	primaryAction,
}: {
	title: string;
	description: string;
	icon: LucideIcon;
	color: string;
	primaryAction: string;
}) {
	return (
		<div className="overflow-hidden rounded-lg border border-stone-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
			<div className="flex items-center gap-5 p-5">
				<div
					className={`flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-white shadow-sm`}
				>
					<Icon className="h-8 w-8" />
				</div>
				<div>
					<h3 className="text-base font-black text-nature-moss">{title}</h3>
					<p className="mt-2 text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 border-t border-stone-100">
				<button
					type="button"
					className="inline-flex h-11 items-center justify-center gap-2 border-r border-stone-100 text-sm font-black text-muted-foreground transition duration-200 hover:bg-lime-50 hover:text-nature-moss"
				>
					<Plus className="h-4 w-4" />
					{primaryAction}
				</button>
				<button
					type="button"
					className="inline-flex h-11 items-center justify-center gap-2 text-sm font-black text-nature-moss transition duration-200 hover:bg-lime-50"
				>
					<Settings2 className="h-4 w-4" />
					查看全部
				</button>
			</div>
		</div>
	);
}
