"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [newMessage, setNewMessage] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Guestbook",
    functionName: "postMessage",
    args: [newMessage],
    onBlockConfirmation: txnReceipt => {
      console.log("🎉 Message sent!", txnReceipt.blockHash);
      setNewMessage("");
    },
  });

  const { data: allMessages } = useScaffoldContractRead({
    contractName: "Guestbook",
    functionName: "getAllMessages",
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">Web3 Guestbook</span>
        </h1>
        <div className="space-y-4">
          {allMessages
            ?.slice()
            .reverse()
            .map((msg, index) => (
              <div key={index} className="bg-base-300 p-4 rounded-lg">
                <p className="font-semibold break-words">"{msg.message}"</p>
                <p className="text-sm text-gray-400 mt-2">From: {msg.sender}</p>
              </div>
            ))}
        </div>
        <div className="mt-8">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your message here..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button
            className="btn btn-primary w-full mt-2"
            onClick={() => writeAsync()}
            disabled={isLoading || !newMessage.trim()}
          >
            {isLoading ? <span className="loading loading-spinner"></span> : "Post Message"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
