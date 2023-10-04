import getDoctorsListData from "@/lib/getDoctorsListData";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/accordion-radix";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import { useRouter } from "next/router";
import { Icon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { SingleDoctorData } from "@/components/single-doctor-data";
import {
  RadioGroupSkeleton,
  SingleDoctorSkelton,
} from "@/components/skeletons";
import getDoctorsAvailabilityData from "@/lib/getAvailabilityStatus";
import { useLanguage } from "@/hooks/useLanguage";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import getLMCDoctorsSpecialityDetails from "@/lib/getLMCDoctorsSpecialityDetails";

export default function ({ DoctorsListData }: { DoctorsListData: any }) {
  const [doctorsData, setDoctorsData] = useState<any>([]);
  const [IsClientSideData, setIsClientSideData] = useState(false);
  const [noOfDoctors, setnoOfDoctors] = useState(10);
  const [animateSpin, setAnimateSpin] = useState(false);
  const [doctorsFiltersApplied, setDoctorsFilters] = useState(false);
  const [doctorsAvailabilityData, setDoctorsAvailabilityData] =
    useState<any>(null);
  const [specialityData, setSpecialityData] = useState<any>(null);
  const { query } = useRouter();
  const router = useRouter();

  const LoadMoreDoctorsData = () => {
    setAnimateSpin(true);
    getDoctorsListData(10, noOfDoctors, query).then((dList) => {
      debugger;

      setDoctorsData((prevData: any) => [...prevData, ...dList.data]);
      setAnimateSpin(false);
    });
    setnoOfDoctors((no) => no + 10);
  };

  const filtersOnChange = (filterType: string, filterValue: string) => {
    setIsClientSideData(true);

    setDoctorsFilters(true);
    router.push(
      {
        query: {
          ...router.query,
          [filterType]: filterValue,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    getDoctorsAvailabilityData(locale || "ae-en").then((res) => {
      setDoctorsAvailabilityData(res.data);
    });
    getLMCDoctorsSpecialityDetails(locale || "ae-en").then((res) => {
      setSpecialityData(res.data);
    });
  }, []);

  useEffect(() => {
    debugger;
    const handleRouteChange = () => {
      debugger;
      getDoctorsListData(10, 0, query).then((dList) => {
        debugger;
        setDoctorsData(dList.data.doctors);
        setDoctorsFilters(false);
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  const { locale } = useLanguage();

  return (
    <div className="max-w-[1440px] px-[10px] mx-auto">
      <BreadCrumb
        menuData={["Medical Centre", "Doctors"]}
        type="Medical Centre"
      />
      <div className="grid grid-cols-12 space-x-2  rtl:space-x-reverse">
        <div className="col-span-3">
          <form className="hidden lg:block sticky top-40 ">
            <div className="justify-between flex py-2 text-sm">
              <p>Filters:</p>
              <Link href="/doctors" className="text-primary ">
                <small>Clear All</small>
              </Link>
            </div>
            <hr />
            <Accordion.Root type="single" defaultValue="item-1" collapsible>
              <AccordionItem className="py-2" value="item-1">
                <AccordionTrigger className=" text-lg py-3 flex justify-between">
                  Neatest Clinics
                  <Icon
                    type="chevronBottomIcon"
                    className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 text-slate-400"
                  />
                </AccordionTrigger>

                <AccordionContent className="py-2">
                  <div className="mb-2">
                    <Typography
                      size={"xs"}
                      className="!leading-5"
                      bold={"light"}
                    >
                      Visit any Life Walk in clinic to give your sample
                      conviniently located across UAE.
                    </Typography>
                    <button className="bg-life text-white text-xs px-3 py-0.5 rounded-full my-2">
                      SELECT LOCATION
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
            <hr />
            <Accordion.Root collapsible defaultValue="item-1" type="single">
              <AccordionItem className="py-2" value="item-1">
                <AccordionTrigger className=" text-lg py-3 flex justify-between">
                  Now or Later
                  <Icon
                    type="chevronBottomIcon"
                    className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 text-slate-400"
                  />
                </AccordionTrigger>

                <AccordionContent className="py-2">
                  {doctorsAvailabilityData ? (
                    <RadioGroup
                      className="mb-2"
                      onValueChange={(e) => {
                        filtersOnChange("slot", e);
                      }}
                    >
                      {doctorsAvailabilityData.map((dDetails: any) => (
                        <div className="flex space-x-3 items-center">
                          <RadioGroupItem
                            value={dDetails.key}
                            id={dDetails.key}
                          />
                          <label
                            htmlFor={dDetails.key}
                            className="mx-4 cursor-pointer"
                          >
                            {dDetails.name}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <RadioGroupSkeleton noOfSuggestions={6} />
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
            <hr />

            <Accordion.Root type="single" defaultValue="item-1" collapsible>
              <AccordionItem className="py-2" value="item-1">
                <AccordionTrigger className=" text-lg py-3 flex justify-between">
                  Specialities
                  <Icon
                    type="chevronBottomIcon"
                    className="mx-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 text-slate-400"
                  />
                </AccordionTrigger>
                <AccordionContent className="py-2">
                  {specialityData ? (
                    <RadioGroup>
                      {specialityData.map((spData: any) => (
                        <div className="flex items-center space-x-3 ">
                          <RadioGroupItem
                            value={spData.slug}
                            id={spData.slug}
                            checked={query.speciality === spData.slug}
                            onChange={() => {
                              filtersOnChange("speciality", spData.slug);
                            }}
                          />
                          <label
                            htmlFor={spData.slug}
                            className="mx-4 cursor-pointer"
                          >
                            {spData.name}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <RadioGroupSkeleton noOfSuggestions={4} />
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
          </form>
        </div>
        <div className="lg:col-span-9 col-span-full  my-3 space-y-3">
          {!IsClientSideData
            ? DoctorsListData.data.doctors.map((dList: any) => (
                <SingleDoctorData dList={dList} />
              ))
            : null}
          {!doctorsFiltersApplied &&
            doctorsData.length > 0 &&
            doctorsData.map((dList: any) => <SingleDoctorData dList={dList} />)}
          {doctorsFiltersApplied && <SingleDoctorSkelton noOfSuggestions={5} />}
          {noOfDoctors === doctorsData.length ? (
            <div className="py-4 w-full flex justify-center">
              <Button
                size={"lg"}
                onClick={() => LoadMoreDoctorsData()}
                rounded={"full"}
                variant={"outline"}
                className="mx-auto"
                iconLeft={
                  <Icon
                    sizes={"sm"}
                    type="refreshIcon"
                    className={`${animateSpin ? "animate-spin" : " "} mx-2`}
                  />
                }
              >
                Load More
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  const DoctorsListData = await getDoctorsListData(10, 0, query);

  return {
    props: {
      DoctorsListData,
    },
  };
}
