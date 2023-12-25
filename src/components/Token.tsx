'use client'

import { useState } from 'react'
import { type Address, useToken } from 'wagmi'

export function Token() {
  const [address, setAddress] = useState<Address>(
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  )
  const { data, error, isError, isLoading, refetch } = useToken({ address })

  return (
    <div className="text-center my-4">
      <div className="flex justify-center items-center space-x-2">
        <input
          onChange={(e) => setAddress(e.target.value as Address)}
          placeholder="token address"
          value={address}
          className="py-1 px-2 rounded border-2 border-customPink focus:border-customRed outline-none transition-all"
        />
        <button 
          onClick={() => refetch()}
          className="bg-customPink hover:bg-customRed text-white font-bold py-1 px-2 rounded transition-all disabled:opacity-50"
          disabled={isLoading}
        >
          fetch
        </button>
      </div>

      {data && (
        <div className="mt-2">
          <span className="font-bold">{data.totalSupply?.formatted}</span> <span className="font-bold text-customPink">{data.symbol}</span>
        </div>
      )}
      {isLoading && <div>Fetching token...</div>}
      {isError && <div className="text-red-500">Error: {error?.message}</div>}
    </div>
  )
}

