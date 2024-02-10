import { BrowserRouter, Route, Routes } from "react-router-dom";
import { persistor, store } from "./redux/store";

import Calculate from "./pages/Calculate";
import Filaments from "./pages/Filaments";
import General from "./pages/General";
import Header from "./components/Header";
import { PersistGate } from "redux-persist/integration/react";
import Printers from "./pages/Printers";
import { Provider } from "react-redux";
import Tab from "./components/Tab";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <main className="container m-auto p-5">
            <div className="">
              <Tab to="/">Calculate</Tab>
              <Tab to="/printers">Printers</Tab>
              <Tab to="/filaments">Filaments</Tab>
              <Tab to="/general">General</Tab>
            </div>
            <Routes>
              <Route path="/general" element={<General />} />
              <Route path="/filaments" element={<Filaments />} />
              <Route path="/printers" element={<Printers />} />
              <Route path="/" element={<Calculate />} />
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
