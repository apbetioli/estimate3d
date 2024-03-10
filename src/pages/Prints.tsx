import { Print, removePrint } from "../redux/printsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Breadcrumb from "../components/Breadcrumb";
import EmptyResult from "../components/EmptyResult";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import { useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";

import { AddIcon, TrashIcon, PenIcon } from "../components/Icons";


const Prints = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingPrint, setDeletingPrint] = useState<Print>();
  const dispatch = useAppDispatch();
  const prints = useAppSelector((state) => state.prints.value);
  const printers = useAppSelector((state) => state.printers.value);
  const filaments = useAppSelector((state) => state.filaments.value);

  const findPrinter = (id: string) =>
    Object.values(printers).find((_p) => id === _p.id);
  const findFilament = (id: string) =>
    Object.values(filaments).find((_f) => id === _f.id);

  const remove = (_print: Print) => {
    dispatch(removePrint(_print));
  };

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb pages={[{ name: "Prints" }]} />
        <Link className="btn btn-primary whitespace-nowrap" to="/prints/new">
          <AddIcon />
          Add
        </Link>
      </div>
      {Object.values(prints).length === 0 ? (
        <EmptyResult title="No prints yet" />
      ) : (
        <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr className="text-left text-sm rtl:text-right">
                <th
                  scope="col"
                  className="p-4 text-gray-500 dark:text-gray-400"
                >
                  <div className="flex items-center gap-x-3">
                    <span>Print name</span>
                  </div>
                </th>

                <th
                  scope="col"
                  className="p-4 text-gray-500 dark:text-gray-400"
                >
                  Printer
                </th>

                <th
                  scope="col"
                  className="p-4 text-gray-500 dark:text-gray-400"
                >
                  Filament
                </th>

                <th
                  scope="col"
                  className="p-4 text-gray-500 dark:text-gray-400"
                >
                  Weight
                </th>

                <th
                  scope="col"
                  className="p-4 text-gray-500 dark:text-gray-400"
                >
                  Time
                </th>

                <th scope="col" className="relative px-4 py-3.5">
                  <span className="sr-only">Options</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {Object.values(prints).map((p) => (
                <tr
                  key={p.id}
                  className="whitespace-nowrap text-gray-700 dark:text-gray-300"
                >
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">
                    {findPrinter(p.printer)?.name || p.printer}
                  </td>
                  <td className="p-4">
                    {findFilament(p.filament)?.name || p.filament}
                  </td>
                  <td className="p-4">{p.weight} g</td>
                  <td className="p-4">{p.time} min</td>
                  <td className="w-1 p-4">
                    <div className="flex items-center gap-x-6">
                      <button
                        className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none dark:text-gray-300 dark:hover:text-red-500"
                        onClick={() => {
                          setIsDialogOpen(true);
                          setDeletingPrint(p);
                        }}
                      >
                        <TrashIcon />
                        <span className="sr-only">Remove</span>
                      </button>

                      <Link
                        className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500"
                        to={`/prints/${p.id}`}
                      >
                        <PenIcon />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {deletingPrint && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          name={deletingPrint.name}
          deleteFn={() => remove(deletingPrint)}
        />
      )}
    </Section>
  );
};

export default Prints;
