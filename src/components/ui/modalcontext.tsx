import { useSession } from "next-auth/react";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import getSearchDataSuggsetions from "@/lib/getSearchData";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import getSessionDataAddress from "@/lib/getSessionAddress";
import { useRouter } from "next/router";
import { getReverseGeoCodingApiData } from "@/helpers/getReverseGeoCodingApiData";
type ModalContextState = {
  locationModalState: boolean;
  setLocationModalState: Dispatch<SetStateAction<boolean>>;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  setaddNewAddress: Dispatch<SetStateAction<boolean>>;
  setaddnewAddressFormVisibility: Dispatch<SetStateAction<boolean>>;
  isSheetOpen: boolean;
  locationModal: boolean;
  setLocationModal: Dispatch<SetStateAction<boolean>>;
  addNewAddress: boolean;
  setAddressDataIndex: Dispatch<SetStateAction<any>>;
  AddressDataIndex: any;
  availableAddresses: boolean;
  setavailableAddresses: Dispatch<SetStateAction<boolean>>;
  isPhoneNumberValid: boolean;
  setPhoneNumberValidState: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<any>>;
  formData: any;
  formDatahandleChange: any;
  isFixedModal: boolean;
  searchButtonOnClick: (isOpen: boolean) => void;
  searchData: any;
  setModalFixedState: Dispatch<SetStateAction<boolean>>;
  SearchLoadingState: boolean;
  queryData: string;
  searchButtonOnMouseEnter: any;
  smScreenSearchBox: any;
  setSmScreenSearchBox: Dispatch<SetStateAction<boolean>>;
  setQueryData: Dispatch<SetStateAction<string>>;
  searchBoxClear: any;
  searchClosebtn: boolean;
  selectedUserPrefernece: any;
  setUsersPreference: any;
  setTermsModal: any;
  termsModalState: any;
  setPrivacyPolicyModalState: any;
  PrivacyPolicyModalState: any;
  OrderSucessSheetState: boolean;
  setOrderSucessSheetState: Dispatch<SetStateAction<boolean>>;
  setFrequentlyBroughtData: Dispatch<SetStateAction<any>>;
  setLoadingState: Dispatch<SetStateAction<string>>;
  loading: string;
  frequentlyBroughtData: any;
  countriesDrawerState: boolean;
  setCountriesDrawerState: Dispatch<SetStateAction<boolean>>;
  setSelectedCountryData: Dispatch<SetStateAction<any>>;
  selectedCountryData: any;
  formDataInitState: any;
  addressData: any;
  setAddressData: Dispatch<SetStateAction<any>>;
  lgSearchBoxSuggestionState: boolean;
  setLgSearchBoxSuggestionState: Dispatch<SetStateAction<boolean>>;
  addNewAddressClick: boolean;
  setAddNewAddressClick: Dispatch<SetStateAction<boolean>>;
  locationOnClickHandle: () => void;
  searchSuggestions: (
    searchData: string,
    isMobile: boolean,
    type: string
  ) => void;
  addnewAddressFormVisibility: boolean;
  currentLocation: any;
  setCurrentLocation: any;
  selectedLocation: any;
  setSelectedLocation: any;
};

const ModalContext = createContext<ModalContextState | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: any }) => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [locationModalState, setLocationModalState] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [addNewAddress, setaddNewAddress] = useState(false);
  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] =
    useState(false);

  const [availableAddresses, setavailableAddresses] = useState(false);
  const [isPhoneNumberValid, setPhoneNumberValidState] = useState(false);
  const [AddressDataIndex, setAddressDataIndex] = useState<any>(null);
  const [isFixedModal, setModalFixedState] = useState(false);
  const [queryData, setQueryData] = useState("");
  const [searchClosebtn, setVisibility] = useState(false);
  const [searchTimer, setSearchTimer] = useState<any>(null);
  const [SearchLoadingState, setSearchLoadingState] = useState(false);
  const [smScreenSearchBox, setSmScreenSearchBox] = useState(false);
  const [selectedUserPrefernece, setUsersPreference] = useState<any>(null);
  const { width } = useWindowDimensions();
  const [termsModalState, setTermsModal] = useState(false);
  const [PrivacyPolicyModalState, setPrivacyPolicyModalState] = useState(false);
  const [OrderSucessSheetState, setOrderSucessSheetState] = useState(false);
  const [frequentlyBroughtData, setFrequentlyBroughtData] = useState<any>(null);
  const [loading, setLoadingState] = useState<string>("");
  const [countriesDrawerState, setCountriesDrawerState] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState<any>({
    name: "United Arab Emirates",
    alpha2Code: "AE",
    callingCodes: ["971"],
    independent: false,
  });
  const [addressData, setAddressData] = useState<any>(null);
  const [lgSearchBoxSuggestionState, setLgSearchBoxSuggestionState] =
    useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(false);

  const [currentLocation, setCurrentLocation] = useState<any>([
    25.192622, 55.276383,
  ]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // console.log(AddressDataIndex);

  const [searchData, setData] = useState({
    results: [
      {
        hits: [
          {
            title: "",
            images: {
              featured_image:
                "https://www.life-me.com/wp-content/themes/LifePharmacy/assets/images/life-pharmacy-logo-white.png",
            },
            query: "",
            slug: "",
          },
        ],
      },
    ],
  });
  const searchSuggestions = (
    searchData: string,
    isMobile: boolean,
    type: string
  ) => {
    debugger;

    if (type === "search") {
      router.push(`/search?term=${searchData}`);
    } else {
      router.push(`/product/${searchData}`);
    }
    if (width > 767) {
      setLgSearchBoxSuggestionState(false);
    } else {
      setSmScreenSearchBox(false);
    }
  };
  const searchButtonOnClick = (isOpen: boolean) => {
    if (window.innerWidth > 767) {
      // }
    } else {
      setSmScreenSearchBox(true);
    }
    searchButtonOnMouseEnter(queryData);
  };
  // var addressId = session
  //   ? session.token.addresses.length != 0
  //     ? session.token.addresses[session.token.addresses.length - 1]?.id + 1
  //     : 12345 + 1
  //   : "";

  const searchBoxClear = () => {
    if (width > 575) {
      (document.getElementById("lg-searchbox") as HTMLInputElement).value = "";
    } else {
      (document.getElementById("sm-searchbox") as HTMLInputElement).value = "";
    }

    setQueryData("");
    searchButtonOnMouseEnter("");
    setVisibility(false);
  };

  const getSearchData = (query: string) => {
    setSearchLoadingState(true);
    getSearchDataSuggsetions(query).then((res) => {
      setData(res);
      setSearchLoadingState(false);
    });
  };

  function searchButtonOnMouseEnter(query: string) {
    setQueryData(query);

    clearTimeout(searchTimer);

    const newTimer = setTimeout(() => {
      getSearchData(query);
    }, 600);

    setSearchTimer(newTimer);

    if (query != "") {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }

  const formDataInitState = {
    // entity_id: 1462724,
    // longitude: "55.272887000000000",
    // latitude: "25.219370000000000",
    area: "Satwa",
    suitable_timing: "morning",
    // created_at: currentDate.toISOString(),
    // updated_at: currentDate.toISOString(),
    belongs_to: "user",
    deleted_at: null,
    is_validated: 1,
  };

  const [formData, setFormData] = useState(

    formDataInitState
  );

  const getLocationByIp = () => {
    try {
      fetch("https://ipwho.is/")
        .then((res) => res.json())
        .then((res) => {
          setCurrentCordinates(res.latitude, res.longitude);
        });
    } catch (err) {
      setCurrentCordinates(25.192622, 55.276383);
    }
  };
  const setCurrentCordinates = (lat: number, lng: number) => {
    setCurrentLocation([lat, lng]);
    setSelectedLocation([lat, lng]);

    // getReverseGeoCodingApiData(lat, lng);
  };

  // console.log(AddressDataIndex);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentCordinates(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          getLocationByIp();
        }
      );
    }
  }, []);

  useEffect(() => {
    if (session?.token.token) {
      // debugger;

      getSessionDataAddress(session?.token.token).then((res) => {
        // debugger;
        if (!session.token.selected_address) {
          if (res.data.addresses.length > 0) {
            update({ selected_address: res.data.addresses[0] });
            setAddressDataIndex(res.data.addresses[0]);
          } else {
            getReverseGeoCodingApiData(
              currentLocation[0],
              currentLocation[1]
            ).then((res) =>
              update({
                selected_address: {
                  ...res,
                  longitude: currentLocation[0],
                  latitude: currentLocation[1],
                },
              })
            );
          }
          setAddressData(res.data.addresses);
        } else {
          setAddressData(res.data.addresses);
          setAddressDataIndex(session?.token.selected_address);
        }
      });
    }
  }, [session?.token.token]);

  const formDatahandleChange = (e: any): void => {
    const { name, value } = e.target;

    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const locationOnClickHandle = () => {
    debugger;
    if (session != null) {
      if (addressData) {
        setaddNewAddress(true);

        if (addressData.length > 0) {
          setavailableAddresses(true);
        } else if (addressData.length === 0) {
          setAddNewAddressClick(true);
        }
      }
    } else {
      setLocationModalState(true);
    }
  };

  const contextValue: ModalContextState = {
    locationModalState,
    setLocationModalState,
    setSheetOpen,
    setaddNewAddress,
    setaddnewAddressFormVisibility,
    isSheetOpen,
    locationModal,
    setLocationModal,
    addNewAddress,
    setAddressDataIndex,
    AddressDataIndex,
    availableAddresses,
    setavailableAddresses,
    isPhoneNumberValid,
    setPhoneNumberValidState,
    setFormData,
    formData,
    formDatahandleChange,
    isFixedModal,
    setModalFixedState,
    searchButtonOnClick,
    searchData,
    SearchLoadingState,
    queryData,
    searchButtonOnMouseEnter,
    smScreenSearchBox,
    setSmScreenSearchBox,
    setQueryData,
    searchBoxClear,
    searchClosebtn,
    setUsersPreference,
    selectedUserPrefernece,
    termsModalState,
    setTermsModal,
    setPrivacyPolicyModalState,
    PrivacyPolicyModalState,
    OrderSucessSheetState,
    setOrderSucessSheetState,
    frequentlyBroughtData,
    setFrequentlyBroughtData,
    setLoadingState,
    loading,
    countriesDrawerState,
    setCountriesDrawerState,
    selectedCountryData,
    setSelectedCountryData,
    formDataInitState,
    addressData,
    setAddressData,
    lgSearchBoxSuggestionState,
    setLgSearchBoxSuggestionState,
    searchSuggestions,
    addNewAddressClick,
    setAddNewAddressClick,
    locationOnClickHandle,
    addnewAddressFormVisibility,
    currentLocation,
    setCurrentLocation,
    selectedLocation,
    setSelectedLocation,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
