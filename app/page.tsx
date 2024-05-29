'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Home() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    if (ready && authenticated) {
      console.log('User is authenticated', user?.wallet?.address);
    }
    setUserAddress(user?.wallet?.address || '');

  }, [ready, authenticated, user]);

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
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold p-5 rounded-full ">
                  <ArrowUpwardIcon />
                </button>
                <Typography>send</Typography>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold p-5 rounded-full">
                  <ArrowDownwardIcon />
                </button>
                <Typography>withdraw</Typography>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold p-5 rounded-full">
                  <AutorenewIcon />
                </button>
                <Typography>convert</Typography>
              </div>
            </div>
            <div>
              <div>
                <Typography>Balance</Typography>
                <Typography>eth</Typography>
                <Typography>weth</Typography>
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
