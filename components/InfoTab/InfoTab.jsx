"use client";
import React, { useState } from "react";

const InfoTab = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col gap-3 px-1">
      <div className="flex w-full  bg-[#FFFF] items-center rounded-full overflow-hidden ">
        {items.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 focus:outline-none rounded-full font-customSndFont ${
              index === activeTab
                ? "bg-blue-500 text-white w-full "
                : "text-gray-700 hover:bg-gray-100 w-full"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{items[activeTab].content}</div>
    </div>
  );
};

export default InfoTab;
