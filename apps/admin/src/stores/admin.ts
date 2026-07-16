import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AdminUser {
	username: string;
	role: "admin" | "user";
}

interface AdminState {
	user: AdminUser | null;
	token: string | null;
	setUser: (user: AdminUser, token: string) => void;
	logout: () => void;
}

export const useAdminStore = create<AdminState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			setUser: (user, token) => set({ user, token }),
			logout: () => set({ user: null, token: null }),
		}),
		{
			name: "admin-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
