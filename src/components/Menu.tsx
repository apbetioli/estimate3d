import React, { useState, useEffect } from "react";
import Tab from "./Tab";

const Menu = () => {
  return (
        <div className="md:flex flex-col md:flex-row">
          <Tab to="/">Results</Tab>
          <Tab to="/prints">Prints</Tab>
          <Tab to="/printers">Printers</Tab>
          <Tab to="/filaments">Filaments</Tab>
          <Tab to="/general">General</Tab>
          <Tab to="/settings">Settings</Tab>
        </div>
  );
};

export default Menu;
