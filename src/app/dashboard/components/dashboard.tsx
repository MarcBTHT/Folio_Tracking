'use client'

import { useState } from 'react'
import { useAccount, useBalance, useContractReads, useNetwork } from 'wagmi'
import { erc20ABIperso } from './constants';
import { formatUnits } from 'viem'

export function Dashboard() {
    return (
        <>
            <div className='text-center'>
                <GetAccountBalance />
            </div>
        </>
    )
}

export function GetAccountBalance() {
    const { address } = useAccount()
    if (!address) {
        // Handle the case when the address is not available
        return <div>No account connected</div>;
    }
    //To associate the name with the contract address (I also need to add the decimals and modify the mapping logic below)
    const tokenMapping: { [key: string]: string } = {
        '0x779877A7B0D9E8603169DdbD7836e478b4624789': 'Link',
        '0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a': 'Aave',
        '0x6397de0F9aEDc0F7A8Fa8B438DDE883B9c201010': 'SinCity',
        // ... other token mappings
        //If I want to import UDSC or other with different decimals, I have to change the decimals in the code below, so I need to find a way (In ERC30 I have a function to know the decimals of the token)
    };

    const contracts = [
        //////////////////// SEPOLIA ////////////////////
        {
            address: '0x779877A7B0D9E8603169DdbD7836e478b4624789', //Link
            abi: erc20ABIperso,
            functionName: 'balanceOf',
            args: [address],
        },
        {
            address: '0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a', //AAVE
            abi: erc20ABIperso,
            functionName: 'balanceOf',
            args: [address],
        },
        //////////////////// BNB ////////////////////
        {
            address: '0x6397de0F9aEDc0F7A8Fa8B438DDE883B9c201010', //SIN
            abi: erc20ABIperso,
            functionName: 'balanceOf',
            args: [address],
        },
        // Add more contracts as needed
        //////////////////// FUJI ////////////////////
        //////////////////// Mainnet ETH //////////////////// (Need to list all the erc20 tokens)
        //////////////////// Other Mainnet //////////////////// (Also need to list for all the erc20 tokens in the other mainet)
    ] as const; //Erase 'as const;' if some error because know it's immutable and with address ... (I will just have a warning on contracts below but it's not a problem)

    const { data, error, isLoading } = useContractReads({
        contracts: contracts,
    })
    if (error) return <div>Error fetching balances</div>;
    if (isLoading) return <div>Loading balances...</div>;

    /// POUR AVOIR TOUTES LES DECIMALES DU TOKEN ... ///
    const formattedBalances = data?.map((item, index) => {
        if (!item || !item.result) return { balance: '0', tokenName: 'Unknown' };
        let balance = '0';
        balance = formatUnits(item.result, 18);
        const tokenAddress = contracts[index].address;
        const tokenName = tokenMapping[tokenAddress] || 'Unknown Token';

        return { balance, tokenName };
    });

    //I don't want to display the balance if it's equal to 0
    const nonZeroBalances = (formattedBalances || []).filter(
        ({ balance }) => parseFloat(balance) > 0
    );

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
                        {/* Display the chain balance first */}
                        <tr className="border-b">
                            <GetChainBalance />
                        </tr>
                        {nonZeroBalances && nonZeroBalances.map(({ balance, tokenName }, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-4">
                                    <div className="flex items-center">
                                        {/* Replace `placeholder-icon.svg` with your actual icon paths */}
                                        <img className="h-6 w-6 rounded-full mr-2" src={getTokenIconPath(tokenName)} alt={tokenName} />
                                        <span>{tokenName}</span>
                                    </div>
                                </td>
                                <td className="py-4">{balance} {tokenName}</td>
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
