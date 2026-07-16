import { useTranslation } from "react-i18next";

export function SettingsPage() {
	const { t } = useTranslation();
	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">{t("admin.settings")}</h1>
			<p className="text-muted-foreground">用户管理、角色权限、系统配置。</p>
		</div>
	);
}
