import Tab from "./Tab";
import { useState, useEffect } from "react";

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
        <svg
          fill="currentColor"
          height="25"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32.055 32.055"
        >
          <g>
            <path
              d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
              C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
              s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
              c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
            />
          </g>
        </svg>
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
