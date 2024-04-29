import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import ConfirmationDialog from '../components/ConfirmationDialog'
import EmptyResult from '../components/EmptyResult'
import Section from '../components/Section'
import { useFilaments, usePrinters, usePrints } from '../hooks'

import { AddIcon, PenIcon, TrashIcon } from '../components/Icons'

const Prints = () => {
  const [deletingPrint, setDeletingPrint] = useState<Print | null>(null)

  const { prints, remove } = usePrints()
  const { findById: findPrinter } = usePrinters()
  const { findById: findFilament } = useFilaments()

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb pages={[{ name: 'Prints' }]} />
        <Link className="btn btn-primary whitespace-nowrap" to="/prints/new">
          <AddIcon />
          Add
        </Link>
      </div>
      {prints.length === 0 ? (
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
              {prints.map((print) => (
                <tr
                  key={print.id}
                  className="whitespace-nowrap text-gray-700 dark:text-gray-300"
                >
                  <td className="p-4">{print.name}</td>
                  <td className="p-4">
                    {findPrinter(print.printer)?.name || print.printer}
                  </td>
                  <td className="p-4">
                    {findFilament(print.filament)?.name || print.filament}
                  </td>
                  <td className="p-4">{print.weight} g</td>
                  <td className="p-4">{print.time} min</td>
                  <td className="w-1 p-4">
                    <div className="flex items-center gap-x-6">
                      <button
                        className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none dark:text-gray-300 dark:hover:text-red-500"
                        onClick={() => {
                          setDeletingPrint(print)
                        }}
                      >
                        <TrashIcon />
                        <span className="sr-only">Remove</span>
                      </button>

                      <Link
                        className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500"
                        to={`/prints/${print.id}`}
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
          onClose={() => setDeletingPrint(null)}
          name={deletingPrint.name}
          deleteFn={() => remove(deletingPrint)}
        />
      )}
    </Section>
  )
}

export default Prints
