import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export function AdminLayout() {
	return (
		<div className="flex h-screen overflow-hidden bg-background p-3">
			<Sidebar />
			<div className="ml-0 flex min-w-0 flex-1 flex-col overflow-hidden md:ml-3">
				<Header />
				<main className="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin md:px-3">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
