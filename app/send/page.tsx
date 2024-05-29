import Link from 'next/link'
import React from 'react'

const Send = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-white">
      <Link href="/">
        <button className="absolute top-0 left-0 m-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </Link>
      <div className="flex flex-col flex-grow p-4 mt-8">
        <h2 className="mb-4 text-lg">How much do you want to send?</h2>
        <div>send</div>
        <div className="flex space-x-2 mb-4">
          <input className="flex-grow border p-2" type="text" placeholder="Enter amount" />
          <select className="border ">
            <option>ETH</option>
            {/* Other currency options */}
          </select>
        </div>
        <div>to</div>
        <input className="border p-2 mb-4" type="text" placeholder="Enter name or link" />
        <button className="mt-60 px-8 py-2 rounded-full bg-blue-500 text-white">
          Continue
        </button>
      </div>
    </div>)
}

export default Send