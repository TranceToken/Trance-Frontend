import {
  useNetwork,
  useAccount,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import Link from "next/link";
import Container from "~/components/containers/Container";
import GasEstimate from "~/components/GasEstimate";
import { MaxValueField, WalletAddressField } from "~/components/FormFields";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { xenContract } from "~/lib/xen-contract";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountDataCard } from "~/components/StatCards";
import {
  mintPenalty,
  UTC_TIME,
  WALLET_ADDRESS_REGEX,
} from "~/lib/helpers";
import toast from "react-hot-toast";
import { clsx } from "clsx";
import * as yup from "yup";
import CardContainer from "~/components/containers/CardContainer";
import XENContext from "~/contexts/XENContext";
import XENCryptoABI from "~/abi/XENCryptoABI";
let mintAmount = 0;
const Web3 = require('web3');
const Mint = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();

  const [disabled, setDisabled] = useState(true);
  const [activeStakeDisabled, setActiveStakeDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [penaltyPercent, setPenaltyPercent] = useState(0);
  const [penaltyXEN, setPenaltyXEN] = useState(0);
  const [reward, setReward] = useState(0);
  const { userMint, userStake, feeData } = useContext(XENContext);

  /*** FORM SETUP ***/
  interface MyObj {
    index: string;
    amount: number;
    proof: string[];
}
let parsed: MyObj = {index: "", amount: 0, proof: []};
//only works with valid account in Claims. (DUHH)


const { data } = useContractRead({
  ...xenContract(chain),
  functionName: "getUserMint",
  overrides: { from: address },
  watch: true,
  onSuccess(data)
  {
    console.log("Success " + data[1]);
    mintAmount = data[1];
  }
});


  // Claim
  const { handleSubmit: cHandleSubmit } = useForm();
  //console.log(Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')));
  const { config: configClaim } = usePrepareContractWrite({
    addressOrName: xenContract(chain).addressOrName,
    contractInterface: XENCryptoABI,
    functionName: "claimMintReward",
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
                      Minting is Ready!
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

  
        setReward(Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')));
       // setReward(Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')));
   
        if (Number(Web3.utils.fromWei(mintAmount.toString(), 'ether') > 0))
        {
          if (Number(Web3.utils.fromWei(mintAmount.toString(), 'ether'))  > 50000000)
          {
            setReward(Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')) / 500)  
            setPenaltyPercent(
              Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')) 
            / (Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')) / 500)
            );
          }
          if (Number(Web3.utils.fromWei(mintAmount.toString(), 'ether'))  > 100000000)
          {
  
            setPenaltyPercent(
              Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')) 
            / (Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')) / 1000)
            );
            setReward(Number(Web3.utils.fromWei(mintAmount.toString(), 'ether')) / 1000)
            
          }
        }
      }


     
    },
    onError(data) {
      setProcessing(true);
      setDisabled(true);
      if (data.message = "execution reverted: Claim: No mint exists")
      {
        router.push("/dashboard/941");
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
                    Minting Invalid
                    </p>
                    <p className="mt-1 text-md text-gray-500">
                    No Mint Exists.
                  
                    
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
      console.log(data.message);
      setReward(Number(Web3.utils.fromWei("0", 'ether'))) ;
    },
  });
  const { data: claimData, write: writeClaim } = useContractWrite({
    ...configClaim,
    onSuccess(data) {
      setProcessing(true);
      setDisabled(true);
    },
  });
  const handleClaimSubmit = () => {
    writeClaim?.();
  };
  const {} = useWaitForTransaction({
    hash: claimData?.hash,
    onSuccess(data) {
      toast("Claim mint successful");

      router.push("/stake/1");
    },
  });

  // Claim + Share

  const schemaClaimShare = yup
    .object()
    .shape({
      claimShareAddress: yup
        .string()
        .required("Crypto address required")
        .matches(WALLET_ADDRESS_REGEX, {
          message: "Invalid address",
          excludeEmptyString: true,
        }),
      claimSharePercentage: yup
        .number()
        .required("Percentage required")
        .positive("Percentage must be greater than 0")
        .max(100, "Maximum claim + share percentage: 100")
        .typeError("Percentage required"),
    })
    .required();

  const {
    register: cShareRegister,
    handleSubmit: cShareHandleSubmit,
    watch: cShareWatch,
    formState: { errors: cShareErrors, isValid: cShareIsValid },
    setValue: cShareSetValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaClaimShare),
  });
  const cShareWatchAllFields = cShareWatch();

  const { config: configClaimShare } = usePrepareContractWrite({
    addressOrName: xenContract(chain).addressOrName,
    contractInterface: XENCryptoABI,
    functionName: "claimMintRewardAndShare",
    args: [
      cShareWatchAllFields.claimShareAddress,
      cShareWatchAllFields.claimSharePercentage,
    ],
  });

  const { data: claimShareData, write: writeClaimShare } = useContractWrite({
    ...configClaimShare,
    onSuccess(data) {
      setProcessing(true);
      setDisabled(true);
    },
  });
  const handleClaimShareSubmit = () => {
    writeClaimShare?.();
  };
  const {} = useWaitForTransaction({
    hash: claimShareData?.hash,
    onSuccess(data) {
      toast("Claim mint and share successful");
      router.push("/stake/1");
    },
  });

  // Claim + Stake

  const schemaClaimStake = yup
    .object()
    .shape({
      claimStakePercentage: yup
        .number()
        .required("Percentage required")
        .positive("Percentage must be greater than 0")
        .max(100, "Maximum claim + stake percentage: 100")
        .typeError("Percentage required"),
      claimStakeDays: yup
        .number()
        .required("Days required")
        .max(1000, "Maximum stake days: 1000")
        .positive("Days must be greater than 0")
        .typeError("Days required"),
    })
    .required();

  const {
    register: cStakeRegister,
    handleSubmit: cStakeHandleSubmit,
    watch: cStakeWatch,
    formState: { errors: cStakeErrors, isValid: cStakeIsValid },
    setValue: cStakeSetValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaClaimStake),
  });
  const cStakeWatchAllFields = cStakeWatch();

  const { config: configClaimStake } = usePrepareContractWrite({
    addressOrName: xenContract(chain).addressOrName,
    contractInterface: XENCryptoABI,
    functionName: "claimMintRewardAndStake",
    args: [
      cStakeWatchAllFields.claimStakePercentage,
      cStakeWatchAllFields.claimStakeDays,
    ],
  });

  const { data: claimStakeData, write: writeClaimStake } = useContractWrite({
    ...configClaimStake,
    onSuccess(data) {
      setProcessing(true);
      setDisabled(true);
    },
  });

  const handleClaimStakeSubmit = () => {
    writeClaimStake?.();
  };
  const {} = useWaitForTransaction({
    hash: claimStakeData?.hash,
    onSuccess(data) {
      toast("Claim mint and stake successful");
      router.push("/stake/2");
    },
  });
let i = 0;

  /*** USE EFFECT ****/
  useEffect(() => {
    if (
      address 
      && data
    ) {
      if (!processing && data?.[1]==true) {
        setDisabled(false);
      }
    }



    if (address && userStake && userStake.term.toNumber() == 0) {
      setActiveStakeDisabled(false);
    }
  }, [
    activeStakeDisabled,
    address,
    processing,
    userMint,
    userStake,
    cShareIsValid,
    cStakeIsValid,
    configClaimShare,
    configClaimStake, 
  ]);

  return (
    <Container className="max-w-2xl">
      <div className="flew flex-row space-y-8 ">
        <ul className="steps w-full">
          <Link href="/mint/1">
            <a className="step step-neutral">Start Mint</a>
          </Link>

          <Link href="/mint/2">
            <a className="step step-neutral">Finish Mint</a>
          </Link>
        </ul>

        <CardContainer>
          <div className="flex flex-col w-full border-opacity-50">
            <form onSubmit={cHandleSubmit(handleClaimSubmit)}>
              <div className="flex flex-col space-y-4">
                <h2 className="card-title text-neutral">Claim Mint</h2>

                <div className="flex stats glass w-full text-neutral">
                  <CountDataCard
                    title="Reward"
                    value={reward}
                    description="TRANCE"
                  />
                  <CountDataCard
                    title="Penalty"
                    value={penaltyPercent}
                    suffix="%"
                    descriptionNumber={penaltyXEN}
                    descriptionNumberSuffix=" TRANCE"
                  />
                </div>

                <div className="form-control w-full">
                  <button
                    type="submit"
                    className={clsx("btn glass text-neutral", {
                      loading: processing,
                    })}
                    disabled={disabled}
                  >
                    Claim Mint
                  </button>
                </div>

                <GasEstimate
                  feeData={feeData}
                  gasLimit={configClaim?.request?.gasLimit}
                />
              </div>
            </form>
          </div>
        </CardContainer>

     
        <div className="divider">OR</div>
     
        <CardContainer>
          <div className="flex flex-col w-full border-opacity-50">
            <form onSubmit={cShareHandleSubmit(handleClaimShareSubmit)}>
              <div className="flex flex-col space-y-4">
                <h2 className="card-title text-neutral">Claim Mint + Share</h2>

                <div className="flex stats glass w-full text-neutral">
                  <CountDataCard
                    title="Reward"
                    value={reward}
                    description="TRANCE"
                  />
                  <CountDataCard
                    title="Penalty"
                    value={penaltyPercent}
                    suffix="%"
                    descriptionNumber={penaltyXEN}
                    descriptionNumberSuffix=" TRANCE"
                  />
                </div>

                <MaxValueField
                  title="PERCENTAGE"
                  description="Stake percentage"
                  decimals={0}
                  value={100}
                  disabled={disabled}
                  errorMessage={
                    <ErrorMessage
                      errors={cShareErrors}
                      name="claimSharePercentage"
                    />
                  }
                  register={cShareRegister("claimSharePercentage")}
                  setValue={cShareSetValue}
                />

                <WalletAddressField
                  disabled={disabled}
                  errorMessage={
                    <ErrorMessage
                      errors={cShareErrors}
                      name="claimShareAddress"
                    />
                  }
                  register={cShareRegister("claimShareAddress")}
                />

                <div className="form-control w-full">
                  <button
                    type="submit"
                    className={clsx("btn glass text-neutral", {
                      loading: processing,
                    })}
                    disabled={disabled}
                  >
                    Claim Mint + Share
                  </button>
                </div>

                <GasEstimate
                  feeData={feeData}
                  gasLimit={configClaimShare?.request?.gasLimit}
                />
              </div>
            </form>
          </div>
        </CardContainer>

   
        <div className="divider">OR</div>
     
        <CardContainer>
          <div className="flex flex-col w-full border-opacity-50">
            <form onSubmit={cStakeHandleSubmit(handleClaimStakeSubmit)}>
              <div className="flex flex-col space-y-4">
                <h2 className="card-title text-neutral">Claim Mint + Stake</h2>

                <div className="flex stats glass w-full text-neutral">
                  <CountDataCard
                    title="Reward"
                    value={reward}
                    description="TRANCE"
                  />
                  <CountDataCard
                    title="Penalty"
                    value={penaltyPercent}
                    suffix="%"
                    descriptionNumber={penaltyXEN}
                    descriptionNumberSuffix=" TRANCE"
                  />
                </div>

                <MaxValueField
                  title="PERCENTAGE"
                  description="Stake percentage"
                  decimals={0}
                  value={100}
                  disabled={disabled || activeStakeDisabled}
                  errorMessage={
                    <ErrorMessage
                      errors={cStakeErrors}
                      name="claimStakePercentage"
                    />
                  }
                  register={cStakeRegister("claimStakePercentage")}
                  setValue={cStakeSetValue}
                />

                <MaxValueField
                  title="DAYS"
                  description="Stake days"
                  decimals={0}
                  value={1000}
                  disabled={disabled || activeStakeDisabled}
                  errorMessage={
                    <ErrorMessage errors={cStakeErrors} name="claimStakeDays" />
                  }
                  register={cStakeRegister("claimStakeDays")}
                  setValue={cStakeSetValue}
                />

                <div className="form-control w-full">
                  <button
                    type="submit"
                    className={clsx("btn glass text-neutral", {
                      loading: processing,
                    })}
                    disabled={disabled || activeStakeDisabled}
                  >
                    Claim Mint + Stake
                  </button>
                </div>

               <GasEstimate
                  feeData={feeData}
                  gasLimit={configClaimStake?.request?.gasLimit}
                /> 
              </div>
            </form>
          </div>
        </CardContainer>
             
      </div> 
                  
    </Container>
  );
};

export default Mint;