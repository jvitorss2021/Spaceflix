"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: string;
    frequency: string;
  } | null;
}

export function PaymentModal({
  isOpen,
  onClose,
  selectedPlan,
}: PaymentModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-transparent text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-white mb-8"
                    >
                      Assinar {selectedPlan?.name}
                    </Dialog.Title>
                    <div className="mt-2">
                      <form className="space-y-6">
                        <div>
                          <label
                            htmlFor="card-number"
                            className="block text-sm font-medium text-gray-300"
                          >
                            Número do Cartão
                          </label>
                          <input
                            type="text"
                            name="card-number"
                            id="card-number"
                            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="expiry"
                              className="block text-sm font-medium text-gray-300"
                            >
                              Data de Expiração
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              id="expiry"
                              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm font-medium text-gray-300"
                            >
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              id="cvv"
                              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2"
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300"
                          >
                            Nome no Cartão
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2"
                            placeholder="Nome completo"
                          />
                        </div>

                        <div className="mt-8">
                          <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Confirmar Assinatura - {selectedPlan?.price}
                            {selectedPlan?.frequency}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
