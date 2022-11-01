import { createContext, useState, useEffect } from "react";
import championsService from "services/champions";
import synergysService from "services/synergys";
import itemServices from "services/items";

export const DataContext = createContext({});

const compsData = [
  {
    name: "Darkflight Assassins",
    type: "standard",
    tier: "s",
    status: "up",
    members: [
      {
        name: "Aphelios",
        position: 28,
        max_level: false,
        items: [],
      },
      {
        name: "Qiyana",
        position: 18,
        max_level: false,
        items: [],
      },
      {
        name: "Rell",
        position: 5,
        max_level: false,
        items: [],
      },
      {
        name: "Diana",
        position: 25,
        max_level: false,
        items: [],
      },
      {
        name: "Rengar",
        position: 27,
        max_level: true,
        items: ["Hand of Justice", "Infinity Edge", "Runaan's Hurricane"],
      },
      {
        name: "Nilah",
        position: 26,
        max_level: false,
        items: [],
      },
      {
        name: "Swain",
        position: 12,
        max_level: false,
        items: ["Archangel's Staff", "Morellonomicon"],
      },
    ],
    early_comp: ["Ezreal", "Sejuani", "Qiyana", "Rell", "Rengar"],
    carousel: ["B.F. Sword"],
    options: [
      {
        replace_from: ["lvlup"],
        replace_to: ["Rengar", "Graves"],
      },
      {
        replace_from: ["Diana", "Nilah"],
        replace_to: ["Sejuani", "Graves"],
      },
    ],
  },
];

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
    <DataContext.Provider value={{ championsData, synergysData, itemsData, compsData }}>
      {isLoading || children}
    </DataContext.Provider>
  );
};