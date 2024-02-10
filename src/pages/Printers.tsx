import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { useState } from "react";
import EmptyResult from "../components/EmptyResult";
import Section from "../components/Section";
import { addPrinter, type Printer } from "../redux/printersSlice";

const Printers = () => {
  const dispatch = useAppDispatch();
  const printers = useAppSelector((state) => state.printers.value);

  const [printer, setPrinter] = useState<Printer>({
    name: "",
    power: 0,
  });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPrinter(printer));
    setPrinter({ name: "", power: 0 });
  };

  return (
    <>
      <Section title="Add a printer">
        <form onSubmit={add}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={printer.name}
            onChange={(e) => setPrinter({ ...printer, name: e.target.value })}
            required
          />

          <label htmlFor="power">Power consumption (W)</label>
          <input
            id="power"
            name="power"
            type="number"
            value={printer.power}
            onChange={(e) =>
              setPrinter({ ...printer, power: Number(e.target.value) })
            }
            step={0.01}
            min={0}
            required
          />

          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </Section>

      <Section title="Printers">
        {printers.length === 0 ? (
          <EmptyResult title="No printers yet" />
        ) : (
          <ul>
            {printers.map((p) => {
              return <li key={p.name}>{p.name}</li>;
            })}
          </ul>
        )}
      </Section>
    </>
  );
};

export default Printers;
