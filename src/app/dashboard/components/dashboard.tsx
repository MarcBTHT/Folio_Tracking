'use client'

import { useEffect, useState } from 'react'
import { useAccount, useBalance, useContractReads, useNetwork } from 'wagmi'
import { erc20ABIperso } from './constants';
import { formatUnits } from 'viem'

//import tokenList from './tokenList.json';
import tokenList from './tokenListTest.json';
//import tokenList from './tokenListAave.json';
import { config } from '../../../wagmi';

export function Dashboard() {
    return (
        <>
            <div className='text-center'>
                <GetAccountBalance />
            </div>
        </>
    )
}

interface TokenInfo {
    [address: string]: {
        name: string;
        symbol: string;
        decimals: number;
        logoURI: string;
        balance: string;
    };
}

export function GetAccountBalance() {
    const { address } = useAccount();
    const [tokenInfo, setTokenInfo] = useState<TokenInfo>({});
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        async function fetchBalances() {
            if (address) {
                const newTokenInfo: TokenInfo = {};

                for (const token of tokenList.tokens) {
                    try {
                        const data = await config.publicClient.readContract({
                            address: token.address,
                            abi: erc20ABIperso,
                            functionName: 'balanceOf',
                            args: [address]
                        });

                        const balance = data && formatUnits(data, token.decimals);
                        
                        if (balance && balance != '0') {
                            newTokenInfo[token.address] = {
                                name: token.name,
                                symbol: token.symbol,
                                decimals: token.decimals,
                                logoURI: token.logoURI,
                                balance: balance || '0'
                            };
                        }
                    } catch (error) { }
                }
                setTokenInfo(newTokenInfo);
                setIsSyncing(false);
            }
        }
        fetchBalances();
    }, [address, isSyncing]);

    const handleSyncClick = () => {
        setIsSyncing(true); 
    };

    return (
        <div className="mt-4 mx-auto w-3/4 bg-white shadow-lg rounded-lg p-6">
            <button onClick={handleSyncClick} disabled={isSyncing} className="bg-customOrange hover:bg-customPink text-white font-bold py-2 px-4 rounded mb-4">
                {isSyncing ? 'Synchronisation en cours...' : 'Synchroniser'}
            </button>
            {isSyncing ? (
                <p></p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="pb-4">ACTIFS</th>
                                <th className="pb-4">MONTANT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <GetChainBalance />
                            </tr>
                            {Object.entries(tokenInfo).map(([address, { balance, name, symbol, logoURI }]) => (
                                <tr key={address} className="border-b">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <img className="h-6 w-6 rounded-full mr-2" src={logoURI} alt={name} />
                                            <span>{name} ({symbol})</span>
                                        </div>
                                    </td>
                                    <td className="py-4">{balance} {symbol}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             )}
        </div>
    );

}

export function GetChainBalance() { //I can put this function in GetAccountBalance (I just wait to see how I will handle the rest)
    const { chain } = useNetwork()  //Ca utilise un getBalance et un formatEther ... https://viem.sh/docs/actions/public/getBalance.html#returns
    const { address } = useAccount()
    const { data, refetch } = useBalance({
        address,
        watch: true,
    })
    return (
        <>
            <td className="py-4">
                <div className="flex items-center">
                    <img className="h-6 w-6 rounded-full mr-2" src={getTokenIconPath(chain?.name || '')} alt={chain?.name || 'Default Chain'} />
                    <span>{chain?.name}</span>
                </div>
            </td>
            <td className="py-4">{data?.formatted} {chain?.name}</td>
        </>
    )
}

function getTokenIconPath(tokenName: string): string {
    const tokenIconMapping: { [key: string]: string } = {
        'Sepolia': "/images/Ethereum_logo.png",
        'Link': "/images/Chainlink_Logo.png",
        'Aave': "/images/aave-aave-logo.png",
        'Avalanche Fuji': "/images/Avalanche_AVAX_Logo.png",
        'SinCity': "/images/SinCity_Logo.png",
        'BNB Smart Chain': "/images/bnb-bnb-logo.png",
        // ... other token mappings
    };
    return tokenIconMapping[tokenName] || '../assets/default-icon.svg'; // Fallback to a default icon
}
