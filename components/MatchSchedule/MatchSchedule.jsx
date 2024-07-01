import Image from "next/image";
import React from "react";
import Barca from "../../public/LiveScore/barca.svg";
import Real from "../../public/LiveScore/real.svg";

const MatchSchedule = ({ homeTeam, awayTeam }) => {
  return (
    <>
      <div className=" w-full rounded-md bg-secondary-color  p-2 flex flex-col gap-3 my-2 ">
        <div className=" flex  ">
          <div className=" w-[17px] border-l-4 border-[#00FFCE]   "></div>
          <h1>Schedule Live Sports</h1>
        </div>
        <div className=" bg-primary-color p-2 rounded-md ">
          <div className=" flex flex-col gap-y-3 ">
            <div className=" flex items-center justify-between">
              <div className=" flex items-center gap-2 ">
                <h1>19:00</h1>
                <h1> Copa America</h1>
              </div>

              <div className=" flex items-center gap-1 ">
                <Image src={Barca} className=" w-[19px] h-[21] " />
                <h1>Vs</h1>
                <Image src={Real} className="w-[19px] h-[21]" />
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-between my-1 ">
            <div className=" w-[125px] flex items-center justify-center px-2 py-1 overflow-hidden rounded-md bg-[#1B3C66] ">
              <h1>Home</h1>
            </div>
            <div className=" w-[125px] flex items-center justify-center px-2 py-1 overflow-hidden rounded-md bg-[#1B3C66] ">
              <h1>Away</h1>
            </div>
          </div>
          <div className=" flex items-center justify-between my-1 ">
            <div className=" w-[125px] flex items-center justify-center px-2 py-1 overflow-hidden rounded-md bg-[#1B3C66] ">
              <h1>{homeTeam}</h1>
            </div>
            <div className=" w-[125px] flex items-center justify-center px-2 py-1 overflow-hidden rounded-md bg-[#1B3C66] ">
              <h1>{awayTeam}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchSchedule;
