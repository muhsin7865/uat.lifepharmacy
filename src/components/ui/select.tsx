import { Listbox, ListboxProps, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React, { Fragment, ReactNode } from "react";
import { Icon, IconProps } from "./icons";

const SelectContainer = React.forwardRef(
  (
    {
      value,
      setValue,
      children,
      iconProps,
    }: {
      value: any;
      setValue: any;
      children: any;
      iconProps?: ReactNode;
    },
    ref: any
  ) => {
    return (
      <Listbox value={value} onChange={setValue} ref={ref}>
        <div className="relative mt-1">
          <Listbox.Button className="relative flex space-x-3 sm:text-sm items-center w-full cursor-default border border-gray-200 bg-white py-2 pl-3 pr-10 text-left rounded-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ">
            {iconProps && <div className="p-1">{iconProps}</div>}
            <span className="block truncate">{value}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0 "
          >
            {children}
          </Transition>
        </div>
      </Listbox>
    );
  }
);

const SelectOptionsContainer = React.forwardRef((props: any, ref: any) => {
  return (
    <Listbox.Options
      ref={ref}
      className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-2 text-base shadow-md border border-muted ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    >
      {props.children}
    </Listbox.Options>
  );
});

const SelectOption = React.forwardRef(
  (
    { keyValueData, children }: { keyValueData: any; children: any },
    ref: React.Ref<any>
  ) => {
    return (
      <Listbox.Option
        key={keyValueData.key}
        className={({ active }) =>
          `relative rounded-md cursor-default select-none py-2 pl-10 pr-4 ${
            active ? "bg-slate-100 text-amber-900" : "text-gray-900"
          }`
        }
        value={keyValueData.value}
        ref={ref}
      >
        {({ selected }) => (
          <>
            {children}
            {selected ? (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            ) : null}
          </>
        )}
      </Listbox.Option>
    );
  }
);

export { SelectContainer, SelectOptionsContainer, SelectOption };
