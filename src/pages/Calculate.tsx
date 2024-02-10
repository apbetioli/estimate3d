import {
  addPart,
  setFilament,
  setName,
  setPrinter,
  setTime,
  setWeight,
} from "../redux/calculateSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import EmptyResult from "../components/EmptyResult";
import Section from "../components/Section";

const Calculate = () => {
  const prints = useAppSelector((state) => state.calculate.prints);
  const printers = useAppSelector((state) => state.printers.value);
  const filaments = useAppSelector((state) => state.filaments.value);
  const current = useAppSelector((state) => state.calculate.current);

  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPart());
  };

  return (
    <div>
      <Section title="Add a print" collapsable>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={current.name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />

          <label htmlFor="printer">Printer</label>
          <select
            id="printer"
            name="printer"
            required
            value={current.printer}
            onChange={(e) => dispatch(setPrinter(e.target.value))}
          >
            <option value="">
              {printers.length === 0 ? "No printers yet" : "Select a printer"}
            </option>
            {printers.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <label htmlFor="filament">Filament</label>
          <select
            id="filament"
            name="filament"
            required
            value={current.filament}
            onChange={(e) => dispatch(setFilament(e.target.value))}
          >
            <option value="">
              {filaments.length === 0
                ? "No filaments yet"
                : "Select a filament"}
            </option>
            {filaments.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <label htmlFor="weight">Estimated weight (g)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            required
            step={1}
            min={0}
            value={current.weight}
            onChange={(e) => dispatch(setWeight(Number(e.target.value)))}
          />

          <label htmlFor="time">Estimated time (min)</label>
          <input
            id="time"
            name="time"
            type="number"
            required
            step={1}
            min={0}
            value={current.time}
            onChange={(e) => dispatch(setTime(Number(e.target.value)))}
          />

          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </Section>
      <Section title="Results">
        {prints.length === 0 ? (
          <EmptyResult title="No parts yet" />
        ) : (
          prints.map((p) => (
            <div key={p.name}>
              {p.name +
                " " +
                p.printer +
                " " +
                p.filament +
                " " +
                p.weight +
                " " +
                p.time}
            </div>
          ))
        )}
      </Section>
    </div>
  );
};

export default Calculate;
