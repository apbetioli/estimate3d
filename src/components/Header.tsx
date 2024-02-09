import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between p-5">
      <Link to="/">
        <h1>My 3D printing business</h1>
      </Link>
      <DarkMode />
    </header>
  );
};

export default Header;
