import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="container m-auto flex flex-wrap items-center justify-between p-5 pb-0">
      <h1 className="mb-0 md:w-1/2 flex-1 md:flex-initial">Estimate 3D</h1>
      <div className="flex items-center justify-end gap-x-2 md:w-1/2">
        <Link
          to="https://github.com/apbetioli/estimate3d"
          target="_blank"
          className="btn-secondary rounded-lg border p-2 dark:text-white"
          title="GitHub repository"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 64 64"
          >
            <path
              fill="currentColor"
              d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"
            ></path>
          </svg>
        </Link>
        <DarkMode />       
      </div>
        <section className="relative toggle-container">
            <input type="checkbox" id="toggleCheckbox" className="checkbox-menu ml-2 hidden" />
            <label htmlFor="toggleCheckbox" className="btn-secondary block rounded-lg border p-2 toggle-menu md:hidden ml-2">
            <svg fill="currentColor" height="25" width="25" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32.055 32.055">
              <g>
                <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
                  C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
                  s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
                  c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
              </g>
              </svg>
            </label>
            <div className="menu hidden md:block absolute shadow-xl md:shadow-none bg-white md:bg-transparent dark:bg-slate-700 md:dark:bg-transparent md:static top-0 right-full px-10 md:px-0 mr-2 rounded-lg text-center">
              <Menu />
            </div>
          </section>
    </header>
  );
};

export default Header;
