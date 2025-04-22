import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./service/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import "./App.css";

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-post" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}
