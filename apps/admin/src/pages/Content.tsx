import { ImagePlus, PackageOpen, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tabs = ["图片", "视频", "音频", "3D模型"];

export function ContentPage() {
	return (
		<div className="space-y-3">
			<div className="text-sm font-black text-nature-moss">内容资产</div>
			<div className="flex h-10 items-end gap-8 border-b border-stone-200">
				{tabs.map((tab) => (
					<button
						key={tab}
						type="button"
						className={`h-10 border-b-2 text-sm font-black transition duration-200 ${
							tab === "图片"
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
					<h1 className="mb-5 text-xl font-black text-nature-moss">内容资产</h1>

					<div className="flex flex-wrap items-center gap-3 border-b border-stone-200 pb-5">
						<select className="h-9 w-full max-w-xs rounded-md border border-stone-200 bg-white px-3 text-sm text-muted-foreground outline-none focus:border-nature-leaf">
							<option>全部项目</option>
						</select>
						<div className="relative w-full max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-300" />
							<input
								className="h-9 w-full rounded-md border border-stone-200 bg-white pl-9 pr-3 text-sm outline-none transition duration-200 placeholder:text-stone-300 focus:border-nature-leaf focus:ring-2 focus:ring-nature-leaf/20"
								placeholder="请输入图片名称"
							/>
						</div>
						<button
							type="button"
							className="ml-auto inline-flex h-9 items-center gap-2 rounded-md bg-nature-moss px-4 text-sm font-black text-white transition duration-200 hover:brightness-110 active:translate-y-px"
						>
							<ImagePlus className="h-4 w-4 text-nature-leaf" />
							上传图片
						</button>
					</div>

					<div className="flex min-h-[380px] flex-col items-center justify-center text-center">
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-300">
							<PackageOpen className="h-9 w-9" />
						</div>
						<p className="text-sm font-semibold text-muted-foreground">暂无数据</p>
						<p className="mt-2 text-xs text-stone-400">内容素材上传后会在这里按类型归档展示</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
