import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useContact = create()(
  persist(
    (set) => ({
      contact: {},
      setContact: (contact) => {
        set((state) => ({ contact: { ...state.contact, ...contact } }));
      },
      resetContact: () => {
        set(() => ({ contact: {} }));
      },
      updateContact: (contact) => {
        set((state) => ({ contact: { ...state.contact, ...contact } }));
      },
    }),
    {
      name: "@CONTACT@",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
