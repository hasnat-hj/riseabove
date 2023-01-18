import 'swiper/css';
import 'swiper/css/navigation';
import 'tippy.js/dist/tippy.css';

import React, { useEffect, useState } from 'react';

import axiosInstance from '../../utils/axiosInterceptor';
import BidsCarousel from '../carousel/bidsCarousel';
import { HeadLine } from '../component';

const Bids = ({ classes = "pt-10 pb-24", bgWhite }) => {
  const [data, setData] = useState([]);

  const loadOnSaleItems = async () => {
    await axiosInstance
      .get("/Anft/getAuctionNft")
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.log(err, "it has an error"));
  };
  useEffect(() => {
    loadOnSaleItems();
  }, []);
  return (
    <section className={classes}>
      {/* <!-- Hot Bids --> */}
      {bgWhite &&
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full" />
        </picture>}
      <div className="container">
        <HeadLine
          text="Hot Bids"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          <BidsCarousel data={data} />
        </div>
      </div>
      {/* <!-- end hot bids --> */}
    </section>
  );
};

export default Bids;
