'use client';
import Link from 'next/link';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ethers } from "ethers";
import { useBalance } from 'wagmi';

export default function Home() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  const [userEmbeddedWallet, setEmbeddedWallet] = useState<string>("");
  const [userWalletBalance, setUserWalletBalance] = useState<string>("");
  const [ethNumericValue, setEthNumericValue] = useState<number>(0);
  const [ethValue, setEthValue] = useState<number>(0);

  const { data } = useBalance({ address: userEmbeddedWallet as `0x${string}` });

  useEffect(() => {
    if (!ready) {
      return;
    } else {
      setUp();
    }
    async function setUp() {
      const embeddedWallet = wallets.find(
        (wallet) => wallet.walletClientType === "privy"
      );
      if (embeddedWallet) {
        const provider = await embeddedWallet.getEthereumProvider();
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${Number(11155111).toString(16)}` }],
        });
        const ethProvider = new ethers.providers.Web3Provider(provider);
        const walletBalance = await ethProvider.getBalance(
          embeddedWallet.address
        );
        const ethStringAmount = ethers.utils.formatEther(walletBalance);
        setEmbeddedWallet(embeddedWallet.address);
        setUserWalletBalance(ethStringAmount);
      }
      const response = await fetch('https://dex-v3-api-aws.lootex.dev/api/v3/currency/all-pairs');
      const data = await response.json();
      setEthNumericValue(parseFloat(data.ETH))
      const walletNumericBalance = parseFloat(userWalletBalance);
      setEthValue(ethNumericValue * walletNumericBalance);
    }
  }, [userEmbeddedWallet, wallets, ethValue, ready, userWalletBalance, ethNumericValue]);

  return (
    <div className="text-center">
      <div className="bg-neutral-200 min-h-screen  flex flex-col items-center justify-center">
        {ready && authenticated ? (
          <div className="flex flex-col gap-4 ">
            <Typography variant="h5">Total balance:</Typography>
            <Typography variant="h2">{ethValue.toFixed(3)} USD</Typography>
            <Typography className="bg-slate-500 rounded-lg">{userEmbeddedWallet.slice(0, 4) + '...' + userEmbeddedWallet.slice(-4)}</Typography>
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
                  <p className="text-sm font-semibold">{userWalletBalance.slice(0, 8)} {data?.symbol}</p>
                  <p className="text-xs text-gray-500">1 ETH = {ethNumericValue} USD </p>
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
