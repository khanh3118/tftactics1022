import { createContext, useState, useEffect } from "react";
import championsService from "services/champions";
import synergysService from "services/synergys";
import itemServices from "services/items";
import teamcompsService from "services/teamcomps";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [championsData, setChampionsData] = useState([]);
  const [synergysData, setSynergyData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [teamcompsData, setTeamcompsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchData() {
    let champions = championsService.getAllChampions();
    let synergys = synergysService.getAllSynergys();
    let items = itemServices.getAllItems();
    let teamcomps = teamcompsService.getAllTeamComps();
    try {
      const data = await Promise.all([champions, synergys, items, teamcomps]);
      setChampionsData(data[0]);
      setSynergyData(data[1]);
      setItemsData(data[2]);
      setTeamcompsData(data[3]);
    } catch (error) {
      throw new Error(error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        championsData,
        synergysData,
        itemsData,
        teamcompsData,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
