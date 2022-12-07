import {
  useFeeData,
  useNetwork,
  useAccount,
  useContractRead,
  useContractWrite,
  useContractReads,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import Container from "~/components/containers/Container";
import { MaxValueField } from "~/components/FormFields";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { DateStatCard, NumberStatCard } from "~/components/StatCards";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { xenContract } from "~/lib/xen-contract";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { UTC_TIME } from "~/lib/helpers";
import toast from "react-hot-toast";
import { clsx } from "clsx";
import * as yup from "yup";
import GasEstimate from "~/components/GasEstimate";
import CardContainer from "~/components/containers/CardContainer";
import XENContext from "~/contexts/XENContext";
import { CountDataCard } from "~/components/StatCards";
import { merkle } from "~/lib/merkle";
const Web3 = require('web3');
const Mint = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const { userMint, feeData } = useContext(XENContext);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [reward, setReward] = useState(0);

  /*** CONTRACT READ SETUP  ***/
  interface MyObj {
    index: number;
    amount: string;
    proof: string[];
}
  /*** FORM SETUP ***/

const estimatedClaimAmount = () => {
  let result = JSON.stringify(merkle.claims != undefined ? merkle.claims[address as keyof typeof address] : 'titsErrors');
  if (result) {
      const parsed = JSON.parse(result) as MyObj;
    return parsed.amount.toString();
  } else {
    const XEN = 0
    return XEN.toString();
  }
}
//only works with valid account in Claims. (DUHH)
  const { data } = useContractRead({
    ...xenContract(chain),
    functionName: "getUserMint",
    overrides: { from: address },
    watch: true,

  });

  /*** FORM SETUP ***/

 const schema = yup
    .object()
    .shape({
    })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchAllFields = watch(); 
  const { handleSubmit: cHandleSubmit } = useForm();
  /*** CONTRACT WRITE SETUP ***/
  var parsed: MyObj = {
    index: 0,
    amount: "0",
    proof: []
  }
if(merkle.claims[address as keyof typeof address] != undefined)
{  
  let result = JSON.stringify(merkle.claims[address as keyof typeof address]);
  parsed = JSON.parse(result) as MyObj;
 }

 const { config: contractConfig, error: prepareError, isError: isPrepareError} = usePrepareContractWrite({
  
   ...xenContract(chain),
   functionName: "claim",
   args: [
     parsed.index,
     address,
     parsed.amount,
     parsed.proof
   ],
   onSuccess(data) {
    if (chain?.name != "PLS Testnet")
    {
      toast.custom( (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1587987072685522945/Y_fE_Ojk_400x400.jpg"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">

                  <p className="text-lg font-medium text-black-100">
                   Error
                  </p>
                  <p className="mt-1 text-md text-gray-500">
                    Connect to the PLS Testnet.
                  </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      console.log("Error: Switch to PLS Testnet.")
      setProcessing(true);
      setDisabled(true);
      setReward(Number(Web3.utils.fromWei(0, 'ether'))) ;
    }
    else {
      setProcessing(false);
      setDisabled(false);
      toast.custom( (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1587987072685522945/Y_fE_Ojk_400x400.jpg"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">

                  <p className="text-lg font-medium text-black-100">
                   Success!
                  </p>
                  <p className="mt-1 text-md text-gray-500">
                    Airdrop is Ready.
                  </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      console.log("Drop Ready")
        setReward(Number(Web3.utils.fromWei(estimatedClaimAmount().toString(), 'ether'))) ;
    }

  },
  onError(data) {
    setProcessing(true);
    setDisabled(true);

    console.log("MESSAGE: " + data.message);
    if (data.message = "execution reverted: Airdrop: Drop already claimed.")
    {
      router.push("/mint/2");
    //  console.log("Drop Already Claimed");
      toast.custom( (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1587987072685522945/Y_fE_Ojk_400x400.jpg"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
  
                  <p className="text-lg font-medium text-black-100">
                  Drop Not Available
                  </p>
                  <p className="mt-1 text-md text-gray-500">
                  Drop not Available to you.
                    <br></br> 
                  </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
    else if (data.message = "execution reverted: Airdrop: Invalid proof.")
    {
    //  console.log("Drop Already Claimed");
      toast.custom( (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1587987072685522945/Y_fE_Ojk_400x400.jpg"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
  
                  <p className="text-lg font-medium text-black-100">
                  Drop Invalid
                  </p>
                  <p className="mt-1 text-md text-gray-500">
                    Drop not Available.
                    <br></br>  Invalid Proof.
                    <br></br> 
                  </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }

    console.log(data.message)

    setReward(Number(Web3.utils.fromWei('0', 'ether'))) ;
  },
 });
  const { write } = useContractWrite({
    ...contractConfig,
    onSuccess(data) {
      setProcessing(false);
      setDisabled(false);
    },
    onError(data) {
      setProcessing(true);
      setDisabled(true);
    },
/*     onSettled(data){
      router.push("/mint/2");
    } */
    
  });
  const {} = useWaitForTransaction({
    onSuccess(data) {
      toast("Claim successful");
      router.push("/mint/2");
    },
  });
  const onSubmit = () => {
    write?.();
  };


  /*** USE EFFECT ****/
  useEffect(() => {

/*     if (!processing && address && data?.[1] == false) {
      setDisabled(false);
    } */
  }, [
    address,
    contractConfig?.request?.gasLimit,
    data,
    feeData?.gasPrice,
    processing,
  ]);

  return (
    <Container className="max-w-2xl">
      <div className="flew flex-row space-y-8 ">
        <ul className="steps w-full">
        <Link href="/mint/1">
            <a className="step step-neutral">Start Mint</a>
          </Link>


          <Link href="/mint/2">
            <a className="step">Finish Mint</a>
          </Link>
        </ul>

        <CardContainer>
        <div className="flex stats glass w-full text-neutral">
        <CountDataCard
                    title="Reward"
                    value={reward}
                    description="TRANCE"
                  />
                       </div>
          <form onSubmit={cHandleSubmit(onSubmit)}>

            <div className="flex flex-col space-y-4">
              <h2 className="card-title text-neutral">Claim Free Tokens</h2>

              <div className="form-control w-full">
                <button
                  type="submit"
                  className={clsx("btn glass text-neutral", {
                    loading: processing,
                  })}
                  //onClick={() => write?.()}
                  disabled={disabled}
                >
                  Start Mint
                </button>
              </div>
              <GasEstimate
                  feeData={feeData}
                  gasLimit={contractConfig?.request?.gasLimit}
                />
            </div>
          </form>
        </CardContainer>
      </div>
    </Container>
  );
};

export default Mint;