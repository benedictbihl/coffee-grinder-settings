import React, { CSSProperties } from "react";
import { Coffee } from "../types";
import CreatableSelect from "react-select/creatable";
import { CoffeeListContext } from "../store/CoffeeListContext";

const groupStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: 800,
};
const groupBadgeStyles: CSSProperties = {
  backgroundColor: "#1d4ed8",
  color: "#fff",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const selectStyles: any = {
  //@ts-ignore
  option: (styles) => {
    return {
      ...styles,
      backgroundColor: "fff",
      color: "#444",
    };
  },
  //@ts-ignore
  dropdownIndicator: (styles) => ({ ...styles, transform: "rotate(180deg)" }),
};

const formatGroupLabel = (data: any) => (
  <div style={groupStyles}>
    <span className="text-black">{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

interface ISelection {
  className: string;
}

const Selection: React.FC<ISelection> = ({ className }) => {
  const {
    coffeeList,
    selectedCoffee,
    setSelectedCoffee,
    saveCoffee,
  } = React.useContext(CoffeeListContext);

  return (
    <CreatableSelect
      className={className}
      menuShouldBlockScroll
      menuPlacement="top"
      isClearable
      onChange={(newValue: Coffee) => setSelectedCoffee(newValue)}
      onCreateOption={(inputValue: string) => saveCoffee(inputValue)}
      value={selectedCoffee}
      options={coffeeList}
      formatGroupLabel={formatGroupLabel}
      styles={selectStyles}
    />
  );
};

export default Selection;
