import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

interface IGrinder {
  grindSetting: number;
  onSwiping: (eventData: any) => void;
}

const Grinder: React.FC<IGrinder> = ({ grindSetting, onSwiping }) => {
  const [rotation, setRotation] = useState(-80 + grindSetting * 9);
  useEffect(() => {
    setRotation(-80 + grindSetting * 9);
  }, [grindSetting]);

  const config = {
    delta: 20, // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: true, // call e.preventDefault *See Details*
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      onSwiping(eventData);
    },
    ...config,
  });

  return (
    <div className="h-full w-full flex justify-center relative overflow-hidden">
      <span
        {...handlers}
        className="absolute cursor-pointer mt-24 md:mt-32 h-1/3 z-10 w-1/2 md:w-1/3"
      ></span>
      <img
        className="h-5/6 absolute"
        alt="fellow ode coffee grinder"
        src="/img/ode.png"
      />
      <img
        style={{
          transformOrigin: "50.3% 35.6%",
          transform: `rotate(${rotation}deg)`,
        }}
        className="absolute h-5/6"
        alt="fellow ode coffee grinder dial"
        src="/img/ode_dial.png"
      />
    </div>
  );
};

export default Grinder;
