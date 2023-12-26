'use client'

import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi'

import { wagmiContractConfig } from './contracts'
import { stringify } from '../utils/stringify'

export function ReadContractsInfinite() {
  const { data, isLoading, isSuccess, fetchNextPage } =
    useContractInfiniteReads({
      cacheKey: 'lootTokenURIs',
      ...paginatedIndexesConfig(
        (index: number) => [
          {
            ...wagmiContractConfig,
            functionName: 'ownerOf',
            args: [BigInt(index)] as const,
          },
        ],
        { start: 0, perPage: 10, direction: 'increment' },
      ),
    })

  return (
    <div className='text-center'>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <>
          {data?.pages.map((data, i) => (
            <div key={i}>
              {data.flatMap((x) => (
                <pre key={stringify(x)}>{stringify(x)}</pre>
              ))}
            </div>
          ))}
          <button className={`bg-customPink hover:bg-customRed text-white font-bold py-2 px-4 rounded ${isLoading ? "opacity-50" : ""}`} onClick={() => fetchNextPage()}>Fetch more</button>
        </>
      )}
    </div>
  )
}
