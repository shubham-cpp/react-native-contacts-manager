import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const structuredClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const useLeverage = create(
  persist(
    (set, get) => ({
      /** @type {Contact[]} */
      leverage: [],
      /**
       * Update the leverage if this exists
       * @param {Contact} leverage
       */
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
    }),
    {
      name: "@Leverages@",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
