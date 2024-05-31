'use client';
import Link from 'next/link';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ContractWrite from 'components/ContractWrite';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';


const SwapComponent = () => {
  const [amount, setAmount] = useState<number>();
  const [topCurrency, setTopCurrency] = useState<string>('ETH');
  const [bottomCurrency, setBottomCurrency] = useState<string>('WETH');
  // const [userEmbeddedWallet, setEmbeddedWallet] = useState<string>('');
  const [userWalletBalance, setUserWalletBalance] = useState<string>('');
  const [ethNumericValue, setEthNumericValue] = useState<number>(0);
  const [ethValue, setEthValue] = useState<number>(0);

  const { sendTransaction } = usePrivy();
  const { wallets } = useWallets();

  const handleSwap = () => {
    const temp = topCurrency;
    setTopCurrency(bottomCurrency);
    setBottomCurrency(temp);
  };

  useEffect(() => {
    setUp();

    async function setUp() {
      const embeddedWallet = wallets.find(
        (wallet) => wallet.walletClientType === 'privy'
      );
      if (embeddedWallet) {
        const provider = await embeddedWallet.getEthereumProvider();
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${Number(11155111).toString(16)}` }],
        });
        const ethProvider = new ethers.providers.Web3Provider(provider);
        const walletBalance = await ethProvider.getBalance(
          embeddedWallet.address
        );
        const ethStringAmount = ethers.utils.formatEther(walletBalance);
        // setEmbeddedWallet(embeddedWallet.address);
        setUserWalletBalance(ethStringAmount);
      }
      const response = await fetch('https://dex-v3-api-aws.lootex.dev/api/v3/currency/all-pairs');
      const data = await response.json();
      setEthNumericValue(parseFloat(data.ETH))
      const walletNumericBalance = parseFloat(userWalletBalance);
      setEthValue(ethNumericValue * walletNumericBalance);

    }
  }, [ethNumericValue, userWalletBalance, wallets]);

  return (
    <div className="bg-gray-900 flex justify-center items-center min-h-screen">
      <div className="w-96 mx-auto mt-10 p-4 bg-[#1C1C1C] rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </Link>
          </div>
          <div className="border-b-2 border-pink-500 pb-1">交換</div>
          <div className="flex space-x-4 text-gray-400">
            <i className="fas fa-signal"></i>
            <i className="fas fa-sliders-h"></i>
            <i className="fas fa-cog"></i>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between items-center bg-[#2C2C2C] p-4 rounded-lg">
            <div>
              <input
                type='number'
                step="0.01"
                className="min-w-0 flex-auto rounded-md border-0  px-3.5 py-2 text-white shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="text-sm text-gray-400">~{ethValue.toFixed(3)}USD</div>
            </div>
            <div className="flex flex-col items-center space-x-2">
              <div className="flex items-center bg-[#3C3C3C] px-2 py-1 rounded-lg">
                <img src={`https://placehold.co/20x20`} alt={`${topCurrency} icon`} className="w-5 h-5" />
                <span className="ml-2">{topCurrency}</span>
                <i className="fas fa-chevron-down ml-1"></i>
              </div>
              <div className="text-xs text-gray-400">餘額: {userWalletBalance.slice(0, 6)} <span className="text-blue-500"></span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mx-auto  mt-5  " onClick={handleSwap}>
            <div className="flex justify-center mx-auto rounded-full p-4 hover:cursor-pointer hover:bg-[#2F51AC]">
              <SwapVertIcon />
            </div>
          </div>
          <div className="flex justify-center my-4">
            <i className="fas fa-arrow-down text-gray-400"></i>
          </div>
          <div className="flex justify-between items-center bg-[#2C2C2C] p-4 rounded-lg">
            <div>
              <input
                type='number'
                step="0.01"
                className="min-w-0 flex-auto rounded-md border-0  px-3.5 py-2 text-white shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="text-sm text-gray-400">~$3,736.58</div>
            </div>
            <div className="flex flex-col items-center space-x-2">
              <div className="flex items-center bg-[#3C3C3C] px-2 py-1 rounded-lg">
                <img src={`https://placehold.co/20x20`} alt={`${bottomCurrency} icon`} className="w-5 h-5" />
                <span className="ml-2">{bottomCurrency}</span>
                <i className="fas fa-chevron-down ml-1"></i>
              </div>
              <div className="text-xs text-gray-400">餘額: <span className="text-blue-500"></span></div>
            </div>
          </div>

          <div className="mt-4 text-gray-400">
            <div className="flex justify-between items-center">
              <span>匯率</span>
              <span>1 ETH = 1 WETH</span>
            </div>
            <div className="flex justify-between items-center mt-1">
            </div>
          </div>

          <div className="mt-6">
            <ContractWrite sendTransaction={sendTransaction} etherAmount={amount as unknown as string} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SwapComponent;
