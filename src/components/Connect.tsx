'use client'

import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function Connect() {
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="flex justify-center">
      <div className="space-x-3">
        {isConnected && (
          <button
            onClick={() => disconnect()}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect from {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button
              key={x.id}
              onClick={() => connect({ connector: x })}
              className={`bg-customPink hover:bg-customRed text-white font-bold py-2 px-4 rounded ${isLoading && x.id === pendingConnector?.id ? "opacity-50" : ""}`}
            >
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div className="text-red-500">{(error as BaseError).shortMessage}</div>}
    </div>
  )
}
