'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Confirm() {
  const [transactionAddress, setTransactionAddress] = useState<string | null>(null);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${searchParams}`
    const transactionAddress = url.split('=')[1]
    setTransactionAddress(transactionAddress)
  }, [pathname, searchParams])
  return (
    <div className="flex flex-col h-screen p-5">
      <header className="p-4">
        <Link href="/">
          <button className="absolute top-0 left-0 m-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </Link>
      </header>
      <h1 className="text-lg font-bold">How much do you want to send?</h1>

      <main className="flex-1 p-4 overflow-auto">
        <section className="mb-4 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-bold">資產:</h2>
          <p className="text-sm text-gray-500">餘額 :: 4.50504666 SepoliaETH</p>
        </section>

        <section className="mb-4 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-bold">TO:</h2>
          <p className="text-sm text-gray-500">{transactionAddress}</p>
        </section>

        <section className="mb-4 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-bold">Estimated fee</h2>
          <p className="text-sm text-gray-500">Morket -30 sec</p>
          <p className="text-sm text-gray-500">Max fee: 0.00101457 SepoliaETH</p>
        </section>
      </main>

      <footer className="p-4 bg-white shadow-md">
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">下一頁</button>
      </footer>
    </div>
  )
}
