import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
