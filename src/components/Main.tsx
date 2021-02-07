import React, { useState, useEffect } from "react";
import Grinder from "./Grinder";
import Selection from "./Selection";
import throttle from "lodash.throttle";
import { CoffeeListContext } from "../store/CoffeeListContext";

const Main = () => {
  const [grindSetting_V60, setGrindSetting_V60] = useState<number>(0);
  const [grindSetting_Aeropress, setGrindSetting_Aeropress] = useState<number>(
    0
  );
  const [brewMethod, setBrewMethod] = useState<"V60" | "Aeropress">("V60");
  const [availableAtHome, setAvailableAtHome] = useState<boolean>(false);
  const [saveBtnVisible, setSaveBtnVisible] = useState(false);
  const { selectedCoffee, setCoffee } = React.useContext(CoffeeListContext);

  const handleGrindSettingsChange = throttle(
    (eventData: any) => {
      let currentSetting =
        brewMethod === "V60" ? grindSetting_V60 : grindSetting_Aeropress;
      let setCurrentSetting =
        brewMethod === "V60" ? setGrindSetting_V60 : setGrindSetting_Aeropress;
      if (
        eventData.dir === "Right" &&
        !eventData.first &&
        currentSetting < 30
      ) {
        setCurrentSetting(currentSetting + 1);
        selectedCoffee && setSaveBtnVisible(true);
      } else if (
        eventData.dir === "Left" &&
        !eventData.first &&
        currentSetting > 0
      ) {
        setCurrentSetting(currentSetting - 1);
        selectedCoffee && setSaveBtnVisible(true);
      }
    },
    100,
    { leading: false }
  );

  const handleGrinderButtonClick = (direction: "plus" | "minus") => {
    let currentSetting =
      brewMethod === "V60" ? grindSetting_V60 : grindSetting_Aeropress;
    let setCurrentSetting =
      brewMethod === "V60" ? setGrindSetting_V60 : setGrindSetting_Aeropress;
    if (direction === "minus" && currentSetting > 0) {
      setCurrentSetting(currentSetting - 1);
      selectedCoffee && setSaveBtnVisible(true);
    } else if (direction === "plus" && currentSetting < 30) {
      setCurrentSetting(currentSetting + 1);
      selectedCoffee && setSaveBtnVisible(true);
    }
  };

  const saveChanges = () => {
    setSaveBtnVisible(false);
    setCoffee(selectedCoffee.value, {
      v60_setting: grindSetting_V60,
      aeropress_setting: grindSetting_Aeropress,
      available_at_home: availableAtHome,
    });
  };

  useEffect(() => {
    if (selectedCoffee) {
      console.log(selectedCoffee);
      setAvailableAtHome(selectedCoffee.available_at_home);
      setGrindSetting_V60(selectedCoffee.v60_setting);
      setGrindSetting_Aeropress(selectedCoffee.aeropress_setting);
    }
  }, [selectedCoffee]);

  useEffect(() => {
    if (selectedCoffee) {
      if (availableAtHome !== selectedCoffee.available_at_home) {
        setSaveBtnVisible(true);
      } else {
        setSaveBtnVisible(false);
      }
    }
  }, [availableAtHome, selectedCoffee]);

  return (
    <>
      <button
        onClick={() => saveChanges()}
        className={`styled-save-btn ${
          saveBtnVisible && "styled-save-btn-visible"
        }`}
      >
        SAVE CHANGES
      </button>
      <Grinder
        onPlusClick={() => handleGrinderButtonClick("plus")}
        onMinusClick={() => handleGrinderButtonClick("minus")}
        onSwiping={(eventData) => handleGrindSettingsChange(eventData)}
        grindSetting={
          brewMethod === "V60" ? grindSetting_V60 : grindSetting_Aeropress
        }
      />
      <div className="w-5/6 md:w-1/2 lg:w-1/3 items-center justify-between h-1/6 mb-2">
        <Selection className="w-full mb-5" />
        <div className="w-full h-1/2 flex items-center overflow-hidden">
          <div className="w-7/12">
            <input
              type="checkbox"
              checked={availableAtHome}
              onChange={() => setAvailableAtHome(!availableAtHome)}
            />
            <span className="text-black ml-3">In Stock at Home</span>
          </div>
          <div className="w-5/12 flex h-full">
            <img
              onClick={() => setBrewMethod("V60")}
              className={`styled-brewing-icon ${
                brewMethod === "V60" && "styled-brewing-icon-active"
              }`}
              alt="V60 icon"
              src="/icon/v60.svg"
            />
            <img
              onClick={() => setBrewMethod("Aeropress")}
              className={`styled-brewing-icon ${
                brewMethod === "Aeropress" && "styled-brewing-icon-active"
              }`}
              alt="Aeropress icon"
              src="/icon/aeropress.svg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
