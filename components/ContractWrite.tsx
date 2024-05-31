'use client';
import { encodeFunctionData } from 'viem';
import { ethers } from "ethers";


export const wagmigotchiABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'guy', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  { payable: true, stateMutability: 'payable', type: 'fallback' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', internalType: 'address', type: 'address' },
      { indexed: true, name: 'guy', internalType: 'address', type: 'address' },
      { indexed: false, name: 'wad', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', internalType: 'address', type: 'address' },
      { indexed: true, name: 'dst', internalType: 'address', type: 'address' },
      { indexed: false, name: 'wad', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'dst', internalType: 'address', type: 'address' },
      { indexed: false, name: 'wad', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', internalType: 'address', type: 'address' },
      { indexed: false, name: 'wad', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Withdrawal',
    type: 'event',
  },
];

type Props = {
  sendTransaction: any;
  etherAmount: string;
};


const ContractWrite = ({ sendTransaction, etherAmount }: Props) => {

  const sendTx = async () => {
    const weiValue = ethers.utils.parseEther(etherAmount.toString());
    const hexWeiValue = ethers.utils.hexlify(weiValue);

    const data = encodeFunctionData({
      abi: wagmigotchiABI,
      functionName: 'deposit'
    })
    const transactionRequest = {
      to: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
      data: data,
      value: hexWeiValue, // Only necessary for payable methods
    };

    const txUiConfig = {
      header: "Send Transaction",
      buttonText: "Send",
    };

    if (etherAmount) {
      await sendTransaction(transactionRequest, txUiConfig);
    }

  }

  return (
    <button className="w-full py-4 bg-[#2F51AC] rounded-lg"
      onClick={sendTx}
      disabled={!etherAmount}
    >
      交換
    </button>
  );
};

export default ContractWrite;
