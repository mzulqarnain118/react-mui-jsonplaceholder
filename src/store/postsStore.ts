import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ViewMode } from "../types";
import { VIEW_MODES, SORT_ORDERS, STORAGE_KEYS } from "../constants";

interface PostsUIState {
  // UI state only - no data management
  searchTerm: string;
  selectedUserId: string;
  sortOrder: typeof SORT_ORDERS.ASC | typeof SORT_ORDERS.DESC;
  viewMode: ViewMode;
}

interface PostsUIActions {
  // UI state operations only
  setSearchTerm: (term: string) => void;
  setSelectedUserId: (userId: string) => void;
  setSortOrder: (
    order: typeof SORT_ORDERS.ASC | typeof SORT_ORDERS.DESC
  ) => void;
  setViewMode: (mode: ViewMode) => void;
  resetFilters: () => void;
}

type PostsUIStore = PostsUIState & PostsUIActions;

export const usePostsUIStore = create<PostsUIStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        searchTerm: "",
        selectedUserId: "all",
        sortOrder: SORT_ORDERS.DESC,
        viewMode: VIEW_MODES.GRID,

        // UI state operations
        setSearchTerm: (term) => set({ searchTerm: term }),
        setSelectedUserId: (userId) => set({ selectedUserId: userId }),
        setSortOrder: (order) => set({ sortOrder: order }),
        setViewMode: (mode) => set({ viewMode: mode }),
        resetFilters: () =>
          set({
            searchTerm: "",
            selectedUserId: "all",
            sortOrder: SORT_ORDERS.DESC,
          }),
      }),
      {
        name: STORAGE_KEYS.USER_PREFERENCES,
        partialize: (state) => ({
          viewMode: state.viewMode,
          sortOrder: state.sortOrder,
        }),
      }
    ),
    { name: "posts-ui-store" }
  )
);
