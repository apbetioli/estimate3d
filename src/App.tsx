import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Calculate from "./pages/Calculate";
import Filaments from "./pages/Filaments";
import General from "./pages/General";
import Header from "./components/Header";
import Printers from "./pages/Printers";
import Tab from "./components/Tab";
import { createRoot } from "react-dom/client";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const theme = useState(null);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className="p-5 container">
          <div className="flex overflow-x-auto whitespace-nowrap">
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
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(<App />);
