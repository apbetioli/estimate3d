import { createRoot } from "react-dom/client";

const App = () => (
  <div>
    <h1 className="text-xl">Hello</h1>
  </div>
);

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(<App />);
