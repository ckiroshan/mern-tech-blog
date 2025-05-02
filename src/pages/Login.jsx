import { useContext, useState } from "react";
import { verifyUser } from "../service/api";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await verifyUser({ username, password });
    if (response.status === 200) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else alert("Wrong Credentials, please try again!");
  }

  if (redirect) return <Navigate to={"/"} />;
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <h1 className="post__heading">Login</h1>
      <input type="text" className="form__input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="form__input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="form__button">Login</button>
    </form>
  );
};

export default Login;
