import { ChevronDown, Download, MoreVertical, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tabs = ["设备", "运营耗材", "固定资产"];

const devices = [
	{
		id: "16304296936146375",
		sn: "1906092624105972",
		status: "正常",
		flowStatus: "未流转",
		name: "Glass3",
		category: "Glasses",
		type: "常设",
		property: "主机",
		deliveryDate: "2026-07-02",
		currentProject: "四川峨眉山景区",
		initialProject: "四川峨眉山景区",
	},
	{
		id: "16304296936146376",
		sn: "1906092624106351",
		status: "正常",
		flowStatus: "未流转",
		name: "Glass3",
		category: "Glasses",
		type: "常设",
		property: "主机",
		deliveryDate: "2026-07-02",
		currentProject: "四川峨眉山景区",
		initialProject: "四川峨眉山景区",
	},
];

export function DevicesPage() {
	return (
		<div className="space-y-3">
			<div className="text-sm font-black text-nature-moss">设备资产</div>
			<div className="flex h-10 items-end gap-8 border-b border-stone-200">
				{tabs.map((tab) => (
					<button
						key={tab}
						type="button"
						className={`h-10 border-b-2 text-sm font-black transition duration-200 ${
							tab === "设备"
								? "border-nature-leaf text-nature-moss"
								: "border-transparent text-muted-foreground hover:text-nature-moss"
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			<Card className="min-h-[calc(100vh-132px)] border-white/80 bg-white/95">
				<CardContent className="p-5">
					<div className="mb-4 flex items-center justify-between">
						<h1 className="text-xl font-black text-nature-moss">设备</h1>
						<button
							type="button"
							className="h-9 rounded-md bg-nature-moss px-5 text-sm font-black text-white transition duration-200 hover:brightness-110 active:translate-y-px"
						>
							获取设备SN
						</button>
					</div>

					<div className="flex flex-wrap items-center gap-3 border-b border-stone-200 pb-5">
						<input
							className="h-9 w-full max-w-sm rounded-md border border-stone-200 bg-white px-3 text-sm outline-none transition duration-200 placeholder:text-stone-300 focus:border-nature-leaf focus:ring-2 focus:ring-nature-leaf/20"
							placeholder="设备ID"
						/>
						<div className="relative w-full max-w-md">
							<input
								className="h-9 w-full rounded-md border border-stone-200 bg-white px-3 pr-9 text-sm outline-none transition duration-200 placeholder:text-stone-300 focus:border-nature-leaf focus:ring-2 focus:ring-nature-leaf/20"
								placeholder="设备编号，可换行输入多个"
							/>
							<Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
								搜索
							</button>
							<button
								type="button"
								className="h-9 rounded-md border border-stone-200 bg-white px-5 text-sm font-bold text-nature-moss transition duration-200 hover:bg-lime-50"
							>
								重置
							</button>
						</div>
					</div>

					<div className="py-5">
						<button
							type="button"
							className="inline-flex h-9 items-center gap-2 rounded-md border border-stone-200 bg-white px-4 text-sm font-black text-nature-moss transition duration-200 hover:bg-lime-50"
						>
							<Download className="h-4 w-4 text-nature-stem" />
							导出设备
						</button>
					</div>

					<div className="overflow-x-auto rounded-lg border border-stone-200">
						<table className="min-w-[1420px] w-full border-collapse text-left text-sm">
							<thead className="bg-stone-50 text-nature-moss">
								<tr>
									{[
										"设备ID",
										"设备编号",
										"设备状态",
										"设备流转状态",
										"设备名称",
										"设备类别",
										"设备分类",
										"设备属性",
										"设备发货时间",
										"当前所属项目",
										"初始所属项目",
										"操作",
									].map((head) => (
										<th key={head} className="border-b border-stone-100 px-4 py-4 font-black">
											{head}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{devices.map((device) => (
									<tr key={device.id} className="transition duration-200 hover:bg-lime-50/50">
										<td className="px-4 py-6 text-nature-moss">{device.id}</td>
										<td className="px-4 py-6 font-semibold text-nature-moss">{device.sn}</td>
										<td className="px-4 py-6">
											<span className="rounded-md border border-lime-200 bg-lime-50 px-2 py-0.5 text-xs font-black text-lime-600">
												{device.status}
											</span>
										</td>
										<td className="px-4 py-6">
											<span className="rounded-md border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-black text-orange-500">
												{device.flowStatus}
											</span>
										</td>
										<td className="px-4 py-6">{device.name}</td>
										<td className="px-4 py-6">{device.category}</td>
										<td className="px-4 py-6">{device.type}</td>
										<td className="px-4 py-6">{device.property}</td>
										<td className="px-4 py-6">{device.deliveryDate}</td>
										<td className="px-4 py-6 font-semibold">{device.currentProject}</td>
										<td className="px-4 py-6 font-semibold">{device.initialProject}</td>
										<td className="px-4 py-6">
											<div className="flex items-center gap-2">
												<button
													type="button"
													className="h-8 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-nature-moss transition duration-200 hover:bg-lime-50"
												>
													查看详情
												</button>
												<button
													type="button"
													className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 bg-white text-muted-foreground transition duration-200 hover:bg-lime-50 hover:text-nature-moss"
												>
													<MoreVertical className="h-4 w-4" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="mt-4 flex items-center justify-end gap-4 text-sm text-muted-foreground">
						<span>总共 2 条</span>
						<span className="text-stone-300">‹</span>
						<span className="rounded-md border border-stone-300 px-3 py-1 font-black text-nature-moss">
							1
						</span>
						<span className="text-stone-300">›</span>
						<select className="h-9 rounded-md border border-stone-200 bg-white px-3 text-sm text-nature-moss">
							<option>20 条/页</option>
						</select>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
