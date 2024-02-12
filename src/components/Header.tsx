import DarkMode from "./DarkMode";

const Header = () => {
  return (
    <header className="container m-auto flex justify-between p-5">
      <h1>My 3D printing business</h1>
      <DarkMode />
    </header>
  );
};

export default Header;
