import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { CoffeeListContext } from "../store/CoffeeListContext";
import { Coffee, CoffeeList } from "../types";

interface ITable {
  className: string;
  onCloseClick: () => void;
}
const ResponsiveTable: React.FC<ITable> = ({ className, onCloseClick }) => {
  const { coffeeList } = React.useContext(CoffeeListContext);

  const reformatSetting = (number: number) => {
    //example: 6 -> 2.2
    let beforeDecimal = Math.ceil(number / 3);
    let afterDecimal = number % 3;
    afterDecimal = afterDecimal === 0 ? 2 : afterDecimal - 1;
    return `${beforeDecimal}.${afterDecimal}`;
  };

  const populateTable = () => {
    let listJSX: any = [];
    coffeeList.forEach((list: CoffeeList) => {
      list.options.forEach((coffee: Coffee) => {
        listJSX.push(
          <Tr key={coffee.value}>
            <Td>{coffee.label}</Td>
            <Td>{reformatSetting(coffee.v60_setting)}</Td>
            <Td>{reformatSetting(coffee.aeropress_setting)}</Td>
            <Td>{coffee.tasting_notes}</Td>
          </Tr>
        );
      });
    });
    return listJSX;
  };
  return (
    <div className={className} style={{ backgroundColor: "rgb(0 0 0 / 65%)" }}>
      <div className="flex justify-end my-4 ">
        <img
          className="bg-gray-200 rounded-full cursor-pointer "
          onClick={() => onCloseClick()}
          src="/icon/x.svg"
          alt="close"
        />
      </div>
      <Table className="text-center bg-gray-100">
        <Thead className="bg-gray-400">
          <Tr>
            <Th>Name</Th>
            <Th>V60</Th>
            <Th>Aeropress</Th>
            <Th>Tasting Notes</Th>
          </Tr>
        </Thead>
        <Tbody>{populateTable()}</Tbody>
      </Table>
    </div>
  );
};

export default ResponsiveTable;
