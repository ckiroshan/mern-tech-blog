import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./service/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import "./App.css";

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* Non-User only routes */}
          <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            }
          />

          {/* Auth User only routes */}
          <Route path="/add-post" element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/posts/edit/:id" element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route path="/user/profile/:id" element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}
