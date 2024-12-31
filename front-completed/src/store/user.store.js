import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: undefined,
    loading: true,
    setUser: (user) => {
        set((state) => ({ ...state, user, loading: false }));
    },
    users: undefined,
    setUsers: (users) => {
        set((state) => ({ ...state, users }));
    }
}));
