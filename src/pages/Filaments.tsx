import EmptyResult from "../components/EmptyResult";
import { Filament } from "../types";
import Section from "../components/Section";
import { useState } from "react";

const Filaments = () => {
  const [filaments, setFilaments] = useState<Filament[]>([]);

  const [filament, setFilament] = useState<Filament>({
    name: "",
    price: 0,
  });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setFilaments([...filaments, filament]);
    setFilament({ name: "", price: 0 });
  };

  return (
    <>
      <Section title="Add a filament">
        <form onSubmit={add}>
          <label htmlFor="filamentName">Name</label>
          <input
            id="filamentName"
            type="text"
            value={filament.name}
            onChange={(e) => setFilament({ ...filament, name: e.target.value })}
            required
          />

          <label htmlFor="energy">Price ($/kg)</label>
          <input
            id="energy"
            type="number"
            value={filament.price}
            onChange={(e) =>
              setFilament({ ...filament, price: Number(e.target.value) })
            }
            step={0.01}
            min={0}
            required
          />

          <button className="btn" type="submit">
            Add
          </button>
        </form>

        <ul>
          {filaments.map((p) => {
            return <li key={p.name}>{p.name}</li>;
          })}
        </ul>
      </Section>
      <Section title="Filaments">
        <EmptyResult title="No filaments yet" />
      </Section>
    </>
  );
};

export default Filaments;
