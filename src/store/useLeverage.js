import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useLeverage = create(
  persist(
    (set, get) => ({
      /** @type {Contact[]} */
      leverage: [],
      /** @type {Contact[]} */
      offlineLeverages: [],
      /**
       * Update the leverage if this exists
       * @param {Contact} leverage
       */
      updateLeverage: (leverage, offline = false) => {
        set((state) => {
          const idx = state.leverage.findIndex((l) => l.id === leverage.id);
          if (idx !== -1) {
            state.leverage[idx] = leverage;
          } else {
            state.leverage.push(leverage);
          }
          return {
            leverage: state.leverage,
            offlineLeverages: offline
              ? [...state.offlineLeverages, leverage]
              : state.offlineLeverages,
          };
        });
      },
      /**
       *
       * @param {string} id
       * @returns {Contact | undefined}
       */
      getLeverage: (id) => {
        return get().leverage.find((l) => l.id === id);
      },
      setLeverages: (leverages) => {
        set({ leverage: leverages });
      },
      resetOfflineLeverages: () => {
        set({ offlineLeverages: [] });
      },
    }),
    {
      name: "@Leverages@",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
