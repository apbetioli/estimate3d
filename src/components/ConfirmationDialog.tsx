import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function ConfirmationDialog({isOpen, setIsOpen, name, deleteFn}: any) {
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#161f29] p-6 text-left align-middle shadow-xl transition-all border border-[#dc2625]">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-[#9e9fa2]"
                  >
                    Remove
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-[#dc2625]">
                    Removing <b>{name}</b> will permanently delete it from your system.
                    </p>
                  </div>

                  <div className="mt-4 justify-end flex gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#323e4f] px-4 py-2 text-sm font-medium text-white hover:bg-[#495668] focus:outline-none focus-visible:ring-2 "
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#dc2625] px-4 py-2 text-sm font-medium text-white hover:bg-[#d64949] focus:outline-none focus-visible:ring-2 "
                      onClick={() => {
                        deleteFn();
                        closeModal();
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
