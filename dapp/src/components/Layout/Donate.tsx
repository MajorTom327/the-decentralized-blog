import React, { useState } from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import { FaEthereum } from "react-icons/fa";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import { parseEther } from "ethers";
import { blog } from "../../contracts";
import { always, gte, isNil, lte, when } from "ramda";

const MINIMAL_DONATION = 0.000001;
const STEP_DONATION = 0.00001;

export const Donate: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState(0.000001);

  const { config } = usePrepareSendTransaction({
    to: blog.address,
    value: parseEther(
      when(gte(MINIMAL_DONATION), always(MINIMAL_DONATION))(amount).toFixed(18)
    ),
  });

  const { sendTransaction } = useSendTransaction({
    ...config,
    onSuccess: () => setIsSending(false),
    onError: (e) => {
      console.log(e);
      setIsSending(false);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected) {
      return open();
    }

    setIsSending(true);
    if (!isNil(sendTransaction)) {
      sendTransaction();
    }
  };

  return (
    <>
      <Card>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Donate</h1>
          <form
            onSubmit={(e) => {
              void onSubmit(e);
            }}
          >
            <div className="flex">
              <input
                type="number"
                step={MINIMAL_DONATION}
                defaultValue={amount}
                onChange={(e) => {
                  if (lte(Number(e.target.value), MINIMAL_DONATION)) {
                    return setAmount(MINIMAL_DONATION);
                  }
                  setAmount(Number(e.target.value));
                }}
                min={MINIMAL_DONATION}
                max={100}
                className="w-full p-2 rounded-l mb-2"
                placeholder="Amount"
                name="amount"
              />
              <div className="px-2 text-xl border items-center flex rounded-r bg-base-300 mb-2">
                <FaEthereum />
              </div>
            </div>
            {isConnected ? (
              <Button type="submit" disabled={isSending} loading={isSending}>
                Send
              </Button>
            ) : (
              <Web3Button />
            )}
          </form>
        </div>
      </Card>
    </>
  );
};

Donate.defaultProps = {};

export default Donate;
