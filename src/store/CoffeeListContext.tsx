import React, { useEffect, useState, useRef } from "react";
import { CoffeeList, Coffee } from "../types";
import {
  getCoffeeList,
  createCoffee,
  updateCoffee,
  updateTastingNotes,
} from "../services/firestore";

export const CoffeeListContext = React.createContext<any | null>(null);

const CoffeeListProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [coffeeList, setCoffeeList] = useState<CoffeeList[]>([]);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | any>(null);
  const firstRender = useRef(true);
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
        if (firstRender.current) {
          console.log("FIRDT");
          firstRender.current = false;
          setSelectedCoffee(groupedOptions[0].options[0]);
        }
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

  const setTastingNotes = (name: string, notes: string) => {
    updateTastingNotes(name, notes);
  };
  return (
    <CoffeeListContext.Provider
      value={{
        coffeeList,
        selectedCoffee,
        setSelectedCoffee,
        saveCoffee,
        setCoffee,
        setTastingNotes,
      }}
    >
      {children}
    </CoffeeListContext.Provider>
  );
};

export default CoffeeListProvider;
