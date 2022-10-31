import { createContext, useState, useEffect } from "react";
import championsService from "services/champions";
import synergysService from "services/synergys";
import itemServices from "services/items";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [championsData, setChampionsData] = useState([]);
  const [synergysData, setSynergyData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetData() {
    setIsLoading(true);
    let champions = championsService.getAllChampions();
    let synergys = synergysService.getAllSynergys();
    let items = itemServices.getAllItems();
    try {
      const data = await Promise.all([champions, synergys, items]);
      setChampionsData(data[0]);
      setSynergyData(data[1]);
      setItemsData(data[2]);
    } catch (error) {
      throw new Error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetData();
  }, []);

  return (
    <DataContext.Provider value={{ championsData, synergysData, itemsData }}>
      {isLoading || children}
    </DataContext.Provider>
  );
};
