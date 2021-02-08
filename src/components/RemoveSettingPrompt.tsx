import React, { useState, useEffect } from "react";
import { Table } from "react-super-responsive-table";
import { CoffeeListContext } from "../store/CoffeeListContext";

interface IRemoveSettingPrompt {
  className: string;
  onCloseClick: () => void;
}
const RemoveSettingPrompt: React.FC<IRemoveSettingPrompt> = ({ className, onCloseClick }) => {
  const { selectedCoffee, deleteCoffee } = React.useContext(
    CoffeeListContext
  );

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
        <div className="bg-gray-100 p-3">
          Are you sure you wish to delete the currently selected setting ?
        </div>
        <div className="flex">
          <button
            onClick={() => {
              onCloseClick();
            }}
            className="styled-cancel-btn"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              selectedCoffee && deleteCoffee(selectedCoffee.value);
              onCloseClick();
            }}
            className="styled-remove-btn"
            type="button"
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveSettingPrompt;
