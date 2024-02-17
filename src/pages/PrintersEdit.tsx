import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Section from "../components/Section";
import { savePrinter, type Printer } from "../redux/printersSlice";

const PrintersEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const printers = useAppSelector((state) => state.printers.value);

  const [printer, setPrinter] = useState<Printer>(
    (id && printers[id]) || {
      id: "",
      name: "",
      power: 0,
    },
  );

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(savePrinter(printer));
    navigate("/printers");
  };

  useLayoutEffect(() => {
    document.getElementById("printerName")?.focus();
  }, []);

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb
          pages={[
            { name: "Printers", to: "/printers" },
            { name: printer.id ? printer.name : "Add a printer" },
          ]}
        />
      </div>
      <form
        onSubmit={save}
        className="flex flex-col gap-5 lg:flex-row lg:items-center"
      >
        <label htmlFor="printerName">Name</label>
        <input
          id="printerName"
          name="printerName"
          type="text"
          value={printer.name}
          onChange={(e) => setPrinter({ ...printer, name: e.target.value })}
          required
          className="lg:grow"
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
          className="lg:w-32"
        />

        <div className="flex justify-between gap-x-5">
          <button className="btn btn-primary grow" type="submit">
            Save
          </button>

          <Link to="/printers" className="btn btn-secondary" type="reset">
            Cancel
          </Link>
        </div>
      </form>
    </Section>
  );
};

export default PrintersEdit;
