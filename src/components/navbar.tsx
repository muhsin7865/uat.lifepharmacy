import { useState } from "react";
import React, { FC } from "react";
import SmMenu from "./sm-menu";
import dynamic from "next/dynamic";
import { useModal } from "./ui/modalcontext";
import SmNavbar from "./sm-navbar";
import LgNavbar from "./lg-navbar";

const LanguageChangeModal = dynamic(() => import("./language-change-modal"), {
  ssr: false,
});
const LocationModal = dynamic(() => import("./location-modal"), {
  ssr: false,
});
const AuthModal = dynamic(() => import("./authorixzation-modal"), {
  ssr: false,
});

const AddressModal = dynamic(() => import("./address-modal"), {
  ssr: false,
});

const OrderSucessSheet = dynamic(() => import("./sheet-order-sucess"), {
  ssr: false,
});

const TermsOfUseModal = dynamic(() => import("./terms-of-use-modal"), {
  ssr: false,
});

const PrivacyPolicyModal = dynamic(() => import("./privacy-policy-modal"), {
  ssr: false,
});

const SmSearchBoxModal = dynamic(() => import("./sm-searchbox-modal"), {
  ssr: false,
});

interface navbarProps {
  data: any;
  brands_data: any;
}

const Navbar: FC<navbarProps> = ({ data, brands_data }) => {

  const [languageModal, setLanguageModal] = useState(false);

  const setModalState = (modalState: any) => {
    setLanguageModal(modalState);
  };
  const {
    setSheetOpen,
    isSheetOpen,
    searchButtonOnClick,
    setSmScreenSearchBox,
  } = useModal();

  return (
    <>
      <SmNavbar
        setLanguageModal={setLanguageModal}
      />

      <LgNavbar
        data={data}
        brands_data={brands_data}
        setLanguageModal={setLanguageModal}
      />

      <LocationModal />

      <AddressModal />

      <LanguageChangeModal
        setModalState={setModalState}
        modalState={languageModal}
      />

      <SmSearchBoxModal />

      <SmMenu
        searchButtonOnClick={searchButtonOnClick}
        setSmScreenSearchBox={setSmScreenSearchBox}
        isSheetOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      />

      <AuthModal />

      <TermsOfUseModal />

      <PrivacyPolicyModal />

      <OrderSucessSheet />
    </>
  );
};

export default Navbar;
