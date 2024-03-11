import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { GitHubIcon } from "./Icons";

const Header = () => {
  return (
    <header className="container m-auto flex flex-wrap items-center justify-between p-5 pb-0 text-xs sm:text-base">
      <h1 className="mb-0 flex-1 text-lg sm:text-2xl md:w-1/2 md:flex-initial">
        Estimate 3D
      </h1>
      <div className="flex items-center justify-end gap-x-2 md:w-1/2">
        <Link
          to="https://github.com/apbetioli/estimate3d"
          target="_blank"
          className="btn-secondary rounded-lg border p-2 dark:text-white"
          title="GitHub repository"
        >
          <GitHubIcon />
        </Link>
        <DarkMode />
      </div>
      <Menu />
    </header>
  );
};

export default Header;
