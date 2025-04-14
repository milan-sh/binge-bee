import { Outlet } from "react-router";
import { Header } from "./components";
import Layout from "./Layout";

const App = () => {
  return (
    <div className="bg-black min-h-screen w-full">
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default App;
