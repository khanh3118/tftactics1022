import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { authServices } from "../../firebase/main";
import styled from "styled-components";

export default function Champions() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(authServices, async (user) => {
      if (user) {
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <ChampionsDefault>
    hello
    </ChampionsDefault>
  );
}

const ChampionsDefault = styled.div`
  .wrapper {
  }
`;
