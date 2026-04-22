import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StackState {
  selectedBrickIds: string[];
  mau: number;
  avgUsagePerUser: number;
  activeCategory: string;
  currency: 'USD' | 'KRW';
  
  // Actions
  setActiveCategory: (category: string) => void;
  addBrick: (id: string) => void;
  removeBrick: (id: string) => void;
  toggleBrick: (id: string) => void;
  setMau: (val: number) => void;
  setAvgUsage: (val: number) => void;
  setCurrency: (currency: 'USD' | 'KRW') => void;
  applyPreset: (brickIds: string[]) => void;
  resetStack: () => void;
  setFullState: (data: Partial<StackState>) => void;
}

export const useStackStore = create<StackState>()(
  persist(
    (set) => ({
      selectedBrickIds: [],
      mau: 1000,
      avgUsagePerUser: 50,
      activeCategory: 'All',
      currency: 'USD',

      setActiveCategory: (category) => set({ activeCategory: category }),
      addBrick: (id) => set((state) => ({
        selectedBrickIds: state.selectedBrickIds.includes(id) 
          ? state.selectedBrickIds 
          : [...state.selectedBrickIds, id]
      })),

      removeBrick: (id) => set((state) => ({
        selectedBrickIds: state.selectedBrickIds.filter((brickId) => brickId !== id)
      })),

      toggleBrick: (id) => set((state) => ({
        selectedBrickIds: state.selectedBrickIds.includes(id)
          ? state.selectedBrickIds.filter((brickId) => brickId !== id)
          : [...state.selectedBrickIds, id]
      })),

      setMau: (val) => set({ mau: val }),
      setAvgUsage: (val) => set({ avgUsagePerUser: val }),
      setCurrency: (currency) => set({ currency }),
      applyPreset: (brickIds) => set({ selectedBrickIds: brickIds }),
      resetStack: () => set({ selectedBrickIds: [] }),
      setFullState: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'legostack-storage', // 로컬 스토리지에 자동 저장 (새로고침 시 유지)
    }
  )
);
