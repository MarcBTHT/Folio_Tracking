'use client'

import { useAccount, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <div className="text-center p-4 text-lg">
      <span>{ensName ?? address}</span>
      {ensName ? ` (${address})` : null}
    </div>
  )
}
