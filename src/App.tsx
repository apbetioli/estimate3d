import { BrowserRouter, Route, Routes } from "react-router-dom";
import { persistor, store } from "./redux/store";

import Filaments from "./pages/Filaments";
import General from "./pages/General";
import Header from "./components/Header";
import { PersistGate } from "redux-persist/integration/react";
import Printers from "./pages/Printers";
import Prints from "./pages/Prints";
import { Provider } from "react-redux";
import Settings from "./pages/Settings";
import Tab from "./components/Tab";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <main className="container m-auto p-5">
            <Tab to="/">Prints</Tab>
            <Tab to="/printers">Printers</Tab>
            <Tab to="/filaments">Filaments</Tab>
            <Tab to="/general">General</Tab>
            <Tab to="/settings">Settings</Tab>
            <Routes>
              <Route path="/" element={<Prints />} />
              <Route path="/printers" element={<Printers />} />
              <Route path="/filaments" element={<Filaments />} />
              <Route path="/general" element={<General />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(<App />);
