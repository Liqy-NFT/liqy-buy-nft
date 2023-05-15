import { BASE_URL, nftAtom, onrampProviderAtom, onrampURL, quoteAtom } from "@/state"
import { useAtom } from "jotai"

export const useBuyNFT = () => {
    const [quote, setQuote] = useAtom(quoteAtom)
    const [nft, setNft] = useAtom(nftAtom)
    const [onrampProvider, setOnrampProvider] = useAtom(onrampProviderAtom)
    const [onramp, setOnramp] = useAtom(onrampURL)

    const headers = {
        'secret-key': "04bf6238-f491-4d04-bccc-c3b7dcc9e2be"
    }

    const getQuote = async () => {
        if (!nft || !nft.token) return

        console.log(nft)

        const res = await fetch(`${BASE_URL}/onramp`, {
            method: "POST",
            body: JSON.stringify({
                tokenAddress: nft.token,
                chainId: Number(nft.chainId),
                fiat: nft.fiat,
                nftAddress: "",
                nftId: "",
                tokenAmount: nft.tokenAmount
            }),
            headers: {
                'content-type': 'application/json',
                ...headers
            }
        })

        const data = await res.json()
        console.log(data)
        setQuote(data.data)

        setOnrampProvider(data.data.onramp)
    }

    const createIntent = async () => {
        const orderId = quote.id

        const res = await fetch(`${BASE_URL}/onramp/create-intent`, {
            method: "POST",
            body: JSON.stringify({
                id: orderId
            }),
            headers: {
                'content-type': 'application/json',
                ...headers
            }
        })

        const data = await res.json()

        setOnramp(data.data.transactionData.url)
    }

    return {
        getQuote,
        createIntent
    }
}