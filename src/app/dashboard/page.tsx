import Link from 'next/link';
import { Dashboard1 } from './components/dashboard'
import { Connect } from '../../components/Connect'
import { Connected } from '../../components/Connected'
import { NetworkSwitcher } from '../../components/NetworkSwitcher'

export default function Page() {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold underline text-customRed p-4 flex justify-center">Dashboard</h1>
      <Connect />
      <Connected>
        <hr className="my-4 border-customRed" />
        <h2 className="flex justify-center text-xl font-bold my-2 text-customRed" >Network</h2>
        <NetworkSwitcher />
        <br />
        <Dashboard1 />
      </Connected>
      <nav className="flex justify-center p-4">
        <Link href="/" className="text-center underline">
          Back to Home
        </Link>
      </nav>
    </div >
  );
}