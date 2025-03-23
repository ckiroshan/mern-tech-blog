import Header from "./components/Header";
import Post from "./components/post";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}></Route>
      <Route index element={<Home />} />
    </Routes>
  );
}
