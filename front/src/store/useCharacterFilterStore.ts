import { create } from "zustand";
import { createUseStoreWithParams } from "@/hooks/useStoreWithParams.ts";

type Filters = {
    name: string;
    status: string;
    species: string;
};

type FilterState = Filters & { page: string };

type FilterAction = {
    setFilter: (key: keyof FilterState, value: string) => void;
    resetFilters: () => void;
    setAll: (prev: Partial<FilterState>) => void;
};

const initialState: FilterState = {
    name: "",
    status: "",
    species: "",
    page: "1",
};

export const useCharactersFilterStore = create<FilterState & FilterAction>((set) => ({
    ...initialState,
    setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
    resetFilters: () => set({ ...initialState }),
    setAll: (value) => set((prev) => ({ ...prev, ...value })),
}));

export const useCharactersFilterStoreWithParams =
    createUseStoreWithParams<FilterState & FilterAction>(useCharactersFilterStore);
