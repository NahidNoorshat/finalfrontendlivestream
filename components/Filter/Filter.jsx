"use Client";

import Image from "next/image";
import React from "react";

const Filter = ({ title, Icons }) => {
  return (
    <>
      <div className=" w-[149px] h-[64px] flex items-center justify-center bg-[#2673DA] rounded-md font-bold text-2xl leading-7 ">
        {title && <h1>{title}</h1>}
        {Icons && <Image src={Icons} alt="Icon" className="w-7 h-7" />}
      </div>
    </>
  );
};

export default Filter;
