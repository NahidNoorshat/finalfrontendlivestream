"use client";

import React, { useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import HlsPlayer from "@/components/Players/HlsPlayer";
import { AdditionalDataContext } from "../../../context/AdditionalDataProvider";
import Image from "next/image";
import { FaTelegram, FaSquareWhatsapp } from "react-icons/fa6";
import MatchDetails from "@/components/MatchDetails/MatchDetails";
import InfoTab from "@/components/InfoTab/InfoTab";
import HeadtoHead from "@/components/HeadtoHead/HeadtoHead";
import Loader from "@/components/Loader/Loader";

const LiveStreaming = () => {
  const router = useRouter();
  const { additionalData, matchinfo } = useContext(AdditionalDataContext);
  const [vedioSrc, setVedioSrc] = useState("");
  const [fixtureData, setFixtureData] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [fixtureid, setFixtureid] = useState();
  const [loading, setLoading] = useState(true);
  const [homeTeamId, setHomeTeamID] = useState();
  const [awayTeamId, setAwayTeamID] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("fixtureid");
      const homeTeamid = localStorage.getItem("homeTeamId"); // Corrected key to match storage
      const awayTeamid = localStorage.getItem("awayTeamId"); // Corrected key to match storage
      setFixtureid(id);
      setHomeTeamID(homeTeamid); // Corrected state setting
      setAwayTeamID(awayTeamid); // Corrected state setting
    }
  }, [matchinfo]);

  const fetchFixtureData = async (id) => {
    if (id) {
      try {
        const response = await fetch(
          `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${id}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "7e9555999cmsh27c7d1203fc284bp113fe6jsn6971223d989e",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFixtureData(data?.response[0]);
        } else {
          console.error("Failed to fetch fixture data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching fixture data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (fixtureid) {
      fetchFixtureData(fixtureid);
      const interval = setInterval(() => {
        fetchFixtureData(fixtureid);
      }, 60000); // 60000 milliseconds = 1 minute

      return () => clearInterval(interval);
    }
  }, [fixtureid]);

  useEffect(() => {
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
  }, [router.asPath, additionalData]);

  console.log(fixtureData, "main data ********************");
  const startTime = fixtureData?.fixture?.timestamp;

  useEffect(() => {
    const updateRemainingTime = () => {
      if (!startTime) return;

      const currentTime = Math.floor(Date.now() / 1000);
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

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const renderFixtureDetails = useMemo(() => {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="flex text-blue-500 font-bold text-2xl">
          {fixtureData?.league?.name}
        </div>
        <div className="flex items-center mt-2 text-black">
          <div className="flex flex-col items-center">
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
          <div className="flex flex-col items-center">
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
    );
  }, [fixtureData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex justify-center py-7">
      <div className="w-full md:max-w-5xl flex flex-col items-center">
        {renderFixtureDetails}
        {vedioSrc ? (
          <HlsPlayer src={vedioSrc} startTime={1719363600} />
        ) : (
          <div className="w-full h-[30vh] bg-stone-700 mt-4 flex items-center justify-center">
            <h1 className="text-white">{remainingTime}</h1>
          </div>
        )}
        <div className="flex w-full justify-center gap-7 items-center mt-6">
          <div className="bg-primary-color p-2 overflow-hidden rounded-md">
            <FaTelegram className="w-16 h-16" />
          </div>
          <div className="bg-primary-color p-2 overflow-hidden rounded-md">
            <FaSquareWhatsapp className="w-16 h-16" />
          </div>
        </div>
        <div className="w-full max-w-4xl mt-7">
          <InfoTab items={items(fixtureData, homeTeamId, awayTeamId)} />
        </div>
      </div>
    </div>
  );
};

export default LiveStreaming;

const items = (fixtureData, homeTeamId, awayTeamId) => [
  {
    title: "Details",
    content: <MatchDetails fixtureData={fixtureData} />,
  },
  {
    title: "Head To Head",
    content: <HeadtoHead homeTeamId={homeTeamId} awayTeamId={awayTeamId} />,
  },
];
