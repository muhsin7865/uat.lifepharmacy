import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import { VariantProps, cva } from "class-variance-authority";
import { Fragment } from "react";
import * as React from "react";

import { Drawer } from "vaul";

const modalVariants = cva(
  "transform overflow-hidden rounded-2xl sm:rounded-b-2xl rounded-b-none bg-white  text-left align-middle shadow-xl transition-all",
  {
    variants: {
      size: {
        default: "sm:max-w-lg w-full p-4",
        sm: "sm:max-w-sm w-full p-3",
        lg: "sm:max-w-xl w-full sm:p-5 p-4",
        xl: "sm:max-w-2xl w-full sm:p-5 p-4",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  asChild?: boolean;
  showModal: any;
  setCloseModal: any;
  children: any;
  fullModal?: boolean;
  sheetOnly?: boolean;
}

const ModalContainer = React.forwardRef<HTMLDivElement, ModalProps>(
  ({
    sheetOnly,
    showModal,
    setCloseModal,
    children,
    className,
    size,
    fullModal,
  }) => {
    const { width } = useWindowDimensions();

    return (width > 575 || (fullModal && showModal)) && !sheetOnly ? (
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            setCloseModal(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div
            className={`fixed  ${
              fullModal
                ? "inset-0"
                : "sm:inset-y-0 bottom-0 overflow-y-auto inset-x-0"
            }`}
          >
            <div
              className={`flex min-h-full  w-full text-center ${
                fullModal ? "" : "items-center justify-center"
              }`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={cn(modalVariants({ size, className }))}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    ) : (
      <Drawer.Root shouldScaleBackground={false} open={showModal} onClose={() => setCloseModal(false)}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[100]" />
          <Drawer.Content className="bg-white flex flex-col p-3 rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-[100]">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2" />
            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
);

export default ModalContainer;
