import { useState } from "react";
import { createUser } from "../service/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await createUser({ username, password });
    if (response.status === 201) alert("Registration successful");
    else alert("Registration failed");
  }
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <h1 className="post__heading">Register</h1>
      <input type="text" className="form__input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="form__input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="form__button">Register</button>
    </form>
  );
};

export default Register;
