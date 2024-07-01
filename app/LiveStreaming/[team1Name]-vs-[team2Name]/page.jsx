"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HlsPlayer from "@/components/Players/HlsPlayer";
import { AdditionalDataContext } from "../../../context/AdditionalDataProvider";
import Image from "next/image";
import { FaTelegram, FaSquareWhatsapp } from "react-icons/fa6";

const LiveStreaming = () => {
  const router = useRouter();
  const [vedioSrc, setVedioSrc] = useState("");
  const { additionalData, matchinfo } = useContext(AdditionalDataContext);
  const [fixtureData, setFixtureData] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  console.log(additionalData, "this is checking about video src.");
  console.log(matchinfo.fixtureid, "this is checking about fixture id.");

  useEffect(() => {
    // Function to fetch fixture details
    const fetchFixtureData = async () => {
      if (matchinfo?.fixtureid) {
        try {
          const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${matchinfo.fixtureid}`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "7e9555999cmsh27c7d1203fc284bp113fe6jsn6971223d989e",
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data.response[0], "game info ..... ");
            setFixtureData(data.response[0]); // Assuming the API returns an array and you want the first item
          } else {
            console.error("Failed to fetch fixture data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching fixture data:", error);
        }
      }
    };

    fetchFixtureData();
  }, [matchinfo.fixtureid]);

  useEffect(() => {
    // Fetch video source on the client-side

    const fetchVideoSrc = async () => {
      if (additionalData) {
        setVedioSrc(additionalData);
      } else {
        const searchParams = new URLSearchParams(window.location.search);
        const vedioSrcParam = searchParams.get("vedioSrc");
        if (vedioSrcParam) {
          setVedioSrc(decodeURIComponent(vedioSrcParam));
        } else {
          console.error("No vedioSrc parameter found in the URL.");
        }
      }
    };

    fetchVideoSrc();
  }, [router.asPath]); // Re-run useEffect on route changes

  // counter for time stamp......
  const startTime = fixtureData?.fixture?.timestamp;
  console.log(startTime, "this is start time");
  useEffect(() => {
    const updateRemainingTime = () => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp (seconds)
      const timeDifference = startTime - currentTime;

      if (timeDifference <= 0) {
        setRemainingTime("The match has started!");
      } else {
        const days = Math.floor(timeDifference / (3600 * 24));
        const hours = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const minutes = Math.floor((timeDifference % 3600) / 60);
        const seconds = timeDifference % 60;

        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateRemainingTime(); // Initial call to update remaining time
    const interval = setInterval(updateRemainingTime, 1000); // Update remaining time every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [startTime]);

  if (!vedioSrc) {
    // If video source is not available, display a countdown and fixture details

    return (
      <>
        <div className="  w-full flex  justify-center  py-7 ">
          <div className=" w-full md:max-w-5xl flex flex-col items-center  ">
            <div className=" w-full flex flex-col items-center  ">
              <div className=" flex text-blue-500 font-bold text-2xl ">
                {fixtureData?.league?.name}
              </div>
              <div className="flex items-center mt-2 text-black ">
                <div className=" flex flex-col items-center  ">
                  <Image
                    src={fixtureData?.teams?.home?.logo}
                    alt={fixtureData?.teams?.home?.name}
                    width={50}
                    height={50}
                  />
                  <span className="mx-2">{fixtureData?.teams?.home?.name}</span>
                </div>

                <span className="mx-2">
                  {fixtureData?.score?.fulltime?.home} -{" "}
                  {fixtureData?.score?.fulltime?.away}
                </span>

                <div className=" flex flex-col items-center ">
                  <Image
                    src={fixtureData?.teams?.away?.logo}
                    alt={fixtureData?.teams?.away?.name}
                    width={50}
                    height={50}
                  />
                  <span className="mx-2">{fixtureData?.teams?.away?.name}</span>
                </div>
              </div>
            </div>
            <div className=" w-full h-[30vh] bg-stone-700 mt-4 flex items-center justify-center ">
              <h1 className=" text-white">{remainingTime}</h1>
            </div>
            <div className="flex w-full justify-center gap-7 items-center mt-6">
              <div className="bg-primary-color p-2 overflow-hidden rounded-md">
                <FaTelegram className="w-16 h-16" />
              </div>
              <div className="bg-primary-color p-2 overflow-hidden rounded-md">
                <FaSquareWhatsapp className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="  w-full flex  justify-center  py-7 ">
        <div className=" w-full md:max-w-5xl flex flex-col items-center  ">
          <div className=" w-full flex flex-col items-center  ">
            <div className=" flex text-blue-500 font-bold text-2xl ">
              {fixtureData?.league?.name}
            </div>
            <div className="flex items-center mt-2 text-black ">
              <div className=" flex flex-col items-center  ">
                <Image
                  src={fixtureData?.teams?.home?.logo}
                  alt={fixtureData?.teams?.home?.name}
                  width={50}
                  height={50}
                />
                <span className="mx-2">{fixtureData?.teams?.home?.name}</span>
              </div>

              <span className="mx-2">
                {fixtureData?.score?.fulltime?.home} -{" "}
                {fixtureData?.score?.fulltime?.away}
              </span>

              <div className=" flex flex-col items-center ">
                <Image
                  src={fixtureData?.teams?.away?.logo}
                  alt={fixtureData?.teams?.away?.name}
                  width={50}
                  height={50}
                />
                <span className="mx-2">{fixtureData?.teams?.away?.name}</span>
              </div>
            </div>
          </div>
          <HlsPlayer src={vedioSrc} startTime={1719363600} />;
          <div className="flex w-full justify-center gap-7 items-center mt-6">
            <div className="bg-primary-color p-2 overflow-hidden rounded-md">
              <FaTelegram className="w-16 h-16" />
            </div>
            <div className="bg-primary-color p-2 overflow-hidden rounded-md">
              <FaSquareWhatsapp className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveStreaming;
