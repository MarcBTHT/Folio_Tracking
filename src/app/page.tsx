import { Account } from '../components/Account'
import { Balance } from '../components/Balance'
import { BlockNumber } from '../components/BlockNumber'
import { Connect } from '../components/Connect'
import { Connected } from '../components/Connected'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { ReadContract } from '../components/ReadContract'
import { ReadContracts } from '../components/ReadContracts'
import { ReadContractsInfinite } from '../components/ReadContractsInfinite'
import { SendTransaction } from '../components/SendTransaction'
import { SendTransactionPrepared } from '../components/SendTransactionPrepared'
import { SignMessage } from '../components/SignMessage'
import { SignTypedData } from '../components/SignTypedData'
import { Token } from '../components/Token'
import { WatchContractEvents } from '../components/WatchContractEvents'
import { WatchPendingTransactions } from '../components/WatchPendingTransactions'
import { WriteContract } from '../components/WriteContract'
import { WriteContractPrepared } from '../components/WriteContractPrepared'

import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen mx-auto bg-customLightOrange ">
      <h1 className="text-3xl font-bold underline text-customRed p-4 flex justify-center">Portfolio Tracking</h1>
      <Connect />
      <Connected>
        <hr className="my-4 border-customRed" />
        <h2 className="flex justify-center text-xl font-bold my-2 text-customRed" >Network</h2>
        <NetworkSwitcher />
        <hr className="my-4 border-customRed" />
        <h2 className="flex justify-center text-xl font-bold my-2 text-customRed">Account</h2>
        <Account />
        <br />
        <hr className="my-4 border-customRed" />
        <h2 className="flex justify-center text-xl font-bold my-2 text-customRed">Balance</h2>
        <Balance />
        <br />
        <hr className="my-4 border-customRed" />
        <h2 className="flex justify-center text-xl font-bold my-2 text-customRed">Read Contracts Infinite</h2>
        <ReadContractsInfinite />
        <br />
        <hr className="my-4 border-customRed" />
        <h2 className="flex justify-center text-xl font-bold my-2 text-customRed">Token</h2>
        <Token />
      </Connected>
      <nav className="flex justify-center p-4">
        <Link href="/dashboard" className="text-xl underline text-customRed mx-4">
          Dashboard
        </Link>
        {/* Other links if necessary */}
      </nav>
    </div>
  )
}
