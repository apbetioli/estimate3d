import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Breadcrumb from '../components/Breadcrumb'
import ConfirmationDialog from '../components/ConfirmationDialog'
import Section from '../components/Section'
import { persistor } from '../store'

const Settings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const deleteAll: () => void = () => {
    persistor
      .purge()
      .then(() => {
        toast.success('All your data was erased! Please refresh the page.')
      })
      .catch((err) => {
        toast.error('An error occurred. Check the console for details.')
        console.error(err)
      })
  }

  return (
    <Section>
      <Toaster />
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb pages={[{ name: 'Settings' }]} />
      </div>
      <div className="flex flex-col gap-y-5">
        <div className="rounded-lg border border-red-600 p-5">
          <label htmlFor="energy" className="font-bold text-red-500">
            Delete all data
          </label>
          <p className="text-sm text-red-500">
            This will erase all your saved data.
          </p>
          <button
            className="btn btn-danger mt-5"
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            Delete all
          </button>
        </div>
      </div>
      {isDialogOpen && (
        <ConfirmationDialog
          onClose={() => setIsDialogOpen(false)}
          name={'All Data'}
          deleteFn={() => deleteAll()}
        />
      )}
    </Section>
  )
}

export default Settings
