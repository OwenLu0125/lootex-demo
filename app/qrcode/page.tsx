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
      <div className="bg-gray-900 flex  items-center p-4  min-h-screen">
        <div className="w-96 mx-auto mt-10 p-4 bg-[#1C1C1C] rounded-2xl flex flex-col items-center gap-3 border ">
          {/* Close button */}
          <div className="flex self-start">
            <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </Link>
          </div>
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
      </div>
    </>
  )
}

export default Qrcode