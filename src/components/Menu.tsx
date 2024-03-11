import Tab from "./Tab";
import { useState, useEffect } from "react";
import { MenuIcon } from "./Icons";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const tabItems = [
    { to: "/", label: "Results" },
    { to: "/prints", label: "Prints" },
    { to: "/printers", label: "Printers" },
    { to: "/filaments", label: "Filaments" },
    { to: "/general", label: "General" },
    { to: "/settings", label: "Settings" },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (showMenu && !targetElement.closest(".toggle-container")) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <section className="toggle-container relative">
      <button
        className="btn-secondary ml-2 block rounded-lg border p-2 md:hidden"
        onClick={() => setShowMenu(!showMenu)}
      >
        <MenuIcon />
      </button>
      <div
        className={`${showMenu ? "" : "hidden"} absolute right-0 top-full z-[1] mt-2 rounded-lg bg-white text-center shadow-xl dark:bg-slate-700 md:static md:block md:bg-transparent md:px-0 md:shadow-none md:dark:bg-transparent`}
      >
        <div className="flex flex-col md:flex-row">
          {tabItems.map((tab) => (
            <Tab key={tab.label} to={tab.to} onClick={() => setShowMenu(false)}>
              {tab.label}
            </Tab>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
