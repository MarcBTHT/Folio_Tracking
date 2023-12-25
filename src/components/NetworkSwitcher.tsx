'use client'

import { useNetwork, useSwitchNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <div className="text-center my-4">
      <div className="text-lg">
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && ' (unsupported)'}
      </div>
      <br />
      {switchNetwork && (
        <div>
          <span className="font-medium text-customRed">Switch to:{' '}</span>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button key={x.id} onClick={() => switchNetwork(x.id)}
              className={`bg-customPink hover:bg-customRed text-white font-bold py-2 px-4 rounded ${isLoading && x.id === pendingChainId ? "opacity-50" : ""}`}>
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </button>
            ),
          )}
        </div>
      )}

      <div>{error?.message}</div>
    </div>
  )
}
