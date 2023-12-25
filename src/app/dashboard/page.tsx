import Link from 'next/link';

export default function Dashboard() {
  return (
      <div className="min-h-screen mx-auto bg-customLightOrange">
        <h1 className="text-3xl font-bold underline text-customRed p-4 flex justify-center">About Us</h1>
        <p className="text-center my-4">Some information about us...</p>
        <Link href="/" className="text-center underline">
          Back to Home
        </Link>
      </div>
  );
}