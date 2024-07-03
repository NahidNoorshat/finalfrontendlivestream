"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
// import Loader from "@/components/Loader/Loader"; // Assuming you have a Loader component

const HeadtoHead = ({ homeTeamId, awayTeamId }) => {
  const [headToHeadData, setHeadToHeadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadToHeadData = async () => {
      setLoading(true); // Start loading
      try {
        const options = {
          method: "GET",
          url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead",
          params: { h2h: `${homeTeamId}-${awayTeamId}` },
          headers: {
            "x-rapidapi-key":
              "7e9555999cmsh27c7d1203fc284bp113fe6jsn6971223d989e",
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        setHeadToHeadData(response.data);
      } catch (error) {
        console.error("Error fetching head-to-head data:", error);
        setError(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (homeTeamId && awayTeamId) {
      fetchHeadToHeadData();
    }
  }, [homeTeamId, awayTeamId]);

  if (loading) return <Loader />; // Display loader while fetching data
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <div className="bg-gray-800 text-white p-4 rounded-md">
        <h2 className="text-center text-2xl font-bold mb-4">Head to Head</h2>
        {headToHeadData && headToHeadData.response.length > 0 ? (
          <div>
            {headToHeadData.response.map((match) => (
              <div
                key={match.fixture.id}
                className="bg-secondary-color rounded-md overflow-hidden flex items-center justify-between w-full my-2 p-2"
              >
                <div className="flex flex-col gap-2 w-2/5 ">
                  <h1>{match.league.name}</h1>
                  <h2>
                    {new Date(match.fixture.date).toISOString().split("T")[0]}
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  <h1>{match.teams.home.name}</h1>
                  <h1>{match.teams.away.name}</h1>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{match.goals.home}</p>
                  <p>{match.goals.away}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No head-to-head data available.</p>
        )}
      </div>
    </div>
  );
};

export default HeadtoHead;
