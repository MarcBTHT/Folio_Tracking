'use client'

import { useEffect, useState } from 'react'
import { useAccount, useBalance, useContractReads, useNetwork } from 'wagmi'
import { erc20ABIperso } from './constants';
import { formatUnits } from 'viem'

import tokenList from './tokenList.json';

export function Dashboard() {
    return (
        <>
            <div className='text-center'>
                <GetAccountBalance />
            </div>
        </>
    )
}

interface Token {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
}

interface Contract {
    address: string;
    abi: any;
    functionName: string;
    args: string[];
}

interface TokenInfo {
    [address: string]: {
        name: string;
        symbol: string;
        decimals: number;
        logoURI: string;
    };
}

export function GetAccountBalance() {
    const { address } = useAccount();
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [tokenInfo, setTokenInfo] = useState<TokenInfo>({});

    useEffect(() => {
        if (address) {
            const newContracts: Contract[] = [];
            const newTokenInfo: TokenInfo = {};

            tokenList.tokens.forEach((token: Token) => {
                newContracts.push({
                    address: token.address,
                    abi: erc20ABIperso,
                    functionName: 'balanceOf',
                    args: [address],
                });

                newTokenInfo[token.address] = {
                    name: token.name,
                    symbol: token.symbol,
                    decimals: token.decimals,
                    logoURI: token.logoURI,
                };
            });

            setContracts(newContracts);
            setTokenInfo(newTokenInfo);
        }
    }, [address]); //Chaque fois que l'addresse change, on met à jour les contracts et les tokenInfo (Vaut mieux le faire avec un boutton pour éviter de faire trop de requêtes)

    const { data, error, isLoading } = useContractReads({
        contracts,
    });
    //console.log(data);

    const formattedBalances = data?.reduce((acc, item, index) => {
        if (item.status === 'success' && item.result) {
            const tokenAddress = contracts[index].address;
            const tokenDecimals = tokenInfo[tokenAddress]?.decimals || 18;
            const balance = formatUnits(item.result, tokenDecimals);

            acc.push({
                balance,
                tokenName: tokenInfo[tokenAddress]?.name || 'Unknown Token',
                symbol: tokenInfo[tokenAddress]?.symbol || '',
                logoURI: tokenInfo[tokenAddress]?.logoURI || '/images/default-icon.svg',
            });
        }
        return acc;
    }, [] as Array<{ balance: string; tokenName: string; symbol: string; logoURI: string; }>) || [];
    //console.log(formattedBalances);

    return (
        <div className="mt-4 mx-auto w-3/4 bg-white shadow-lg rounded-lg p-6">
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
                        {formattedBalances.map(({ balance, tokenName, symbol, logoURI }, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <img className="h-6 w-6 rounded-full mr-2" src={logoURI} alt={tokenName} />
                                        <span>{tokenName} ({symbol})</span>
                                    </div>
                                </td>
                                <td className="py-4">{balance} {symbol}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
                    {/* Replace `placeholder-icon.svg` with your actual icon paths */}
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
