import Image from "next/image";
import Link from "next/link";
import LgScreenSubMenu from "./lg-screen-sub-menu";
import NavbarBottom from "./lg-navbar-bottom";
import LgSearch from "./lg-search";
import LgNavbarCategoriesSection from "./lg-navbar-menu";
import { useState } from "react";
import { useModal } from "./ui/modalcontext";
const LgNavbar = ({
  data,
  brands_data,
  setLanguageModal,
}: {
  data: any;
  brands_data: any;
  setLanguageModal: any;
}) => {
  const [overlayVisible, setOverlay] = useState(false);
  const {
    setSheetOpen,
    SearchLoadingState,
    searchButtonOnClick,
    searchData,
    queryData,
    searchButtonOnMouseEnter,
    locationOnClickHandle,
  } = useModal();
  return (
    <>
      <div className="md:block hidden navbar-container bg-life">
        <div className="container-page flex gap-5  sm:py-5 py-3 items-center ">
          <Link href={"/"} className="my-auto block">
            <Image
              src="/images/logos/life-logo-white.svg"
              alt=""
              className="max-w-[250px]"
              width={380}
              height={250}
            />
          </Link>
          <LgSearch
            SearchLoadingState={SearchLoadingState}
            searchButtonOnClick={searchButtonOnClick}
            searchButtonOnMouseEnter={searchButtonOnMouseEnter}
            searchData={searchData}
            queryData={queryData}
          />
          <LgScreenSubMenu
            setSheetOpen={setSheetOpen}
            setLanguageModal={setLanguageModal}
          />
        </div>
        <NavbarBottom locationOnClickHandle={locationOnClickHandle} />
        <LgNavbarCategoriesSection
          setOverlay={setOverlay}
          data={data}
          brands_data={brands_data}
        />
      </div>

      {overlayVisible ? (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-10" />
      ) : null}
    </>
  );
};

export default LgNavbar;
