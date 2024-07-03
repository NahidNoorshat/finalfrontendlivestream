import React from "react";

const StatBar = ({ homeValue, awayValue, isPercentage }) => {
  const homePercentage = isPercentage
    ? parseFloat(homeValue)
    : (homeValue * 100) / (homeValue + awayValue);
  const awayPercentage = isPercentage
    ? parseFloat(awayValue)
    : (awayValue * 100) / (homeValue + awayValue);

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="relative h-2 bg-gray-600 rounded-md">
        <div
          className="absolute right-0 h-full bg-yellow-500 rounded-md"
          style={{ width: `${homePercentage}%` }}
        ></div>
      </div>
      <div className="relative h-2 bg-gray-600 rounded-md">
        <div
          className="absolute left-0 h-full bg-[#2596be] rounded-md"
          style={{ width: `${awayPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const MatchDetails = ({ fixtureData }) => {
  const data = fixtureData?.statistics;

  const homeTeamStats = data[0]?.statistics;
  const awayTeamStats = data[1]?.statistics;

  const statLabels = homeTeamStats?.map((stat) => stat?.type);

  const getStatValue = (stats, label) => {
    const stat = stats?.find((stat) => stat?.type === label);
    return stat ? stat?.value : 0;
  };

  return (
    <div className="">
      <div className="bg-gray-800 text-white p-4 rounded-md">
        <h2 className="text-center text-2xl font-bold mb-4">Match Stats</h2>
        {statLabels?.map((label, index) => {
          const homeValue = getStatValue(homeTeamStats, label);
          const awayValue = getStatValue(awayTeamStats, label);

          // Handle percentage values
          const isPercentage =
            typeof homeValue === "string" && homeValue.includes("%");

          return (
            <div key={index} className="mb-2">
              <div className="flex justify-between mb-1">
                <span>{homeValue}</span>
                <span>{label}</span>
                <span>{awayValue}</span>
              </div>
              {!isPercentage ? (
                <StatBar
                  homeValue={homeValue}
                  awayValue={awayValue}
                  isPercentage={false}
                />
              ) : (
                <StatBar
                  homeValue={homeValue}
                  awayValue={awayValue}
                  isPercentage={true}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchDetails;
