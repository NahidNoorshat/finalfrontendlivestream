"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiAlignJustify, FiSettings } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const HeaderMain = () => {
  const [openmanue, setOpenmenue] = useState(false);
  const hendleNav = () => {
    setOpenmenue(!openmanue);
  };
  return (
    <>
      <div className="bg-primary-color w-full flex justify-center pt-3 pb-1 items-center">
        <div className="flex w-full lg:max-w-7xl justify-between px-3">
          <div className=" cursor-pointer ">
            <Link href="/LiveSchedule">
              <h1>Logo</h1>
            </Link>
          </div>
          <div className="font-latoFont italic  justify-evenly gap-1 hidden lg:flex lg:text-base  lg:gap-3">
            <Link href="/LiveSchedule">
              <h1>Live Schedule</h1>
            </Link>
            <Link href="/LiveStream">
              <h1>Live Stream</h1>
            </Link>
            <Link href="/Football">
              <h1>Football</h1>
            </Link>
            <Link href="/Basketball">
              <h1>Basketball</h1>
            </Link>
            <Link href="/OtherSports">
              <h1>Other Sports</h1>
            </Link>
          </div>
          <div className="flex justify-evenly gap-3 items-center">
            <div onClick={hendleNav} className="">
              <FiAlignJustify className="w-7 h-7 lg:hidden " />
            </div>

            <FiSettings className="w-[24px] h-[24px]" />
            <FaUser className="w-[24px] h-[24px]" />
          </div>
        </div>
      </div>
      {/* side bar start */}
      <div
        className={
          openmanue
            ? " fixed top-0 left-0 md:hidden h-screen w-[65%] bg-[#95caf3] p-10 ease-out duration-500 z-20  "
            : "fixed top-0 left-[-100%] p-10 ease-in duration-500"
        }
      >
        <div className=" flex items-center justify-end w-full">
          <div onClick={hendleNav} className=" cursor-pointer">
            <IoMdClose className=" h-6 w-6 " />
          </div>
        </div>
        <div className=" flex-col py-4">
          <ul>
            <Link href="LiveSchedule">
              <li
                onClick={() => setOpenmenue(false)}
                className=" hover:text-blue-700 cursor-pointer py-4"
              >
                Live Schedule
              </li>
            </Link>
            <Link href="/LiveStream">
              <li
                onClick={() => setOpenmenue(false)}
                className="hover:text-blue-700  cursor-pointer py-4"
              >
                Live Stream
              </li>
            </Link>
            <Link href="/Football">
              <li
                onClick={() => setOpenmenue(false)}
                className=" hover:text-blue-700 cursor-pointer py-4"
              >
                Football
              </li>
            </Link>
            <Link href="/Basketball">
              <li
                onClick={() => setOpenmenue(false)}
                className="hover:text-blue-700  cursor-pointer py-4"
              >
                Basketball
              </li>
            </Link>
            <Link href="/OtherSports">
              <li
                onClick={() => setOpenmenue(false)}
                className="hover:text-blue-700  cursor-pointer py-4"
              >
                Other Sports
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeaderMain;
