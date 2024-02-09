import { useAppDispatch, useAppSelector } from "../store/hooks";

import EmptyResult from "../components/EmptyResult";
import { Printer } from "../types";
import Section from "../components/Section";
import { addPrinter } from "../store/printersSlice";
import { useState } from "react";

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
          <label htmlFor="printerName">Name</label>
          <input
            id="printerName"
            type="text"
            value={printer.name}
            onChange={(e) => setPrinter({ ...printer, name: e.target.value })}
            required
          />

          <label htmlFor="energy">Power consumption (W)</label>
          <input
            id="energy"
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
