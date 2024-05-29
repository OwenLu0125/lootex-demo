'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import QRCode from "react-qr-code";
import { CopyToClipboard } from 'react-copy-to-clipboard';


const Qrcode = () => {
  const { user } = usePrivy();
  const [address, setAddress] = useState<string>('');
  const [isCopy, setIsCopy] = useState<boolean>(false);

  useEffect(() => {
    setAddress(user?.wallet?.address || '');
  }, [user]);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-white">
        {/* Close button */}
        <Link href="/">
          <button className="absolute top-0 left-0 m-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </Link>
        {/* QR Code */}
        <div className="w-64 h-64 bg-gray-200">
          <QRCode
            size={256}
            style={{ height: "auto", width: "100%" }}
            value={address}
            viewBox={`0 0 256 256`}
          />
        </div>
        {/* Account Balance */}
        <h2 className="mt-4 text-gray-600">My Account :</h2>
        <p className="text-2xl font-bold">{address.slice(0, 4) + '...' + address.slice(-4)}</p>

        {/* Transfer Button */}
        <CopyToClipboard text={address}>
          <button className="mt-4 px-8 py-2 rounded-full bg-blue-500 text-white"
            onClick={() => setIsCopy(true)}>
            {isCopy ? 'Copied!' : 'Copy'}
          </button>
        </CopyToClipboard>
      </div>
    </>
  )
}

export default Qrcode