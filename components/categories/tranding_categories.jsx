/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import axiosInstance from '../../utils/axiosInterceptor';
import { HeadLine } from '../component';
import Trending_categories_items from './trending_categories_items';

const Tranding_category = () => {
  const [data, setData] = useState([]);
  const loadOnSaleItems = async () => {
    await axiosInstance
      .post("/nft/getNft", { isBuy: false })
      .then(res => {
        console.log("loaded", res.data);
        setData(res.data);
      })
      .catch(err => console.log(err, "it has an error"));
  };
  useEffect(() => {
    loadOnSaleItems();
  }, []);

  return (
    <section className="py-24">
      <div className="container">
        <HeadLine
          text="Trending categories"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/26a1.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        {/* trending categories */}
        <Trending_categories_items data={data} />
      </div>
    </section>
  );
};

export default Tranding_category;
