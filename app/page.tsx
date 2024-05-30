'use client';
import Link from 'next/link';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Home() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    if (embeddedWallet) {
      setUserAddress(embeddedWallet.address); // Fix: Pass the address property of the embeddedWallet object
    }
  }, [embeddedWallet]);

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <div className="text-center">
      <div className="bg-neutral-200 min-h-screen flex flex-col items-center justify-center">
        {ready && authenticated ? (
          <div className="flex flex-col gap-4">
            <Typography variant="h5">Total balance:</Typography>
            <Typography variant="h2">$123.45 USD</Typography>
            <Typography className="bg-slate-500 rounded-lg">{userAddress.slice(0, 4) + '...' + userAddress.slice(-4)}</Typography>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col gap-1">
                <Link href="./send">
                  <button className="bg-sky-800 hover:bg-sky-900 text-white font-bold p-5 rounded-full ">
                    <ArrowUpwardIcon />
                  </button>
                </Link>
                <Typography>send</Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Link href="./qrcode">
                  <button className="bg-sky-800 hover:bg-sky-900 text-white font-bold p-5 rounded-full ">
                    <ArrowDownwardIcon />
                  </button>
                </Link>
                <Typography>withdraw</Typography>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-sky-800 hover:bg-sky-900 text-white font-bold p-5 rounded-full ">
                  <AutorenewIcon />
                </button>
                <Typography>convert</Typography>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <Typography variant="h6">Balances</Typography>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full mr-2 bg-blue-500 flex items-center justify-center text-white">
                    <span>⭐</span>
                  </div>
                  <span className="font-semibold text-sm">ETH</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">0.13</p>
                  <p className="text-xs text-gray-500">1 ETH = 1800 USD</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full mr-2 bg-gray-300">🥴</div>
                  <span className="font-semibold text-sm">WETH</span>
                </div>
                <p className="text-sm font-semibold">0</p>
              </div>
            </div>
            <Button onClick={logout} className="mt-5" variant="contained" color="primary">
              Log Out
            </Button>
          </div>
        ) : (
          <Button onClick={login} variant="contained" color="primary">Log In</Button>

        )}
      </div>
    </div>
  );
}
