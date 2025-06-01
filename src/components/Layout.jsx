import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Layout wrapper with consistent Header, Footer & dynamic content
const Layout = () => {
  return (
    <>
      <main>
        <Header />  {/* Top navigation bar */}
        <Outlet />  {/* Dynamic content: Placeholder for nested routes */}
        <Footer />  {/* Footer content */}
      </main>
    </>
  );
};

export default Layout;
