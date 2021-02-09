import React from "react";
import { CoffeeListContext } from "../store/CoffeeListContext";

interface ISideBar {
  className: string;
  onSignOutClick: () => void;
  onInfoClick: () => void;
  onTableClick: () => void;
  onRemoveClick: () => void;
}
const Sidebar: React.FC<ISideBar> = ({
  className,
  onSignOutClick,
  onInfoClick,
  onTableClick,
  onRemoveClick
}) => {
  const { selectedCoffee } = React.useContext(
    CoffeeListContext
  );

  const isDisabled: String = selectedCoffee ? "" : "disabled";

  return (
    <div className={className}>
      <div>
        <img
          className="cursor-pointer"
          onClick={() => onSignOutClick()}
          alt="logout"
          src="/icon/log-out.svg"
        />
      </div>
      <div>
        <img
          onClick={() => onRemoveClick()}
          className={`mb-6 cursor-pointer ${isDisabled}`}
          alt="tasting notes"
          src="/icon/trash.svg"
        />
        <img
          onClick={() => onInfoClick()}
          className={`mb-6 cursor-pointer ${isDisabled}`}
          alt="tasting notes"
          src="/icon/info.svg"
        />
        <img
          onClick={() => onTableClick()}
          className={`cursor-pointer ${isDisabled}`}
          alt="all coffees"
          src="/icon/database.svg"
        />
      </div>
    </div>
  );
};

export default Sidebar;
