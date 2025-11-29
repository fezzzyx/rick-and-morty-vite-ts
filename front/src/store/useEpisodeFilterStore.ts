// /store/useEpisodeFilterStore.ts
import { create } from "zustand";
import { createUseStoreWithParams } from "@/hooks/useStoreWithParams.ts";

type Filters = {
    name: string;
    episode: string;
};

type FilterState = Filters & {
    page: string;
    count: string;
};

type FilterAction = {
    setFilter: (key: keyof FilterState, value: string) => void;
    resetFilters: () => void;
    setAll: (prev: Partial<FilterState>) => void;
};

const initialState: FilterState = {
    name: "",
    episode: "",
    page: "1",
    count: "20",
};

export const useEpisodesFilterStore = create<FilterState & FilterAction>((set) => ({
    ...initialState,
    setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
    resetFilters: () => set({ ...initialState }),
    setAll: (value) => set((prev) => ({ ...prev, ...value })),
}));

export const useEpisodesFilterStoreWithParams =
    createUseStoreWithParams<FilterState & FilterAction>(useEpisodesFilterStore);
