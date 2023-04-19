import { atom } from "jotai";

export const onMetaWidgetAtom = atom<any>(undefined)

export enum Provider {
    ONRAMP,
    ONMETA,
    ALPYNE,
    TRANSAK
}

export const onrampProviderAtom = atom<Provider>(Provider.ONMETA)