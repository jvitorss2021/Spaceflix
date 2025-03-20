"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { userService } from "@/services/api";

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
  const { user, setUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Você precisa estar logado para assinar um plano");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulação de processamento de pagamento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const updatedUser = await userService.updateSubscription({
        plan: selectedPlan?.name.toLowerCase() || "free",
      });

      setUser(updatedUser);

      Cookies.set("user", JSON.stringify(updatedUser), {
        expires: 30,
        path: "/",
      });

      toast.success(`Parabéns! Você assinou o plano ${selectedPlan?.name}`);
      onClose();

      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast.error("Ocorreu um erro ao processar o pagamento. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

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
                    disabled={isProcessing}
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
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-300"
                          >
                            Número do Cartão
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2"
                            placeholder="1234 5678 9012 3456"
                            required
                            disabled={isProcessing}
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
                              value={formData.expiry}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2"
                              placeholder="MM/AA"
                              required
                              disabled={isProcessing}
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
                              value={formData.cvv}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2"
                              placeholder="123"
                              required
                              disabled={isProcessing}
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
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm p-2"
                            placeholder="Nome completo"
                            required
                            disabled={isProcessing}
                          />
                        </div>

                        <div className="mt-8">
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
                          >
                            {isProcessing ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processando...
                              </span>
                            ) : (
                              `Confirmar Assinatura - ${selectedPlan?.price}${selectedPlan?.frequency}`
                            )}
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
