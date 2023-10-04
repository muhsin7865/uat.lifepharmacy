import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { Input } from "./ui/input";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";



const Multiselect = ({ categoriesData }: { categoriesData: any }) => {
  const [selectedItems, setSelected] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [catData, setCatData] = useState<any>(null);

  useEffect(() => {

}, [catData]);
  const addTag = (item: any) => {
    setSelected(selectedItems.concat(item));

    setCatData(
      categoriesData.filter(
        (itemData: any) => !selectedItems.concat(item).includes(itemData.name)
      )
    );
  };
  const removeTag = (item: any) => {
    const filtered = selectedItems.filter((e: any) => e !== item);
    setSelected(filtered);

    setCatData(
        categoriesData.filter(
          (itemData: any) => !filtered.includes(itemData.name)
        )
      );
  };

  const resetButtonClick = () => {
    setCatData(categoriesData)
    setSelected([]);


  }

  return (
    <div className="autcomplete-wrapper my-2">
           <div className="flex justify-between items-center">
            <Typography bold={"semibold"}>Filters</Typography>
            <Button onClick={()=>resetButtonClick()} size={"xs"}>Reset</Button>
          </div>
      <div className="h-fit  w-full my-2">
        {selectedItems.length > 0 ? (
          <div className="flex flex-auto flex-wrap border border-slate-300 p-1 rounded-lg">
            {selectedItems.map((tag: any, index: any) => {
              return (
                <Button
                  size={"sm"}
                  className="m-1"
                  key={index}
                  iconRight={
                    <div onClick={() => removeTag(tag)}>
                      <Icon type="crossIcon" sizes={"sm"} className="ml-2" />
                    </div>
                  }
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        ) : null}{" "}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className=" ">
            <Input
            sizes={"sm"}
              iconLeft={
                <Icon type="searchIcon" sizes={"xs"} variant={"inputIconLeft"}/>
              }
              placeholder="Search for categories..."
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className=" p-1.5">
          <Command>
            <CommandInput placeholder="Search Categories..." className="h-9" />
            <CommandEmpty>Nothing Found.</CommandEmpty>
            <CommandGroup className="m-1">
              {catData === null
                ? categoriesData.map((category: any) => (
                    <CommandItem
                      key={category.name}
                      className="cursor-pointer"
                      onSelect={() => {
                        addTag(category.name);
                      }}
                    >
                      {category.name}
                    </CommandItem>
                  ))
                : catData.map((category: any) => (
                    <CommandItem
                      key={category.name}
                      className="cursor-pointer"
                      onSelect={() => {
                        addTag(category.name);
                      }}
                    >
                      {category.name}
                    </CommandItem>
                  ))}

              {}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Multiselect;
