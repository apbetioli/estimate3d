import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
  deleteFn: () => void;
}

export default function ConfirmationDialog({
  isOpen,
  setIsOpen,
  name,
  deleteFn,
}: PropsWithChildren<ConfirmationDialogProps>): React.ReactNode {
  function closeModal() {
    setIsOpen(false);
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg border border-red-600 bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                <Dialog.Title as="h2">Remove</Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-red-600">
                    Removing <b>{name}</b> will permanently delete it from your
                    system.
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg border border-gray-900 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 dark:border-gray-200 dark:text-gray-200"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-danger inline-flex justify-center rounded-lg border border-transparent  px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 "
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
  );
}
