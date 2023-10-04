import { RadioGroup } from "@headlessui/react";
import { FC, useState } from "react";
import Image from "next/image";

import { TransitionComp } from "./ui/transition";
import { useRouter } from "next/router";
import ModalContainer from "./ui/modal-container";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import { SelectLangBadge } from "./ui/badge";
import { toast } from "./ui/toast";
import { useLanguage } from "@/hooks/useLanguage";

interface compProps {
  setModalState: any;
  modalState: boolean;
}

const LanguageChangeModal: FC<compProps> = ({ setModalState, modalState }) => {
  const router = useRouter();
  const [IsLanguageChangeClicked, languageChangeClicked] = useState(false);
  const [IsCountryChangeClicked, CountryChangeClicked] = useState(true);
  const [selected, setSelected] = useState("");
  const [selectedCountryPath, setSelectedCountryPath] = useState("");
  const {
    countries,
    currentCountryDetails,
    languages,
    selectedLanguageDetails,
  } = useLanguage();
  function closeModal() {
    setModalState(false);
  }
  const getDirection = (langCode: any) => {
    if (langCode === "ar") {
      return "rtl";
    }
    return "ltr";
  };

  function languageOnClicked(path: any) {
    closeModal();
    router.push("", router.asPath, {
      locale: `${selectedCountryPath}-${path}`,
    });

    //@ts-ignore
    document.querySelector("html").setAttribute("dir", getDirection(path));

    toast({
      title: "Sucess",
      message: "Language Changed Successfully",
      type: "success",
    });
  }

  const countryProps = (
    <div>
      {countries.map((contr: any) => (
        <Button
          variant={"productsListBtn"}
          size={"lg"}
          onClick={() => {
            countryClicked(contr.path);
          }}
          iconRight={
            <Icon
              type="chevronRightIcon"
              className=" ltr:ml-auto rtl:mr-auto rotate-0 rtl:-rotate-180"
            />
          }
          className="border border-muted first:rounded-b-none last:rounded-t-none even:border-t-0 py-3"
        >
          <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse ">
            <div className="md:h-8 md:w-8 w-6 h-6 rounded-full my-auto">
              <Image
                src={contr.flag}
                height="15"
                width="20"
                className="h-full w-full"
                alt=""
              />
            </div>
            <Typography bold={"bold"} size={"sm"} lineClamp={"one"}>
              {" "}
              {contr.country}
            </Typography>
            {contr.path === currentCountryDetails.path ? (
              <SelectLangBadge selectLang={selectedLanguageDetails.name} />
            ) : null}
          </div>
        </Button>
      ))}
    </div>
  );

  const languageProps = (
    <RadioGroup value={selected} onChange={setSelected}>
      <div className="">
        {languages.map((lang: any) => (
          <RadioGroup.Option
            onClick={() => {
              languageOnClicked(lang.path);
            }}
            key={lang.name}
            value={lang.name}
            className={({ active, checked }) =>
              `
${checked ? "bg-emerald-200 bg-opacity-75 " : "bg-white"}
relative flex cursor-pointer rounded-lg px-5 md:py-4  border border-muted first:rounded-b-none last:rounded-t-none even:border-t-0 py-3 focus:outline-none `
            }
          >
            {({ active, checked }) => (
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className=" md:text-sm text-[10px]">
                    <RadioGroup.Label
                      as="p"
                      className={`font-medium  ${
                        checked ? "" : "text-gray-900"
                      }`}
                    >
                      {lang.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={`inline ${
                        checked ? "text-sky-100" : "text-gray-500"
                      }`}
                    ></RadioGroup.Description>
                  </div>
                </div>
                {checked && (
                  <Icon
                    type="checkIcon"
                    className="fill-emerald-500 text-green-100"
                  />
                )}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );

  function languageBackClicked() {
    CountryChangeClicked(true);
    languageChangeClicked(false);
  }
  function countryClicked(path: string) {
    if (path === currentCountryDetails.path) {
      setSelected(selectedLanguageDetails.name);
    } else {
      setSelected("");
    }
    CountryChangeClicked(false);
    languageChangeClicked(true);
    setSelectedCountryPath(path);
  }
  return (
    <>
      <ModalContainer showModal={modalState} setCloseModal={closeModal}>
        <div className="flex justify-between  my-auto items-center pb-3 w-full">
          {!IsCountryChangeClicked ? (
            <Button
              variant={"closeBtn"}
              size={"sm"}
              className="ltr:mr-auto rtl:ml-auto rtl:mr-0  ltr:ml-0"
              onClick={() => {
                languageBackClicked();
              }}
              rounded={"full"}
            >
              <Icon type="chevronLeftIcon" />
            </Button>
          ) : null}

          <Typography bold={"bold"} size={"lg"} lineClamp={"one"}>
            {" "}
            Select Your Preference
          </Typography>
          <Button
            size={"sm"}
            rounded={"full"}
            variant={"closeBtn"}
            onClick={() => {
              closeModal();
            }}
          >
            <Icon type="crossIcon" />
          </Button>
        </div>

        {IsCountryChangeClicked ? (
          <TransitionComp setTransition={IsCountryChangeClicked}>
            {countryProps}
          </TransitionComp>
        ) : null}

        {IsLanguageChangeClicked ? (
          <TransitionComp setTransition={IsLanguageChangeClicked}>
            {languageProps}
          </TransitionComp>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default LanguageChangeModal;
