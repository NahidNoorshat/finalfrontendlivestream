"use client";

import React from "react";
import { FaTelegram, FaSquareWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className=" w-full bg-secondary-color flex justify-center bottom-0 p-2 ">
        <div className=" w-full max-w-7xl flex flex-col md:flex-row text-sm  ">
          <div className=" w-full md:w-2/3 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
            ducimus reiciendis quod debitis sequi aut, voluptates, eveniet
            velit, quo ut eligendi alias aliquam dolores a vitae hic quis ad
            quam.
          </div>
          <div className=" w-full md:w-1/3 flex items-center justify-center gap-x-3 gap-y-5 ">
            <div className=" flex items-center overflow-hidden rounded-md py-2 px-4 bg-[#00FFCE] text-black gap-2 ">
              <FaTelegram className=" w-6 h-6  " />
              <h1>Telegram</h1>
            </div>
            <div className=" flex items-center overflow-hidden rounded-md py-2 px-4 bg-[#00FFCE] text-black gap-2 ">
              <FaSquareWhatsapp className=" w-6 h-6  " />
              <h1>WhatsApp</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
