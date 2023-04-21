import { BASE_URL } from "@/state"

export const useAlpyne = () => {
    const generateURL = async (tokenAddress: string, fiat: string, chainId: number, fiatAmount: number, address: string) => {
        const body = {
            tokenAddress,
            fiat,
            chainId,
            fiatAmount,
            address
        }

        const res = await fetch(`${BASE_URL}/onramp/get-alpyne-url`, {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })

        const data = await res.json()

        return data.data.url
    }

    return {
        generateURL
    }
}