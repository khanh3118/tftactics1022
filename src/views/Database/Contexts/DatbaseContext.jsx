import { createContext, useState } from "react";
import championsService from "services/champions";
import synergysService from "services/synergys";

export const DatabaseContext = createContext({});

export const DatabaseProvider = ({ children }) => {
  const [championsData, setChampionsData] = useState([]);
  const [synergysData, setSynergyData] = useState([]);

  useState(async () => {
    let champions = championsService.getAllChampions();
    let synergys = synergysService.getAllSynergys();
    const data = await Promise.all([champions, synergys]);
    setChampionsData(data[0]);
    setSynergyData(data[1]);
  }, []);

  return (
    <DatabaseContext.Provider value={{ championsData, synergysData }}>
      {children}
    </DatabaseContext.Provider>
  );
};
