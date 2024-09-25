"use client";
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/app/Redux/store'; 
import Data from '@/app/components/data'; 

const Page = () => {
  return (
    <Provider store={store}>
      <div>
        <Data />
      </div>
    </Provider>
  );
};
export default Page;
