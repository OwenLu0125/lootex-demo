'use client';
import Link from 'next/link'
import { Suspense } from 'react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useBalance } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
import { Box, Skeleton } from '@mui/material';
import FeeData from '../../../components/FeeData';

export default function Confirm() {
  const [transactionAddress, setTransactionAddress] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<number>(0);
  const [userAddress, setUserAddress] = useState<string>('');
  const searchParams = useSearchParams()

  const { ready, authenticated, user } = usePrivy();

  const { data } = useBalance({ address: userAddress as `0x${string}` });

  useEffect(() => {
    const transactionAddress = searchParams.get('transactionAddress');
    const amount = searchParams.get('amount');
    setTransactionAddress(transactionAddress ?? undefined)
    setAmount(Number(amount ?? 0))
  }, [searchParams])

  useEffect(() => {
    if (ready && authenticated) {
      console.log('User is authenticated', user?.wallet?.address);
    }
    setUserAddress(user?.wallet?.address || '');

  }, [ready, authenticated, user]);

  return (
    <Suspense fallback={<div>
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box></div>}>
      <div className="flex flex-col h-screen p-5">
        <header className="p-4">
          <Link href="/send">
            {/* TODO: change icons */}
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
            <h2 className="text-lg font-bold">you want to send</h2>
            <h1> {amount} {data?.symbol}</h1>
            {data && (
              <div className="text-sm text-gray-500">餘額 :{data?.formatted} {data?.symbol}</div>
            )}
          </section>

          <section className="mb-4 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-bold">TO:</h2>
            <p className="text-sm text-gray-500">{transactionAddress}</p>
          </section>

          <section className="mb-4 p-4 bg-white shadow-md rounded-md">
            <FeeData />
          </section>
        </main>

        <footer className="p-4 bg-white shadow-md">
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">Confirm & Send</button>
        </footer>
      </div>
    </Suspense>
  )
}
