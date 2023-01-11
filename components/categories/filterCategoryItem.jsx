import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateTrendingCategoryItemData } from '../../redux/counterSlice';
import Collection_category_filter from '../collectrions/collection_category_filter';
import CategoryItem from './categoryItem';

const FilterCategoryItem = () => {
  const dispatch = useDispatch();
  const { trendingCategoryItemData } = useSelector(state => state.counter);
  useEffect(() => {
    dispatch(
      updateTrendingCategoryItemData(trendingCategoryItemData.slice(0, 8))
    );
  }, []);

  return (
    <div>
      {/* <!-- Filter --> */}
      <Collection_category_filter />
      <CategoryItem />
    </div>
  );
};

export default FilterCategoryItem;
