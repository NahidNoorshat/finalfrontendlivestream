"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { FaTelegram, FaSquareWhatsapp } from "react-icons/fa6";
import "./hlsstyle.css";

import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";

const HlsPlayer = ({ src, startTime }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [streams, setStreams] = useState([]);
  // const [currentStream, setCurrentStream] = useState("");
  const [fixtures, setFixtures] = useState({ today: [], nextDay: [] });
  const [currentStream, setCurrentStream] = useState("");
  const [matchDetails, setMatchDetails] = useState(null); // State to hold match details

  useEffect(() => {
    if (videoRef.current && src) {
      const video = videoRef.current;
      let hls;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setHasError(true);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
        video.addEventListener("error", () => {
          setHasError(true);
        });
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [src]);

  return (
    <>
      <div className="w-full flex items-center justify-center mt-9">
        {hasError ? (
          <div className="w-full max-w-5xl p-4 bg-red-500 text-white text-center">
            {remainingTime ? (
              <>
                The video feed is currently unavailable. Time remaining until
                the feed starts: {remainingTime}
              </>
            ) : (
              <>
                The video feed is currently unavailable. Please try again later.
              </>
            )}
          </div>
        ) : (
          <video ref={videoRef} controls className="w-full h-full max-w-5xl" />
        )}
      </div>
    </>
  );
};

export default HlsPlayer;
