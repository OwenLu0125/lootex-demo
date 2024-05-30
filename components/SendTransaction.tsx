import { ethers } from "ethers";
import React from "react";

type Props = {
  sendTransaction: any;
  transactionAddress: string;
  etherAmount: string;
};

function SendTransaction({ sendTransaction, etherAmount, transactionAddress }: Props) {

  const sendTx = async () => {
    const weiValue = ethers.utils.parseEther(etherAmount);
    const hexWeiValue = ethers.utils.hexlify(weiValue);
    const unsignedTx = {
      to: transactionAddress,
      chainId: 11155111,
      value: hexWeiValue,
    };

    const txUiConfig = {
      header: "Send Transaction",
      buttonText: "Send",
    };

    if (transactionAddress) {
      await sendTransaction(unsignedTx, txUiConfig);
    }
  };

  return (
    <button
      onClick={sendTx}
      disabled={!transactionAddress}
      className='px-4 py-2 bg-sky-800 w-full text-white rounded-lg hover:bg-sky-900 mt-4'
    >
      Send
    </button>
  );
}

export default SendTransaction;