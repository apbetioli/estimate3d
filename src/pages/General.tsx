import { useAppDispatch, useAppSelector } from "../store/hooks";

import Section from "../components/Section";
import { setEnergyCost } from "../store/generalSlice";

const General = () => {
  const energyCost = useAppSelector((state) => state.general.energyCost);
  const dispatch = useAppDispatch();

  return (
    <Section title="General settings">
      <label htmlFor="energy">Energy cost (kW/h)</label>
      <input
        id="energy"
        type="number"
        value={energyCost}
        onChange={(e) => dispatch(setEnergyCost(Number(e.target.value)))}
        step={0.01}
      />
    </Section>
  );
};

export default General;
