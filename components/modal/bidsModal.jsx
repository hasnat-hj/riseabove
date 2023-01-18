import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bidsModalHide } from "../../redux/counterSlice";
import { loadContracts } from "../../contractABI/interact";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInterceptor";
import  Router  from "next/router";

const BidsModal = (id) => {
  
  const { bidsModal ,bidItem} = useSelector((state) => state.counter);
  console.log(bidItem);
  const dispatch = useDispatch();
  const [ETHAmount, setETHAmount] = useState();
  const [loading,setLoading]=useState(false)

  // const placeBid = async () => {
  //   const { auction, nft } = await loadContracts();

  //   if (ETHAmount == null) {
  //     toast.error("Enter Bid amount");
  //   } else {
  //     const options = { value: ethers.utils.parseEther(ETHAmount.toString()) };
  //     try {
  //       const bid = await (await auction.bid(nft.address, 6, options)).wait(); // replace 6 with token id nft token id
  //       if (!bid.events[2]) {
  //         toast.error("Transaction Failed");
  //       } else {
  //         // call API
		  
  //       }
  //     } catch (error) {
  //       toast.error(error.reason);
  //     }
  //   }
  // };
 const placeBid = async () => {
    const { auction, nft,address } = await loadContracts();
    console.log("placing bid......")
    
    setLoading(true)

    if (ETHAmount == null) {
      toast.error("Enter Bid amount");
    } else {
      const options = { value: ethers.utils.parseEther(ETHAmount.toString()) };
      try {
       console.log(address)
        const bid = await (await auction.bid(nft.address, bidItem.id, options)).wait(); // replace 6 with token id nft token id
  
      
        if (!bid.events[2]) {
          toast.error("Transaction Failed");
        } else {
          // call API
          console.log("fetching")

   
    const result= await  axiosInstance
          .put(`/Anft/auctionBid/${bidItem._id}`,{address,bid:ETHAmount})
          setLoading(false)
          if(result.status!==200)
          return toast.error("Error occured")
  console.log(result.data);

        toast.success("Placed Bid");
        dispatch(bidsModalHide())
        Router.reload()
        

      }
     } catch (error) {
      setLoading(false)
        toast.error(error.reason);
      }
    }
  
  };

  const handleEThAmount = (e) => {
    e.preventDefault();
    setETHAmount(e.target.value);
  };
  return (
    <div>
      <div className={bidsModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Place a bid
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(bidsModalHide())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                  Price
                </span>
              </div>

              <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-2 flex items-center overflow-hidden rounded-lg border">
                <div className="border-jacarta-100 bg-jacarta-50 flex flex-1 items-center self-stretch border-r px-2">
                  <span>
                  <img  src="/images/polygon-matic-logo.png" style={{width:15,marginRight:5}} alt="" />
                  </span>
                  <span className="font-display text-jacarta-700 text-sm">
                  MTC
                  </span>
                </div>

                <input
                  type="number"
                  className="focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inse dark:text-jacarta-700"
                  placeholder="Amount"
                  value={ETHAmount}
                  onChange={(e) => handleEThAmount(e)}
                />

                <div className="bg-jacarta-50 border-jacarta-100 flex flex-1 justify-end self-stretch border-l dark:text-jacarta-700">
                  <span className="self-center px-2 text-sm">{bidItem.curbid} MTC</span>
                </div>
              </div>

              <div className="text-right">
                <span className="dark:text-jacarta-400 text-sm">
                  {/* Balance: 0.0000 WETH */}
                </span>
              </div>

              {/* <!-- Terms --> */}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                />
                <label
                  htmlFor="terms"
                  className="dark:text-jacarta-200 text-sm"
                >
                  By checking this box, I agree to {"Xhibiter's"}{" "}
                  <a href="#" className="text-accent">
                    Terms of Service
                  </a>
                </label>
              </div>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
              {loading?
                    <div role="status">
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    {/* <span className="text-green">
                      {!success.status && success.message}
                      {success.status &&
                        success.message === "" &&
                        "Please wait your NFT creation take time..."}
                    </span> */}
                  </div>
              :  <button
                  type="button"
                  className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                  onClick={placeBid}
                >
                  Place Bid
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
