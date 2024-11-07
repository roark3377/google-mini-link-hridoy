import { create } from "zustand";

export const usePaginationStore = create((set) => ({
  page: 1,
  limit: 5,
  total: 1,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setTotal: (total) => set({ total }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
}));
