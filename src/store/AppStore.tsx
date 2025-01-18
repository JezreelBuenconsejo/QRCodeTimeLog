import { create } from "zustand";

/**
 * Documentation: https://github.com/pmndrs/zustand
 */
export type AppState = {
	n: number;
	incrementN: () => void;
};

const useStore: any = create<AppState>((set: Function) => ({
	n: 0,
	incrementN: () => set((state: AppState) => ({ n: state.n + 1 }))
}));

export { useStore };
