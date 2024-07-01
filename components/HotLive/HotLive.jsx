import React from "react";
import NewsImage from "../../public/latestnews.png";
import Image from "next/image";
import PlayIcon from "../../public/FilterIcons/PlayIcon.svg";

const HotLive = () => {
  return (
    <>
      <div className="flex gap-3 items-center w-full h-full">
        <div className="relative rounded-md overflow-hidden w-[120px] h-[80px]">
          <Image src={NewsImage} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src={PlayIcon} />
            {/* Center Icon */}
          </div>
          <div className="absolute top-0 right-0 p-1">
            <h1 className=" text-sm ">Live </h1>
            {/* Top-Left Icon */}
          </div>
        </div>
        <div className="flex flex-col">
          <h1>Copa America</h1>
          <h1>Brazil - Switzerland</h1>
          <h1>31-12-2024 06:00 AM</h1>
        </div>
      </div>
    </>
  );
};

export default HotLive;
