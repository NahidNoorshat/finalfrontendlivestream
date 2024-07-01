import Image from "next/image";
import React from "react";
import NewsImage from "../../public/latestnews.png";

const LatestNews = () => {
  return (
    <>
      <div className="flex gap-3 items-center w-full h-full ">
        <div className="rounded-md overflow-hidden w-[120px] h-[80px]">
          <Image src={NewsImage} className="w-full h-full object-cover" />
        </div>
        <div className="text-sm flex-1">
          <h1>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            maiores ex, ipsam cum error eveniet.
          </h1>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
