import { createContext, useState, useEffect } from "react";
import MetaReportServices from "services/metareport";
import LoadingCycle from "components/common/LoadingCycle";
import styled from "styled-components";

export const MetaReportContext = createContext({});

export const MetaReportProvider = ({ children }) => {
  const [metaComps, setMetaComps] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  async function fetchData() {
    setIsLoading(true);
    try {
      let data = await MetaReportServices.getMetaComps();
      setMetaComps(data);
    } catch (error) {
      throw new Error(error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MetaReportContext.Provider
      value={{
        metaComps,
        isLoading
      }}
    >
      <MetaReportContextWrapper>
        {isLoading ? <LoadingCycle className="metareport-loading" /> : children}
      </MetaReportContextWrapper>
    </MetaReportContext.Provider>
  );
};

const MetaReportContextWrapper = styled.div`
  .metareport-loading {
    margin-top: 100px;
    div {
      width: 70px;
      height: 70px;
      border-width: 8px;
    }
  }
`;
