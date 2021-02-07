import React, { useState, useEffect } from "react";
import { CoffeeListContext } from "../store/CoffeeListContext";

interface ITastingNotes {
  className: string;
  onCloseClick: () => void;
}
const TastingNotes: React.FC<ITastingNotes> = ({ className, onCloseClick }) => {
  const { selectedCoffee, setTastingNotes } = React.useContext(
    CoffeeListContext
  );
  const [inputValue, setInputValue] = useState(
    selectedCoffee ? selectedCoffee.tasting_notes : ""
  );

  useEffect(() => {
    if (selectedCoffee) setInputValue(selectedCoffee.tasting_notes);
  }, [selectedCoffee]);

  return (
    <div className={className} style={{ backgroundColor: "rgb(0 0 0 / 65%)" }}>
      <form className="flex flex-col mt-32 md:w-2/6 mx-auto">
        <div className="flex justify-between text-gray-200 text-2xl">
          <div>{selectedCoffee && selectedCoffee.label}</div>
          <img
            className="bg-gray-200 rounded-full cursor-pointer mb-6"
            onClick={() => onCloseClick()}
            src="/icon/x.svg"
            alt="close"
          />
        </div>
        <textarea
          onChange={(event) => setInputValue(event.currentTarget.value)}
          value={inputValue}
          className="rounded-md border"
          name="tasting notes"
          cols={10}
          rows={10}
        ></textarea>
        <button
          onClick={() => {
            selectedCoffee && setTastingNotes(selectedCoffee.value, inputValue);
            onCloseClick();
          }}
          className="styled-submit-btn"
          type="button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TastingNotes;
