import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import ConfirmationDialog from '../components/ConfirmationDialog'
import EmptyResult from '../components/EmptyResult'
import Section from '../components/Section'
import { usePrinters } from '../redux/hooks'

import { AddIcon, PenIcon, TrashIcon } from '../components/Icons'

const Printers = () => {
  const { printers, remove } = usePrinters()
  const [deletingPrinter, setDeletingPrinter] = useState<Printer | null>(null)

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb pages={[{ name: 'Printers' }]} />
        <Link className="btn btn-primary whitespace-nowrap" to="/printers/new">
          <AddIcon />
          Add
        </Link>
      </div>
      {printers.length === 0 ? (
        <EmptyResult title="No printers yet" />
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
                    <span>Printer name</span>
                  </div>
                </th>

                <th
                  scope="col"
                  className="p-4 text-gray-500 dark:text-gray-400"
                >
                  Power consumption (W)
                </th>

                <th scope="col" className="relative px-4 py-3.5">
                  <span className="sr-only">Options</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {printers.map((printer) => (
                <tr
                  key={printer.id}
                  className="whitespace-nowrap text-gray-700 dark:text-gray-300"
                >
                  <td className="p-4">{printer.name}</td>
                  <td className="p-4">{printer.power} W</td>
                  <td className="w-1 p-4">
                    <div className="flex items-center gap-x-6">
                      <button
                        className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none dark:text-gray-300 dark:hover:text-red-500"
                        onClick={() => {
                          setDeletingPrinter(printer)
                        }}
                      >
                        <TrashIcon />
                        <span className="sr-only">Remove</span>
                      </button>

                      <Link
                        className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500"
                        to={`/printers/${printer.id}`}
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
      {deletingPrinter && (
        <ConfirmationDialog
          name={deletingPrinter.name}
          deleteFn={() => remove(deletingPrinter)}
          onClose={() => setDeletingPrinter(null)}
        />
      )}
    </Section>
  )
}

export default Printers
