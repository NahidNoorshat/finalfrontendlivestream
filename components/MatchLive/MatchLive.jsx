"use client";

import React, { useContext, useEffect, useState } from "react";
import Star from "../../public/FilterIcons/StarIcon.svg";
import livetv from "../../public/Addbanner/livetv.svg";
import Ellipse2 from "../../public/Addbanner/Ellipse2.png";
import { useRouter } from "next/navigation";

import { AdditionalDataContext } from "../../context/AdditionalDataProvider";

import Image from "next/image";
import Loader from "../Loader/Loader";
// import Loader from "@/components/Loader/Loader"; // Import Loader component

const MatchLive = ({
  vedioSrc,
  team1Name,
  team1Image,
  team2Name,
  team2Image,
  fixtureid,
  homeTeamid,
  awayTeamid,
}) => {
  const router = useRouter();
  const { setAdditionalData, setMatchifo } = useContext(AdditionalDataContext);
  const [fixtureData, setFixtureData] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchFixtureData = async () => {
      setLoading(true); // Start loading
      try {
        if (fixtureid) {
          const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixtureid}`;
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
            setFixtureData(data.response[0]); // Assuming the API returns an array and you want the first item
          } else {
            console.error("Failed to fetch fixture data:", response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching fixture data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFixtureData();
  }, [fixtureid]);

  const getMatchStatus = (fixtureData) => {
    if (!fixtureData) return "";
    const { status, date } = fixtureData.fixture;
    const { home, away } = fixtureData.goals;

    let statusText = "";
    if (status.short === "NS") {
      statusText = new Date(date).toLocaleString();
    } else if (status.short === "FT") {
      statusText = "FT";
    } else {
      statusText = `${status.elapsed} minutes`;
    }

    let scoreText = "";
    if (home !== null && away !== null) {
      scoreText = ` ${home} - ${away}`;
    }

    return `${statusText}${scoreText}`;
  };

  const handleclick = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fixtureid", fixtureid);
      localStorage.setItem("homeTeamId", homeTeamid); // Store homeTeamId
      localStorage.setItem("awayTeamId", awayTeamid); // Store awayTeamId
    }
    const encodedTeam1Name = encodeURIComponent(team1Name);
    const encodedTeam2Name = encodeURIComponent(team2Name);
    setAdditionalData(vedioSrc);
    setMatchifo({ fixtureid, homeTeamid, awayTeamid, team1Name, team2Name });

    if (vedioSrc) {
      const encodedVideoSrc = encodeURIComponent(vedioSrc);
      router.push(`/LiveStreaming/${encodedTeam1Name}-vs-${encodedTeam2Name}`);
    } else {
      router.push(`/LiveStreaming/${encodedTeam1Name}-vs-${encodedTeam2Name}`);
    }
  };

  if (loading) {
    return <Loader />; // Display loader while fetching data
  }

  return (
    <>
      <div
        onClick={handleclick}
        className=" bg-primary-color w-full flex items-center justify-between rounded-md px-2 cursor-pointer my-2"
      >
        <div className="flex items-center gap-3 p-2">
          <Image src={Star} />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-full flex items-center">
                <Image
                  src={team1Image}
                  width={22}
                  height={22}
                  className="object-cover"
                />
              </div>
              <h1 className="text-sm">{team1Name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-full flex items-center">
                <Image
                  src={team2Image}
                  width={22}
                  height={22}
                  className="object-cover"
                />
              </div>
              <h1 className="text-sm">{team2Name}</h1>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div>{fixtureData && <div>{getMatchStatus(fixtureData)}</div>}</div>
          <div>
            <Image src={livetv} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchLive;
