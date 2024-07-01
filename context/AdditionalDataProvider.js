"use client";

import React, { createContext, useContext, useState } from "react";

export const AdditionalDataContext = createContext();

// export const useAdditionalData = () => {
//   return useContext(AdditionalDataContext);
// };
const AdditionalDataProvider = ({ children }) => {
  const [additionalData, setAdditionalData] = useState(null);
  const [matchinfo, setMatchifo] = useState([]);

  return (
    <AdditionalDataContext.Provider
      value={{ additionalData, setAdditionalData, matchinfo, setMatchifo }}
    >
      {children}
    </AdditionalDataContext.Provider>
  );
};

export default AdditionalDataProvider;
