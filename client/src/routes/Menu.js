import React, { useState } from "react";
import Navbar from "../components/header/Navbar";
import Delivery from "../components/Delivery/Delivery";
import "../components/Styles/commonClass.css";
import MenuComponent from "../components/Menu/MenuComponent";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("Delivery");

  return (
    <div>
      <Navbar />
      <MenuComponent activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Delivery" && <Delivery />}
    </div>
  );
};

export default Menu;