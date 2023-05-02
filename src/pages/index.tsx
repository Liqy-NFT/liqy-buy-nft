import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Onmeta } from '@/components/onmeta'
import { useBuyToken } from '@/hooks/onmeta'
import { useAtom } from 'jotai'
import { BASE_URL, nftAtom, onrampProviderAtom, Provider, quoteAtom } from '@/state'
import { OnrampProvider } from '@/components'
import { useRouter } from 'next/router'
import { useBuyNFT } from '@/hooks/use-buy-token'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {
    getQuote,
    createIntent
  } = useBuyNFT()

  const [second, setSecond] = useState(0)
  const [paying, setPaying] = useState(false)
  const [onrampProvider, setOnrampProvider] = useAtom(onrampProviderAtom)

  const [quote, setQuote] = useAtom(quoteAtom)
  const [nft, setNft] = useAtom(nftAtom)

  const { query } = useRouter()

  useEffect(() => {
    if(!query.address) {

    }

    if(!query.id) {

    }

    if(!query.fiat) {
      
    }
    
    if(!query.chain) {
      
    }
    
    if(!query.tokenAmount) {
      
    }

    if(!query.token) {
      
    }
    
    if(!query.nft) {
      
    }

    const nft = {
      address: query.address,
      id: query.id,
      fiat: query.fiat,
      chainId: query.chain,
      tokenAmount: query.tokenAmount,
      token: query.token,
      image: query.nft,
      name: query.name,
      collection: query.collection
    }

    setNft(nft)
  }, [query])

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(second => {
        if(second === 30) {
          return 0
        }
        else return second + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if(second == 0 || !quote) {
      getQuote()
    }
  }, [second, nft])

  const create = async () => {
    await createIntent();
    setPaying(true)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between lg:p-24">
      Selected Onramp = {quote && <span>{quote.onramp}</span>}
      
      {paying && 
        <OnrampProvider setPaying={setPaying} /> 
      }
      <div className='w-full h-full lg:max-h-[85vh] lg:w-[90vw] lg:max-w-[450px] bg-white p-5 rounded-xl flex flex-col justify-center items-center space-y-4'>
        <div className='w-full flex flex-col lg:flex-row justify-center items-center'>
          <div className='w-full h-full flex justify-center items-center lg:block'>
            <div className='h-40 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl bg-[#3E3E3E]'>
              <img className='rounded-xl' src={nft && nft.image} alt="" />
            </div>
          </div>
          <div className='w-full h-full flex flex-col justify-center items-center lg:items-start mt-5 lg:mt-0 space-y-2 lg:space-y-4'>
            <h1 style={inter.style} className='text-xl font-bold'>{nft && nft.name}</h1>
            <h1 style={inter.style} className='text-md font-semibold'>{nft && nft.collection}</h1>
          </div>
        </div>

        <div className='relative w-full h-full'>
          <div className='z-50 flex justify-end items-center space-x-2'>
            <p className={inter.className}>Retrying in {second}s</p>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div className={inter.className + ' relative w-full flex justify-center items-center text-white'}>
            <div className={inter.className + ' w-full flex justify-center items-center text-white'}>
              <div className='w-full h-full bg-[#3E3E3E] rounded-xl flex justify-center items-center divide-x-2'>
                <div className='w-full h-full flex flex-col justify-center items-start p-3 space-y-3'>
                  <h1 className='font-bold text-2xl h-16 flex justify-center items-center'>You Pay ₹{quote && quote.price + quote.breakdown.liqyPercentage}</h1>
                  <h1>Price</h1>
                  <h1>Liqy Fee</h1>
                  <h1 className='pt-2 border-t-2 w-full'>Total fee</h1>
                </div>
                <div className='w-full h-full flex flex-col justify-center items-start p-3 space-y-3'>
                  <h1 className='text-gray-400 font-bold text-xl h-16 flex justify-center items-center'>View breakup</h1>
                  <h1>₹{quote && quote.price}</h1>
                  <h1>₹{quote && quote.breakdown.liqyPercentage}</h1>
                  <h1 className='pt-2 border-t-2 w-full'>₹{quote && quote.price + quote.breakdown.liqyPercentage}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[25px] w-full flex justify-center items-center space-x-4">
          <button style={inter.style} className={" w-full bg-gray-500 text-white hover:bg-black/40 focus:shadow-black/30 inline-flex h-[35px] items-center justify-center rounded-xl w-1/2 py-5 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"}>
            Cancel
          </button>
          <button style={inter.style} onClick={() => create()} className={" w-full bg-black text-white hover:bg-black/40 focus:shadow-black/30 inline-flex h-[35px] items-center justify-center rounded-xl w-1/2 py-5 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"}>
            Buy NFT
          </button>
        </div>
      </div>
    </main>
  )
}
