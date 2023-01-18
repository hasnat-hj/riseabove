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
import axios from "axios";
import { bidsModalShow } from "../../redux/counterSlice";


const Item = () => {
  const [imageModal, setImageModal] = useState(false);
  const [item, setItem] = useState();
  const [owner, setOwner] = useState();
  const [creator, setCreator] = useState();
  const [itemImage, setItemImage] = useState();
  const [address,setAddress]=useState(false)
  const [highestBid,setHighestBid]=useState(false)
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
   
    setItemImage(result.data.img);
    // console.log("itessssss", result.data, result.data.owner);
    setItem(result.data);
    setOwner(result.data.owner)
    setCreator(result.data.creator)


    const result2 = await axiosInstance
    .get(`/Anft/auctionBidHighest/${router.query.id}`)
    .catch((err) => console.log(err, "it has an error"));
    console.log(result2)
    setHighestBid(result2.data)
  };

 
 
  useEffect(() => {
 
      if(router.isReady&&router.query.id){

    
// setAddress(getAddress())
(async()=>{
console.log("helo..............................................")
setAddress(await getAddress());
await loadItem(router.query.id);
})()
      setId(router.query.id)
    
    
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
      <Meta title={`${pid} || Blenny | NFT Marketplace Next.js Template`} />
      {/*  <!-- Item --> */}
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
                 Price
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
                        {creator && (
                          <img
                            src={creator.profileImage?creator.profileImage:"/images/user/user_avatar.gif"}
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
                      Creator
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
                        {owner && (
                          <img
                            src={owner.profileImage?owner.profileImage:"/images/user/user_avatar.gif"} 
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
                    <Link href={`/user/${owner.address}`}>
                      <a className="text-accent block">
                        <span className="text-sm font-bold">
                          {owner.username}
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
                      <Link href={"/user/"+highestBid.address}>
                        <a className="text-accent text-sm font-bold">
                          {highestBid.address}
                        </a>
                      </Link>
                    </div>
                    <div className="mt-3 flex">
                      <figure className="mr-4 shrink-0">
                        <Link href="#">
                          <a className="relative block">
                            <img
                             src={highestBid&&highestBid.user.profileImage?highestBid.user.profileImage:"/images/user/user_avatar.gif"}
												
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
                            {item?.curbid} Matic
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
            onClick={() =>dispatch(bidsModalShow(item))}
                  >
                    Place Bid
                  </button>}
              </div>
              {/* <!-- end bid --> */}
            </div>
            {/* <!-- end details --> */}
            
          </div>
        {item&&  <ItemsTabs   item={item}/>}
        </div>
      </section>}
      {/* <!-- end item --> */}

      <More_items />
    </>
  );
};

export default Item;








