import { createContext, useState, useEffect } from "react";
import championsService from "services/champions";
import synergysService from "services/synergys";

export const DatabaseContext = createContext({});

export const DatabaseProvider = ({ children }) => {
  const [championsData, setChampionsData] = useState([]);
  const [synergysData, setSynergyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetData() {
    setIsLoading(true);
    let champions = championsService.getAllChampions();
    let synergys = synergysService.getAllSynergys();
    try {
      const data = await Promise.all([champions, synergys]);
      setChampionsData(data[0]);
      setSynergyData(data[1]);
    } catch (error) {
      throw new Error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetData();
  }, []);

  return (
    <DatabaseContext.Provider value={{ championsData, synergysData }}>
      {isLoading || children}
    </DatabaseContext.Provider>
  );
};
