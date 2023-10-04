import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "./ui/input";
import { typographyVariants } from "./ui/typography";
import { cn } from "@/lib/utils";
import LgSearchSuggestions from "./lg-search-suggestions";
import { useModal } from "./ui/modalcontext";
import { Icon } from "./ui/icons";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

export default function LgSearch({
  SearchLoadingState,
  searchButtonOnClick,
  searchData,
  queryData,
  searchButtonOnMouseEnter,
}: {
  SearchLoadingState: any;
  queryData: any;
  searchData: any;
  searchButtonOnMouseEnter: any;
  searchButtonOnClick: any;
}) {
  const { t } = useLanguage();

  const {
    searchBoxClear,
    searchSuggestions,
    lgSearchBoxSuggestionState,
    setLgSearchBoxSuggestionState,
  } = useModal();

  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      //@ts-ignore
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setLgSearchBoxSuggestionState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative z-30" ref={inputRef}>
      <div className="w-full">
        <Input
          id="lg-searchbox"
          onClick={() => {
            searchButtonOnClick(true);
            setLgSearchBoxSuggestionState(true);
          }}
          iconLeft={
            <Icon
              sizes={"sm"}
              className="text-slate-500"
              type="searchIcon"
              variant={"inputIconLeft"}
            />
          }
          iconRight={
            SearchLoadingState ? (
              <Icon
                type="loadingIcon"
                sizes={"sm"}
                animation={"spin"}
                variant={"inputIconRight"}
              />
            ) : (
              lgSearchBoxSuggestionState && (
                <Button
                  onClick={() => searchBoxClear()}
                  className={""}
                  size={"xs"}
                  rounded={"full"}
                  variant={"clearBtn"}
                >
                  <Icon sizes={"sm"} type="crossIcon" className="mx-auto" />
                </Button>
              )
            )
          }
          onChange={(e) => {
            searchButtonOnMouseEnter((e.target as HTMLInputElement).value);
          }}
          className={cn(
            typographyVariants({ size: "sm", bold: "light" }),
            `${
              lgSearchBoxSuggestionState
                ? "rounded-2xl rounded-b-none"
                : "rounded-full"
            }`,
            "!transition-none "
          )}
          onKeyDown={(e) =>
            e.key === "Enter"
              ? searchSuggestions(
                  (e.target as HTMLInputElement).value,
                  false,
                  "search"
                )
              : null
          }
          defaultValue={queryData}
          placeholder={t.navbar.searchbox_text}
        />

        {lgSearchBoxSuggestionState && (
          <div className=" relative">
            <div className="absolute z-30 right-0  left-0 bg-white rounded-lg rounded-t-none border-t w-full ">
              <LgSearchSuggestions searchData={searchData} close={() => null} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
