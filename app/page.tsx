'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';

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
    <>
      <div className="text-center">
        <header className="bg-neutral-200 min-h-screen flex flex-col items-center justify-center text-2xl">
          {ready && authenticated ? (
            <div className=' h-screen w-screen bg-slate-200 flex flex-col justify-center items-center'>
              {/* <textarea
                readOnly
                value={JSON.stringify(user, null, 2)}
                className="w-96 h-64 rounded-md"ㄋ
              />
              <br /> */}
              <div> Total balance:</div>
              <div>$123.45 USD</div>
              <div className='bg-slate-500'>{userAddress.slice(0, 4) + '...' + userAddress.slice(-4)}</div>
              <div className='flex justify-evenly gap-5'>
                <div>send</div>
                <div>withdraw</div>
                <div>convert</div>
              </div>
              <div className='flex flex-col justify-start'>
                <div>Balance</div>
                <div>eth</div>
                <div>weth</div>
              </div>
              <button onClick={logout} className="mt-5 px-5 py-3 bg-indigo-500 text-white rounded-md">
                Log Out
              </button>
            </div>
          ) : (
            <button onClick={login} className="px-5 py-3 bg-indigo-500 text-white rounded-md">Log In</button>
          )}
        </header>
      </div>
    </>
  );
}
