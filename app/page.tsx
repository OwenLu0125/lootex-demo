'use client';
import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <div className="text-center">
      <header className="bg-neutral-200 min-h-screen flex flex-col items-center justify-center text-2xl">
        {ready && authenticated ? (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              className="w-96 h-64 rounded-md"
            />
            <br />
            <button onClick={logout} className="mt-5 px-5 py-3 bg-indigo-500 text-white rounded-md">
              Log Out
            </button>
          </div>
        ) : (
          <button onClick={login} className="px-5 py-3 bg-indigo-500 text-white rounded-md">Log In</button>
        )}
      </header>
    </div>
  );
}
