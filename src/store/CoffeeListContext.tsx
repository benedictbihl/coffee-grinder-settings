import React, { useEffect, useState } from "react";
import { CoffeeList, Coffee } from "../types";
import {
  getCoffeeList,
  createCoffee,
  updateCoffee,
} from "../services/firestore";

export const CoffeeListContext = React.createContext<any | null>(null);

const CoffeeListProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [coffeeList, setCoffeeList] = useState<CoffeeList[]>([]);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | any>(null);

  useEffect(() => {
    const unsubscribe = getCoffeeList({
      next: (querySnapshot: any) => {
        let coffeesAtHome: any[] = [];
        let coffeesUnavailable: any[] = [];
        const coffeeList = querySnapshot.docs.map((docSnapshot: any) =>
          docSnapshot.data()
        );
        coffeeList.forEach((doc: Coffee) => {
          if (doc.available_at_home === true) {
            coffeesAtHome.push({
              ...doc,
            });
          } else {
            coffeesUnavailable.push({
              ...doc,
            });
          }
        });

        let groupedOptions = [
          {
            label: "In Stock at Home",
            options: coffeesAtHome,
          },
          {
            label: "Not in Stock",
            options: coffeesUnavailable,
          },
        ];
        setCoffeeList(groupedOptions);
      },
      error: () => console.log("item-get-fail"),
    });
    return unsubscribe;
  }, []);

  const saveCoffee = (name: string) => {
    createCoffee(name);
  };

  const setCoffee = (name: string, fields: any) => {
    updateCoffee(name, { ...fields });
  };

  return (
    <CoffeeListContext.Provider
      value={{
        coffeeList,
        selectedCoffee,
        setSelectedCoffee,
        saveCoffee,
        setCoffee,
      }}
    >
      {children}
    </CoffeeListContext.Provider>
  );
};

export default CoffeeListProvider;
