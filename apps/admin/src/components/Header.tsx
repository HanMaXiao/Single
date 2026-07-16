import { LOCALE_LABELS, SUPPORTED_LOCALES } from "@cultural-tourism/shared-i18n/i18n";
import { BookOpen, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/admin";

export function Header() {
	const { t, i18n } = useTranslation();
	const logout = useAdminStore((s) => s.logout);
	const user = useAdminStore((s) => s.user);

	return (
		<header className="flex h-12 shrink-0 items-center justify-between rounded-lg bg-white/75 px-5">
			<div>
				<h1 className="text-sm font-black text-nature-moss">工作台</h1>
				<p className="text-[11px] text-muted-foreground">阳光、设备与订单，都在这里安静生长</p>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="sm"
					className="hidden gap-1.5 text-nature-moss md:inline-flex"
				>
					<BookOpen className="h-4 w-4 text-lime-500" />
					使用手册
				</Button>
				<select
					aria-label="locale"
					value={i18n.language}
					onChange={(e) => i18n.changeLanguage(e.target.value)}
					className="h-9 rounded-lg border border-stone-100 bg-white px-3 text-sm font-medium text-nature-moss shadow-sm"
				>
					{SUPPORTED_LOCALES.map((loc) => (
						<option key={loc} value={loc}>
							{LOCALE_LABELS[loc]}
						</option>
					))}
				</select>
				<span className="hidden rounded-lg bg-white px-3 py-2 text-xs font-semibold text-muted-foreground shadow-sm lg:inline-flex">
					{user ? user.role : "访客"}
				</span>
				<span className="flex h-9 w-9 items-center justify-center rounded-full bg-nature-leaf text-xs font-black text-nature-moss shadow-sm">
					{user?.username?.slice(0, 1).toUpperCase() ?? "好"}
				</span>
				<Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground">
					<LogOut className="mr-2 h-4 w-4" />
					{t("auth.logout")}
				</Button>
			</div>
		</header>
	);
}
