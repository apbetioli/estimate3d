import EmptyResult from "../components/EmptyResult";
import { Printer } from "../types";
import Section from "../components/Section";
import { useState } from "react";

const Printers = () => {
  const [printers, setPrinters] = useState<Printer[]>([]);

  const [printer, setPrinter] = useState<Printer>({
    name: "",
    power: 0,
  });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setPrinters([...printers, printer]);
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

        <ul role="list">
          {printers.map((p) => {
            return <li>{p.name}</li>;
          })}
        </ul>
      </Section>

      <Section title="Printers">
        <EmptyResult title="No printers yet" /> :
      </Section>
    </>
  );
};

export default Printers;
