import {
  removeFilament,
  saveFilament,
  type Filament,
} from "../redux/filamentsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { useState } from "react";
import EmptyResult from "../components/EmptyResult";
import Section from "../components/Section";

const Filaments = () => {
  const dispatch = useAppDispatch();
  const filaments = useAppSelector((state) => state.filaments.value);

  const [filament, setFilament] = useState<Filament>({
    id: "",
    name: "",
    price: 0,
  });
  const [editing, setEditing] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveFilament(filament));
    setFilament({ id: "", name: "", price: 0 });
    setEditing(false);
  };

  const remove = (filament: Filament) => {
    dispatch(removeFilament(filament));
  };

  return (
    <>
      <Section title={editing ? "Edit a filament" : "Add a filament"}>
        <form
          onSubmit={save}
          className="flex flex-col gap-5 lg:flex-row lg:items-center"
        >
          <label htmlFor="filamentName">Name</label>
          <input
            id="filamentName"
            name="filamentName"
            type="text"
            value={filament.name}
            onChange={(e) => setFilament({ ...filament, name: e.target.value })}
            required
            className="lg:grow"
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
            className="lg:w-32"
          />

          <div className="flex justify-between gap-x-5">
            <button className="btn btn-primary grow" type="submit">
              {editing ? "Save" : "Add"}
            </button>

            {editing && (
              <button
                className="btn btn-secondary"
                type="reset"
                onClick={() => {
                  setEditing(false);
                  setFilament({ id: "", name: "", price: 0 });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </Section>
      <Section title="Filaments">
        {Object.values(filaments).length === 0 ? (
          <EmptyResult title="No filaments yet" />
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="text-left text-sm rtl:text-right">
                  <th
                    scope="col"
                    className="p-4 text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center gap-x-3">
                      <span>Filament name</span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="p-4 text-gray-500 dark:text-gray-400"
                  >
                    Price ($)
                  </th>

                  <th scope="col" className="relative px-4 py-3.5">
                    <span className="sr-only">Options</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                {Object.values(filaments).map((f) => (
                  <tr key={f.id} className="whitespace-nowrap text-gray-700">
                    <td className="p-4">{f.name}</td>
                    <td className="p-4">$ {f.price}</td>
                    <td className="w-1 p-4">
                      <div className="flex items-center gap-x-6">
                        <button
                          className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none dark:text-gray-300 dark:hover:text-red-500"
                          onClick={() => remove(f)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                          <span className="sr-only">Remove</span>
                        </button>

                        <button
                          className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500"
                          onClick={() => {
                            setFilament(f);
                            setEditing(true);
                            document.getElementById("filamentName")?.focus();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          <span className="sr-only">Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </>
  );
};

export default Filaments;
