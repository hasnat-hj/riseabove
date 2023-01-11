import "tippy.js/dist/tippy.css";

import Tippy from "@tippyjs/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ItemsTabs } from "../../components/component";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import Items_Countdown_timer from "../../components/items_countdown_timer";
import Meta from "../../components/Meta";
import axiosInstance from "../../utils/axiosInterceptor";
import More_items from "./more_items";
import { loadContracts } from "../../contractABI/interact";
import { ethers } from "ethers";
import { toast } from "react-toastify";


const Item = () => {
  const [imageModal, setImageModal] = useState(false);
  const [item, setItem] = useState();
  const [owner, setOwner] = useState();
  const [creator, setCreator] = useState();
  const [ownerImage, setOwnerImage] = useState();
  const [creatorImage, setCreatorImage] = useState();
  const [itemImage, setItemImage] = useState();
  const [modal,setModal]=useState(false)
  const [address,setAddress]=useState(false)
  const dispatch = useDispatch();
 
  const router = useRouter()
  const [pid,setId]=useState()

  // console.log("params", router.query.id);
 
 
  // router.query.id;

  const loadItem = async () => {
    const result = await axiosInstance
      .get(`/Anft/getAuctionNft/${router.query.id}`)
      .catch((err) => console.log(err, "it has an error"));

    console.log(result);
    // console.log("called", result.data);
    // const base64String = btoa(
    //   String.fromCharCode(...new Uint8Array(result.data.img.data.data))
    // );
    // console.log("image................................");
    // console.log(base64String);
    // const base64OwnerString = btoa(
    //   String.fromCharCode(
    //     ...new Uint8Array(result.data.owner.profileImage.data.data)
    //   )
    // );
    // setOwnerImage(base64OwnerString);
    // const base64CreatorString = btoa(
    //   String.fromCharCode(
    //     ...new Uint8Array(result.data.creator.profileImage.data.data)
    //   )
    // );
    // setCreatorImage();
    setItemImage(result.data.img);
    // console.log("itessssss", result.data, result.data.owner);
    setItem(result.data);
    // setOwner(result.data.owner);
    // setCreator(result.data.creator);
  };

  const placeBid = async () => {
    const { auction, nft } = await loadContracts();
    console.log("bid");
    const options = { value: ethers.utils.parseEther(item.minbid) };
    try {
      console.log("executed bid");
      const bid = await (
        await auction.bid(nft.address, item.id, options)
      ).wait();
      toast.success("Placed Successfully");
      if (!bid.events[2]) {
        toast.error("Transaction Failed");
      } else {
        // call API
      }
    } catch (error) {
      toast.error(error.reason);
    }
  };

  useEffect(() => {
    if(router.isReady){
      
// setAddress(getAddress())
(async()=>{
console.log("helo..............................................")
setAddress(await getAddress());
})()
      setId(router.query.id)
        loadItem(router.query.id);
    }
   
  }, [router.isReady]);


  const getAddress=async()=>{
    const {address } = await loadContracts();
    return address
  }
  // console.log({item},{user},userImage ,itemImage)
  console.log("creator user", creator);

  return (
    <>
      <Meta title={`${pid} || Riseabove | NFT Marketplace Next.js Template`} />
      {/*  <!-- Item --> */}
     { item&&<BidsModal values={{id:item.id,modal,setModal,price:item.minbid,address}} />}
     {item&& <section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}
          <div className="md:flex md:flex-wrap">
            {/* <!-- Image --> */}
            <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
              <button className=" w-full" onClick={() => setImageModal(true)}>
                {itemImage && (
                  <img
                    src={itemImage}
                    alt={item?.name}
                    className="rounded-2xl cursor-pointer  w-full"
                  />
                )}
              </button>

              {/* <!-- Modal --> */}
              <div
                className={imageModal ? "modal fade show block" : "modal fade"}
              >
                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                  {!!itemImage && (
                    <img
                      src={process.env.NEXT_PUBLIC_SERVER_URL+"/"+itemImage}
                      alt={item?.name}
                      className="h-full rounded-2xl"
                    />
                  )}
                </div>

                <button
                  type="button"
                  className="btn-close absolute top-6 right-6"
                  onClick={() => setImageModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-6 w-6 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                  </svg>
                </button>
              </div>
              {/* <!-- end modal --> */}
            </figure>

            {/* <!-- Details --> */}
            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              {/* <!-- Collection / Likes / Actions --> */}
              <div className="mb-3 flex">
                {/* <!-- Collection --> */}
                <div className="flex items-center">
                  <Link href="#">
                    <a className="text-accent mr-2 text-sm font-bold">
                      CryptoGuysNFT
                    </a>
                  </Link>
                  <span
                    className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                    data-tippy-content="Verified Collection"
                  >
                    <Tippy content={<span>Verified Collection</span>}>
                      <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                        <use xlinkHref="/icons.svg#icon-right-sign"></use>
                      </svg>
                    </Tippy>
                  </span>
                </div>

                {/* <!-- Likes / Actions --> */}
                <div className="ml-auto flex items-stretch space-x-2 relative">
                  {/* <Likes
										like={likes}
										classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4"
									/> */}

                  {/* <!-- Actions --> */}
                  <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" />
                </div>
              </div>

              <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
                {item?.name}
              </h1>

              <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Tippy content={<span>Matic</span>}>
                    <span className="-ml-1">
                      <svg className="icon mr-1 h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-ETH"></use>
                      </svg>
                    </span>
                  </Tippy>
                  <span className="text-green text-sm font-medium tracking-tight">
                    {item?.minbid} matic
                  </span>
                </div>
                <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                  Highest bid
                </span>
                <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                  1/1 available
                </span>
              </div>

              <p className="dark:text-jacarta-300 mb-10">{item?.description}</p>

              {/* <!-- Creator / Owner --> */}
              <div className="mb-8 flex flex-wrap">
                <div className="mr-8 mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href={`/user/${creator?.address}`}>
                      <a className="relative block">
                        {creatorImage && (
                          <img
                            src={`data:image/png;base64,${creatorImage}`}
                            alt={creator?.username}
                            className="rounded-2lg h-12 w-12"
                            loading="lazy"
                          />
                        )}
                        <div
                          className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                          data-tippy-content="Verified Collection"
                        >
                          <Tippy content={<span>Verified Collection</span>}>
                            <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                              <use xlinkHref="/icons.svg#icon-right-sign"></use>
                            </svg>
                          </Tippy>
                        </div>
                      </a>
                    </Link>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="text-jacarta-400 block text-sm dark:text-white">
                      Creator <strong>10% royalties</strong>
                    </span>
                    <Link href={`/user/${creator?.address}`}>
                      <a className="text-accent block">
                        <span className="text-sm font-bold">
                          {creator?.username}
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href={`/user/${owner?.address}`}>
                      <a className="relative block">
                        {!!creatorImage && (
                          <img
                            src={`data:image/png;base64,${ownerImage}`}
                            alt={owner?.username}
                            className="rounded-2lg h-12 w-12"
                            loading="lazy"
                          />
                        )}
                        <div
                          className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                          data-tippy-content="Verified Collection"
                        >
                          <Tippy content={<span>Verified Collection</span>}>
                            <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                              <use xlinkHref="/icons.svg#icon-right-sign"></use>
                            </svg>
                          </Tippy>
                        </div>
                      </a>
                    </Link>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="text-jacarta-400 block text-sm dark:text-white">
                      Owned by
                    </span>
                    <Link href={`/user/${item.owner}`}>
                      <a className="text-accent block">
                        <span className="text-sm font-bold">
                          {item.owner}
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <!-- Bid --> */}
              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                <div className="mb-8 sm:flex sm:flex-wrap">
                  {/* <!-- Highest bid --> */}
                  <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
                    <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                      <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                        Highest bid by{" "}
                      </span>
                      <Link href="/user/avatar_6">
                        <a className="text-accent text-sm font-bold">
                          0x695d2ef170ce69e794707eeef9497af2de25df82
                        </a>
                      </Link>
                    </div>
                    <div className="mt-3 flex">
                      <figure className="mr-4 shrink-0">
                        <Link href="#">
                          <a className="relative block">
                            <img
                              src="/images/avatars/avatar_4.jpg"
                              alt="avatar"
                              className="rounded-2lg h-12 w-12"
                              loading="lazy"
                            />
                          </a>
                        </Link>
                      </figure>
                      <div>
                        <div className="flex items-center whitespace-nowrap">
                          <Tippy content={<span>Matic</span>}>
                            <span className="-ml-1">
                            <img  src="/images/polygon-matic-logo.png" style={{width:15,marginRight:5}} alt="" />
                 
                            </span>
                          </Tippy>
                          <span className="text-green text-lg font-medium leading-tight tracking-tight">
                            {item?.minbid} Matic
                          </span>
                        </div>
                        <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                          ~10,864.10
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Countdown --> */}
                  <div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">
                    <span className="js-countdown-ends-label text-jacarta-400 dark:text-jacarta-300 text-sm">
                      Auction ends in
                    </span>
                    <Items_Countdown_timer time={+item?.createdAt} />
                  </div>
                </div>

              {address==item.owner?<h1>Nft Created by you</h1>
              :    <button
                    className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
            onClick={() => setModal(true)}
                  >
                    Place Bid
                  </button>}
              </div>
              {/* <!-- end bid --> */}
            </div>
            {/* <!-- end details --> */}
          </div>
          {/* <ItemsTabs /> */}
        </div>
      </section>}
      {/* <!-- end item --> */}

      <More_items />
    </>
  );
};

export default Item;



const BidsModal = ({values}) => {
  

const {id,modal,setModal,price,owner}=values
const [loading,setLoading]=useState(false)

  const [ETHAmount, setETHAmount] = useState(0);

  const placeBid = async () => {
    const { auction, nft } = await loadContracts();
    console.log("placing bid......")
    


    if (ETHAmount == null) {
      toast.error("Enter Bid amount");
    } else {
      const options = { value: ethers.utils.parseEther(ETHAmount.toString()) };
      try {
        setLoading(true)
        const bid = await (await auction.bid(nft.address, id, options)).wait(); // replace 6 with token id nft token id

        if (!bid.events[2]) {
          toast.error("Transaction Failed");
        } else {
          // call API
		  
        }

      } catch (error) {
        toast.error(error.reason);
      }
    }
    setLoading(false)
  };

  const handleEThAmount = (e) => {
    e.preventDefault();
    setETHAmount(e.target.value);
  };
  return (
    <div>
      <div className={modal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Place a bid
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {setModal(false)
                
                setETHAmount(0)
                }}
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
                    Matic
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
                  <span className="self-center px-2 text-sm">${price}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="dark:text-jacarta-400 text-sm">
                  Balance: 0.0000 Matic
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

