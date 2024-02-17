import { Link, useNavigate, useParams } from "react-router-dom";
import { Print, savePrint } from "../redux/printsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useLayoutEffect, useState } from "react";

import Breadcrumb from "../components/Breadcrumb";
import Section from "../components/Section";

const PrintsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const prints = useAppSelector((state) => state.prints.value);
  const printers = useAppSelector((state) => state.printers.value);
  const filaments = useAppSelector((state) => state.filaments.value);

  const [print, setPrint] = useState<Print>(
    (id && prints[id]) || {
      id: "",
      name: "",
      printer: "",
      filament: "",
      weight: 0,
      time: 0,
    },
  );

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(savePrint(print));
    navigate("/prints");
  };

  useLayoutEffect(() => {
    document.getElementById("printName")?.focus();
  }, []);

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb
          pages={[
            { name: "Prints", to: "/prints" },
            { name: print.id ? print.name : "Add a print" },
          ]}
        />
      </div>
      <form onSubmit={save} className="flex flex-col gap-y-5">
        <div>
          <label htmlFor="printName" className="block">
            Name
          </label>
          <input
            id="printName"
            name="printName"
            type="text"
            required
            value={print.name}
            onChange={(e) => setPrint({ ...print, name: e.target.value })}
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
            value={print.printer}
            onChange={(e) => setPrint({ ...print, printer: e.target.value })}
          >
            <option value="">
              {Object.values(printers).length === 0
                ? "No printers yet"
                : "Select a printer"}
            </option>
            {Object.values(printers).map((printer) => (
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
            value={print.filament}
            onChange={(e) => setPrint({ ...print, filament: e.target.value })}
          >
            <option value="">
              {Object.values(filaments).length === 0
                ? "No filaments yet"
                : "Select a filament"}
            </option>
            {Object.values(filaments).map((filament) => (
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
            value={print.weight}
            onChange={(e) =>
              setPrint({ ...print, weight: Number(e.target.value) })
            }
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
            value={print.time}
            onChange={(e) =>
              setPrint({ ...print, time: Number(e.target.value) })
            }
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
