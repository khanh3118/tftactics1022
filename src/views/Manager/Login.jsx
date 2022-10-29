import styled from "styled-components";
import { useState } from "react";
import { login } from "services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  async function hanleLogin(email, password) {
    try {
      await login(email, password);
      navigate("/manager/champions");
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <ChampionsManagerDefault>
      <div className="wrapper">
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="email"
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button onClick={(e) => hanleLogin(email, password)}>Login</button>
      </div>
    </ChampionsManagerDefault>
  );
}

const ChampionsManagerDefault = styled.div`
  .wrapper {
    padding-top: 30px;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
  }
`;
