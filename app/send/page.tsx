'use client';
import Link from 'next/link'
import React from 'react'

const Send = () => {
  const [amount, setAmount] = React.useState<number>(0);
  const [transactionAddress, setTransactionAddress] = React.useState('');

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-white">
      <Link href="/">
        <button className="absolute top-0 left-0 m-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </Link>
      <div className="flex flex-col flex-grow p-4 mt-8">
        <h2 className="mb-4 text-lg">How much do you want to send?</h2>
        <div>send</div>
        <div className="flex space-x-2 mb-4">
          <input className="flex-grow border p-2 rounded-lg" type="number" step="0.01" placeholder="Enter amount" value={amount}
            onChange={(e) => setAmount(Number(e.target.value))} />
          <select className="border rounded-lg">
            <option>ETH</option>
            {/* Other currency options */}
          </select>
        </div>
        <div>to</div>
        <input className="border p-2 mb-4 rounded-lg" type="text" placeholder="Enter name or link"
          value={transactionAddress}
          onChange={(e) => setTransactionAddress(e.target.value)}
        />
        <Link href={{ pathname: 'send/confirm', query: { transactionAddress, amount } }}>
          <div className='flex justify-center items-center'>
            <button className="mt-60 px-2 py-2 w-full rounded-lg bg-blue-500 text-white">
              Continue
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Send