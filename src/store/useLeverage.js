import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const structuredClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const useLeverage = create(
  persist(
    (set, get) => ({
      leverage: [],
      updateLeverage: (leverage) => {
        set((state) => {
          const idx = state.leverage.findIndex((l) => l.id === leverage.id);
          if (idx !== -1) {
            state.leverage[idx] = leverage;
          } else {
            state.leverage.push(leverage);
          }
          // AsyncStorage.setItem("leverage", JSON.stringify(state.leverage));
          return {
            leverage: state.leverage,
          };
        });
      },
      getLeverage: (id) => {
        return structuredClone(get().leverage).find((l) => l.id === id);
      },
      setLeverages: (leverages) => {
        set({ leverage: leverages });
      },
    }),
    {
      name: "@Leverages@",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
