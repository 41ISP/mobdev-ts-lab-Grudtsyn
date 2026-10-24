import { IPayment, INewPayment } from "./types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";

export interface IPaymentsState{
    items: IPayment[],
    addPayment: (data: INewPayment) => void,
    removePayment: (id: string) => void,
    togglePaid: (id: string) => void
}

export const usePaymentsStore = create<IPaymentsState>()(
    persist(
        (set) => ({
            items: [],
            addPayment: (data: INewPayment) => set(v => ({items: [...v.items, {...data, id: nanoid(), paid: false}]})),
            removePayment: (id) => set(v => ({items: v.items.filter(e => e.id !== id,)})),
            togglePaid: (id) => set(v => ({ items: v.items.map(e => e.id === id ? { ...e, paid: !e.paid } : e ) }))
        }),
        { name: "payments", storage: createJSONStorage(() => localStorage) },
    ),
)