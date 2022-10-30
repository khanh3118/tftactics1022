import { useState } from "react"
import { useAuth } from "contexts/AuthContext"
import { NavLink } from "react-router-dom";

export default function SignUp() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { signup, currentUser, signout, signin } = useAuth();

  async function hanleSubmit() {
    await signup(email,password);
  }
  async function hanleSignIn() {
    await signin(email,password);
  }
  async function hanleSignout(e) {
    e.preventDefault();
    await signout();
  }
  return (
    <div className="wrapper">
      {currentUser && currentUser.email}
      <div>
        <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
      </div>
      <div>
        <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} />
      </div>
      <div>
        <button onClick={hanleSubmit}>signup</button>
        <button onClick={(e) => hanleSignout(e)}>signout</button>
        <button onClick={hanleSignIn}>signin</button>
      </div>
        <NavLink to="../manager/origins" className="header-item">
          manager champions
        </NavLink>
    </div>
  )
}