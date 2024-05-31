import Link from 'next/link';
import React from 'react';

const SwapComponent = () => {
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
              <div className="text-2xl">0</div>
              <div className="text-sm text-gray-400">~$3,736.58</div>
            </div>
            <div className="flex flex-col items-center space-x-2">
              <div className="flex items-center bg-[#3C3C3C] px-2 py-1 rounded-lg">
                <img src="https://placehold.co/20x20" alt="ETH icon" className="w-5 h-5" />
                <span className="ml-2">ETH</span>
                <i className="fas fa-chevron-down ml-1"></i>
              </div>
              <div className="text-xs text-gray-400">餘額: 0 <span className="text-blue-500">最大值</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <i className="fas fa-arrow-down text-gray-400"></i>
          </div>

          <div className="flex justify-between items-center bg-[#2C2C2C] p-4 rounded-lg">
            <div>
              <div className="text-2xl">0</div>
              <div className="text-sm text-gray-400">~$3,736.58</div>
            </div>
            <div className="flex flex-col items-center space-x-2">
              <div className="flex items-center bg-[#3C3C3C] px-2 py-1 rounded-lg">
                <img src="https://placehold.co/20x20" alt="WETH icon" className="w-5 h-5" />
                <span className="ml-2">WETH</span>
                <i className="fas fa-chevron-down ml-1"></i>
              </div>
              <div className="text-xs text-gray-400">餘額: 0 <span className="text-blue-500">最大值</span></div>
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
            <button className="w-full py-4 bg-[#2F51AC] rounded-lg">交換</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SwapComponent;
