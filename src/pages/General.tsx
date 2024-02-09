import Section from "../components/Section";
import { useState } from "react";

const General = () => {
  const [energyCost, setEnergyCost] = useState(0);

  return (
    <Section title="General settings">
      <label htmlFor="energy">Energy cost (kW/h)</label>
      <input
        id="energy"
        type="number"
        value={energyCost}
        onChange={(e) => setEnergyCost(Number(e.target.value))}
        step={0.01}
      />
    </Section>
  );
};

export default General;
