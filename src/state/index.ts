import { atom } from "jotai";

export const onMetaWidgetAtom = atom<any>(undefined)
export const onMetaAlready = atom<boolean>(false)

export enum Provider {
    ONRAMP = "ONRAMP",
    ONMETA = "ONMETA",
    ALPYNE = "ALPYNE",
    TRANSAK = "TRANSAK"
}

export const onrampProviderAtom = atom<Provider>(Provider.ALPYNE)

export const BASE_URL = "http://localhost:5000/v1";

export const nftAtom = atom<any>(undefined)
export const quoteAtom = atom<any>(undefined)