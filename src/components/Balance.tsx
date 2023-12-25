'use client'

import { useState } from 'react'
import type { Address } from 'wagmi'
import { useAccount, useBalance } from 'wagmi'

export function Balance() {
  return (
    <>
      <div className='text-center'>
        <AccountBalance />
      </div>
      <br />
      <div className='text-center'>
        <FindBalance />
      </div>
    </>
  )
}

export function AccountBalance() {
  const { address } = useAccount()
  const { data, refetch } = useBalance({
    address,
    watch: true,
  })

  return (
    <div>
      <span className='mr-2'>{data?.formatted}</span>
      <button className='bg-customPink hover:bg-customRed text-white font-bold py-1 px-2 rounded' onClick={() => refetch()}>refetch</button>
    </div>
  )
}

export function FindBalance() {
  const [address, setAddress] = useState('')
  const { data, isLoading, refetch } = useBalance({
    address: address as Address,
  })

  const [value, setValue] = useState('')

  return (
    <div>
      <label htmlFor="walletAddress" className="font-bold mr-2 text-customPink">Find balance:{' '}</label>
      <input
        id="walletAddress"
        type="text"
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        value={value}
        className="text-center py-1 px-2 rounded border-2 border-customPink focus:border-customRed outline-none transition-all"
      />
      <button
        onClick={() => (value === address ? refetch() : setAddress(value))}
        className={`ml-2 bg-customPink hover:bg-customRed text-white font-bold py-1 px-2 rounded transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? 'fetching...' : 'fetch'}
      </button>
      <div>{data?.formatted}</div>
    </div>
  )
}
