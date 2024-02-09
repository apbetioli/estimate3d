import {
  addPart,
  setFilament,
  setPrinter,
  setTime,
  setWeight,
} from "../store/calculateSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import EmptyResult from "../components/EmptyResult";
import Section from "../components/Section";

const Calculate = () => {
  const parts = useAppSelector((state) => state.calculate.parts);
  const printers = useAppSelector((state) => state.printers.value);
  const filaments = useAppSelector((state) => state.filaments.value);
  const { printer, filament, weight, time } = useAppSelector(
    (state) => state.calculate.addingPart,
  );
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPart());
  };

  return (
    <div>
      <Section title="Add a part" collapsable>
        <form onSubmit={onSubmit}>
          <label htmlFor="printer">Printer</label>
          <select
            id="printer"
            required
            value={printer}
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
            required
            value={filament}
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
            type="number"
            required
            step={1}
            min={0}
            value={weight}
            onChange={(e) => dispatch(setWeight(Number(e.target.value)))}
          />

          <label htmlFor="time">Estimated time (min)</label>
          <input
            id="time"
            type="number"
            required
            step={1}
            min={0}
            value={time}
            onChange={(e) => dispatch(setTime(Number(e.target.value)))}
          />

          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </Section>
      <Section title="Results">
        {parts.length === 0 ? (
          <EmptyResult title="No parts yet" />
        ) : (
          parts.map((p, index) => 
            <div key={index}>{p.printer + " " + p.filament + " " + p.weight + " " + p.time}</div>,
          )
        )}
      </Section>
    </div>
  );
};

export default Calculate;
