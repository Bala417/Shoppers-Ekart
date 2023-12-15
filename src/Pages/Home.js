import React from "react";
import CategoryNav from "../component/Assets/Category/CategoryNav/CategoryNav";
import CategoryResults from "../component/CategoryResults";
import Footer from "../component/footer/Footer";
const Home = () => {
  return (
    <div>
      <CategoryNav />
      <CategoryResults />
      <Footer />
    </div>
  );
};

export default Home;
