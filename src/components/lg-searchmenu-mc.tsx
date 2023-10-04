import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "./ui/icons";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";
import { ProductsSkeleton, SugesstionsSkeleton } from "./skeletons";
import { useRouter } from "next/router";
import { useLanguage } from "@/hooks/useLanguage";

const SearchBoxSuggMenuMC = ({ placeholderData }: { placeholderData: any }) => {
  const [searchData, setSearchData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTimer, setSearchTimer] = useState<any>(null);

  const {locale} = useLanguage()

  const fetchSearchData = (term: string) => {
    const api = `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/clinics/v1/suggestions?term=${term}&lang=${locale}`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => setSearchData(data));
  };



  const searchMouseEnter = (term: string) => {
    setSearchTerm(term);

    clearTimeout(searchTimer);

    const newTimer = setTimeout(() => {
      fetchSearchData(term);
    }, 500);

    setSearchTimer(newTimer);
  };

  const [LMCSearcsuggestionState, setLMCSearcsuggestionState] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const redirect = (pathname: string) => {
    router.push(pathname);
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      //@ts-ignore
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setLMCSearcsuggestionState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative z-30" ref={inputRef}>
      <div className="w-full">
        <Input
          onClick={() => {
            // searchButtonOnClick(true);
            // setLgSearchBoxSuggestionState(true);
            setLMCSearcsuggestionState(!LMCSearcsuggestionState);
            searchMouseEnter("");
          }}
          rounded={"full"}
          iconLeft={
            <Icon
              sizes={"sm"}
              className="text-slate-500"
              type="searchIcon"
              variant={"inputIconLeft"}
            />
          }
          defaultValue={""}
          onChange={(e) => searchMouseEnter(e.target.value)}
          className={""}
          placeholder={placeholderData}
        />
      </div>
      {LMCSearcsuggestionState && (
        <div className=" relative">
          <div className="absolute z-30 right-0 top-1 left-0 bg-white rounded-lg w-full border border-muted shadow-md">
            <div className="w-full bg-white ">
              {searchData ? (
                searchData.data.length > 0 ? (
                  <div className="p-3">
                    {searchData.data.map((suggChld: any) =>
                      suggChld.type === "suggestions" ? (
                        <div className="flex  flex-wrap ">
                          {suggChld.data.map((sugg: any) => (
                            <Button
                            onClick={()=>router.push({
                              pathname:"/doctors", 
                              query:{
                                term:sugg.slug
                              }
                            })}
                              size={"sm"}
                              iconLeft={
                                <Icon
                                  sizes={"sm"}
                                  type="trendingIcon"
                                  className="ltr:mr-2 rtl:ml-2 text-slate-400"
                                />
                              }
                              variant={"normal"}
                              className="mr-2 mb-2 h-fit text-life"
                            >
                              {sugg.title}
                            </Button>
                          ))}
                        </div>
                      ) : null ||
                        suggChld.type === "clinics" ||
                        suggChld.type === "specialties" ||
                        suggChld.type === "doctors" ? (
                        <div className="pt-2">
                          <Typography variant={"lifeText"} bold={"semibold"}>
                            {suggChld.title}
                          </Typography>
                          <div className=" py-2">
                            {suggChld.data.map((sugg: any) => (
                              <Link
                                href={sugg.slug}
                                className=" py-2 group block border-muted border-b"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex space-x-2 items-center">
                                    <Image
                                      src={
                                        sugg.image != ""
                                          ? sugg.image
                                          : "/images/default-product-image.png"
                                      }
                                      height={40}
                                      width={40}
                                      alt={sugg.term}
                                    />
                                    <Typography
                                      variant={"lifeText"}
                                      bold={"semibold"}
                                    >
                                      {" "}
                                      {sugg.title}
                                    </Typography>
                                  </div>
                                  <Icon type="chevronRightIcon" sizes={"sm"} />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                ) : (
                  <p className="text-center p-2">
                    <i>Nothing match your Searching</i>{" "}
                  </p>
                )
              ) : (
                <div role="status" className="max-w-full animate-pulse px-3">
                  <div className="group-search mb-5 pt-4 space-y-2">
                    <div className="flex  flex-wrap">
                      <SugesstionsSkeleton noOfSuggestions={6} />
                    </div>
                    <div className="group-search text-xs text-gray-600 space-y-3">
                      <ProductsSkeleton noOfSuggestions={4} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* <Popover placement="bottom">
            <div className='relative max-w-[1440px]'>
                <PopoverHandler onClick={() => fetchSearchData(searchTerm)}>
                    <div className="relative py-5">
                        <div className={`absolute inset-y-0  flex items-center pointer-events-none left-0 pl-3 `}>
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        < input ref={input => input && input.focus()} type="search" defaultValue={""} id="lg-searchbox" onChange={(e) => searchMouseEnter(e.target.value)}
                            className={`shadow  border-muted border p-[1rem] pl-10  text-gray-900 text-sm rounded-full w-full`}
                            placeholder={placeholderData} />
                    </div>
                </PopoverHandler>

                <PopoverContent className="absolute left-3 right-3 z-10 -mt-3 transform sm:px-0 max-w-[1440px] shadow-lg rounded-lg  border border-muted !py-1">
                    <div className='w-full bg-white '>
                        {searchData ? 
                        searchData.data.length>0?
                            <div className='px-3'>
                                {searchData.data.map((suggChld: any) => (
                                    suggChld.type === "suggestions" ?
                                        <ul className='flex  flex-wrap '>
                                            {
                                                suggChld.data.map((sugg: any) => (
                                                    <li className='bg-light flex items-center rounded-md space-x-1 px-2 py-1 w-fit shadow-sm cursor-pointer mr-2 mt-2'>
                                                        <Image src="https://www.lifepharmacy.com/images/svg/trending.svg" height={25} width={25} alt="trending" />
                                                        <small>{sugg.title}</small>
                                                    </li>
                                                ))}
                                        </ul>
                                        : null
                                            ||
                                            suggChld.type === "clinics" || suggChld.type === "specialties" || suggChld.type === "doctors" ?
                                            <div className='pt-2'>
                                                <small className='text-life font-semibold text-sm'>{suggChld.title}</small>
                                                <div className=' py-2'>
                                                    {suggChld.data.map((sugg: any) => (
                                                        <Link href={sugg.slug} className=' py-2 group block border-muted border-b'>
                                                            <div className='flex justify-between'>
                                                                <div className='flex space-x-2 items-center'>
                                                                    <Image src={sugg.image != "" ? sugg.image : "/images/default-product-image.png"} height={25} width={25} alt={sugg.term} />
                                                                    <small className='text-sm group-hover:text-blue-700 text-black transition-colors duration-200 font-semibold'> {sugg.title}</small>
                                                                </div>
                                                                <Icon type="chevronRightIcon" sizes={"sm"}/>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            : null
                                ))}
                            </div>
                            :<p className='text-center p-2'><i>Nothing match your Searching</i> </p>
                            : null}
                    </div>

                </PopoverContent>
            </div>

        </Popover> */}
    </div>
  );
};

export default SearchBoxSuggMenuMC;
