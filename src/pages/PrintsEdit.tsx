import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFilaments, usePrinters, usePrints } from "../redux/hooks";

import Breadcrumb from "../components/Breadcrumb";
import Section from "../components/Section";

const PrintsEdit = () => {
  const navigate = useNavigate();
  const { findById, save } = usePrints();
  const { id } = useParams();
  const nameInput = useRef<HTMLInputElement>(null);
  const print = findById(id!);
  const [name, setName] = useState(print?.name || "");
  const [printer, setPrinter] = useState(print?.printer || "");
  const [filament, setFilament] = useState(print?.filament || "");
  const [weight, setWeight] = useState(print?.weight || 0);
  const [time, setTime] = useState(print?.time || 0);

  const { printers } = usePrinters();
  const { filaments } = useFilaments();

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    save({
      id: print?.id,
      name,
      printer,
      filament,
      weight,
      time,
    });
    navigate("/prints");
  };

  useEffect(() => {
    nameInput.current?.focus();
  }, []);

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb
          pages={[
            { name: "Prints", to: "/prints" },
            { name: print?.id ? "Edit print" : "Add a print" },
          ]}
        />
      </div>
      <form onSubmit={onSave} className="flex flex-col gap-y-5">
        <div>
          <label htmlFor="printName" className="block">
            Name
          </label>
          <input
            id="printName"
            name="printName"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={nameInput}
          />
        </div>
        <div>
          <label htmlFor="printer" className="block">
            Printer
          </label>
          <select
            id="printer"
            name="printer"
            required
            value={printer}
            onChange={(e) => setPrinter(e.target.value)}
          >
            <option value="">
              {printers.length === 0
                ? "No printers yet"
                : "Select a printer"}
            </option>
            {printers.map((printer) => (
              <option key={printer.id} value={printer.id}>
                {printer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filament" className="block">
            Filament
          </label>
          <select
            id="filament"
            name="filament"
            required
            value={filament}
            onChange={(e) => setFilament(e.target.value)}
          >
            <option value="">
              {filaments.length === 0
                ? "No filaments yet"
                : "Select a filament"}
            </option>
            {filaments.map((filament) => (
              <option key={filament.id} value={filament.id}>
                {filament.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="weight" className="block">
            Estimated print weight (g)
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            required
            step={1}
            min={0}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="time" className="block">
            Estimated print time (min)
          </label>
          <input
            id="time"
            name="time"
            type="number"
            required
            step={1}
            min={0}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between gap-x-5">
          <button className="btn btn-primary grow" type="submit">
            Save
          </button>

          <Link className="btn btn-secondary" type="reset" to="/prints">
            Cancel
          </Link>
        </div>
      </form>
    </Section>
  );
};

export default PrintsEdit;
