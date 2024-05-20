import React, { useState } from "react";
import Background from "./Background";
import Hero from "./Hero";

const Data = () => {
  let heroData = [
    { text1: "패키지", text2: "패키지 패키지 패키지" },
    { text1: "항공", text2: "항공 항공 항공 항공" },
    { text1: "호텔", text2: "호텔 호텔 호텔 호텔 호텔" },
    { text1: "렌트카", text2: "렌트카 렌트카 렌트카 렌트카" },
  ];
  const [heroCount, sestHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  return (
    <div>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Hero 
      setPlayStatus={setPlayStatus}
      heroData={heroData[heroCount]}
      heroCount={heroCount}
      sestHeroCount={sestHeroCount}
      playStatus={playStatus}
      />
    </div>
  );
};

export default Data;
