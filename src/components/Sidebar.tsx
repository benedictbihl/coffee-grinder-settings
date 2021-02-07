import React from "react";

interface ISideBar {
  className: string;
  onSignOutClick: () => void;
  onInfoClick: () => void;
  onTableClick: () => void;
}
const Sidebar: React.FC<ISideBar> = ({
  className,
  onSignOutClick,
  onInfoClick,
  onTableClick,
}) => {
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
          onClick={() => onInfoClick()}
          className="mb-6"
          alt="tasting notes"
          src="/icon/info.svg"
        />
        <img
          onClick={() => onTableClick()}
          alt="all coffees"
          src="/icon/database.svg"
        />
      </div>
    </div>
  );
};

export default Sidebar;
