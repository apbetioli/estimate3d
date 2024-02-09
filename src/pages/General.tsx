import { useAppDispatch, useAppSelector } from "../store/hooks";

import Section from "../components/Section";
import { setEnergyCost } from "../store/generalSlice";

const General = () => {
  const energyCost = useAppSelector((state) => state.general.energyCost);
  const dispatch = useAppDispatch();

  return (
    <Section title="General settings">
      <label htmlFor="energy">Energy cost (kW/h)</label>
      <p className="field-description">
        This information is usually available in your energy bill.
      </p>
      <input
        id="energy"
        type="number"
        value={energyCost}
        onChange={(e) => dispatch(setEnergyCost(Number(e.target.value)))}
        step={0.01}
        min={0}
      />

      <label htmlFor="markup">Markup (%)</label>
      <p className="field-description">
        The percentage of profit over the final cost.
      </p>
      <input
        id="markup"
        type="number"
        value={energyCost}
        onChange={(e) => dispatch(setEnergyCost(Number(e.target.value)))}
        step={1}
        min={0}
        max={100}
      />

      <label htmlFor="transactionFee">Transaction fee (%)</label>
      <p className="field-description">
        The percentage of the transaction fee charged by the payment gateway to
        be added to the final price.
      </p>
      <input
        id="transactionFee"
        type="number"
        value={energyCost}
        onChange={(e) => dispatch(setEnergyCost(Number(e.target.value)))}
        step={1}
        min={0}
        max={100}
      />

      <label htmlFor="additionalCost">Additional cost ($)</label>
      <p className="field-description">
        Any additional cost to be added. E.g. ROI, maintenance, shipping, etc.
      </p>
      <input
        id="additionalCost"
        type="number"
        value={energyCost}
        onChange={(e) => dispatch(setEnergyCost(Number(e.target.value)))}
        step={0.01}
        min={0}
      />
    </Section>
  );
};

export default General;
