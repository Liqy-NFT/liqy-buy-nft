import { onMetaWidgetAtom } from "@/state"
import { useAtom } from "jotai"
import { useEffect } from "react"

export const useBuyToken = () => {
    const [widget, setWidget] = useAtom(onMetaWidgetAtom)
    let loading = false
    
    const createWidget = (amount: string, token: string, chainId: number, orderId: string) => {
        let onMeta = (window as any).onMetaWidget

        if(!onMeta) return
        
        if(widget) {
            widget.tokenAddress = token
            widget.chainId = chainId
            widget.fiatAmount = Number(amount) < 100 ? "100" : amount

            console.log(widget, "widget 1")
            widget.init()
        } else {
            if(!loading) {
                let widget2 = new onMeta({
                    elementId: "widget",
                    apiKey: "7c75433a-05f4-4ffc-894c-452322808583",
                    walletAddress: "0x588C9929C7e6018E32f6Ad250E7abaecf106Ad7e",
                    fiatAmount: Number(amount) < 100 ? "100" : amount,
                    tokenAddress: token,
                    chainId,
                    metaData: {
                        // any other details
                        orderId
                    }
                })
    
                loading = true
    
                setWidget(widget2)
    
                console.log(widget, "widget 2")
                widget2.init()
            }
        }

        console.log(widget, "widget")
    }

    useEffect(() => {
        if(widget) {
            loading = false
            widget.on("ALL_EVENTS", (status: any) => {
                console.log("EVENT LOGGING => ", status)
            })
        }
    }, [widget])

    return {
        createWidget
    }
}