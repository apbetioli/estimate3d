import { addFilament, type Filament } from "../redux/filamentsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { useState } from "react";
import EmptyResult from "../components/EmptyResult";
import Section from "../components/Section";

const Filaments = () => {
  const filaments = useAppSelector((state) => state.filaments.value);
  const dispatch = useAppDispatch();

  const [filament, setFilament] = useState<Filament>({
    name: "",
    price: 0,
  });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addFilament(filament));
    setFilament({ name: "", price: 0 });
  };

  return (
    <>
      <Section title="Add a filament">
        <form onSubmit={add}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={filament.name}
            onChange={(e) => setFilament({ ...filament, name: e.target.value })}
            required
          />

          <label htmlFor="price">Price ($/kg)</label>
          <input
            id="price"
            name="price"
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
      </Section>
      <Section title="Filaments">
        {filaments.length === 0 ? (
          <EmptyResult title="No filaments yet" />
        ) : (
          <ul>
            {filaments.map((p) => {
              return <li key={p.name}>{p.name}</li>;
            })}
          </ul>
        )}
      </Section>
    </>
  );
};

export default Filaments;
