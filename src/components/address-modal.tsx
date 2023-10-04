import ModalContainer from "./ui/modal-container";
import React, { useRef, useState, useMemo } from "react";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { useForm } from "react-hook-form";
import { AddNewAddressForm } from "./addnewAddressForm";
import { Map as Maps, Navigation } from "lucide-react";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { Autocomplete, GoogleMap, useLoadScript } from "@react-google-maps/api";
import { getReverseGeoCodingApiData } from "@/helpers/getReverseGeoCodingApiData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { useRouter } from "next/router";

const AddressModal = () => {
  const [locationMapVisibility, setLocationMapVisbility] = useState(false);
  // const [formData, setFormData] = useState<any>(null);
  const [searchBoxQuery, setSearchBoxQuery] = useState<any>(null);
  const { update } = useSession();
  const libraries = useMemo(() => ["places"], []);
  const router = useRouter();

  const [mapref, setMapRef] = React.useState<any>(null);

  const handleOnLoad = (map: any) => {
    debugger;
    setMapRef(map);
    getGeoCodingData(currentLocation[0], currentLocation[1]);
  };

  // console.log(mapref);

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();

      getGeoCodingData(newCenter.lat(), newCenter.lng());
      setSelectedLocation([newCenter.lat(), newCenter.lng()]);
      setCurrentLocationFocus(false);
    }
  };

  const [placeData, setPlaceData] = useState<any>(null);

  const {
    setaddNewAddress,
    addNewAddress,
    setAddressDataIndex,
    AddressDataIndex,
    availableAddresses,
    setavailableAddresses,
    setaddnewAddressFormVisibility,
    addnewAddressFormVisibility,
    addressData,
    locationOnClickHandle,
    addNewAddressClick,
    setAddNewAddressClick,
    currentLocation,
    selectedLocation,
    setSelectedLocation,
    formData,
    setFormData,
  } = useModal();

  function setCloseModal() {
    setaddNewAddress(false);
    setTimeout(() => {
      setaddnewAddressFormVisibility(false);
      setLocationMapVisbility(false);
    }, 200);
  }

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    values: formData,
  });

  const [focusLocation, setCurrentLocationFocus] = useState(true);

  const inputRef = useRef(null);

  const getGeoCodingData = (lat: string | number, lng: string | number) => {
    getReverseGeoCodingApiData(lat, lng).then((res) => {
      setFormData((prevData: any) => ({
        ...{ latitude: lat, longitude: lng },
        ...prevData,
        ...res,
      }));

      setSearchBoxQuery(res.google_address);
    });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC8F9csLoa6MRF3Cbg53T8Y4_YThxEp9rM" as string,
    libraries: libraries as any,
  });

  return (
    <ModalContainer
      size={"xl"}
      showModal={addNewAddress && addressData ? true : false}
      setCloseModal={setCloseModal}
    >
      {addNewAddressClick && addressData && addressData.length === 0 ? (
        <div className=" bg-white rounded-lg   overflow-y-auto no-scrollbar min-h-fit  max-h-[calc(80vh-1rem)] ">
          <div className="space-y-6">
            <Maps className="w-20 h-20" />
            <div className="py-5">
              <Typography bold={"bold"} size={"xl"}>
                You have no saved Addresses
              </Typography>
              <p className="text-gray-400 text-sm py-1">
                Start by adding a new address
              </p>
            </div>
          </div>
          <div className="flex items-center rtl:space-x-reverse space-x-2 border-t border-gray-200 rounded-b  sticky bottom-0">
            <Button
              className="w-full"
              onClick={() => {
                setAddNewAddressClick(false);
                setLocationMapVisbility(true);
              }}
            >
              ADD NEW ADDRESS
            </Button>
          </div>
        </div>
      ) : null}
      {addnewAddressFormVisibility ? (
        <AddNewAddressForm
          isModal={true}
          setCloseModal={setCloseModal}
          getValues={getValues}
          setLocationMapVisbility={setLocationMapVisbility}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          currentLocation={currentLocation}
          setaddnewAddressFormVisibility={setaddnewAddressFormVisibility}
        />
      ) : null}

      {locationMapVisibility && (
        <div className="space-y-3">
          <div className="pb-3">
            <div className="flex justify-between items-center pb-3">
              <div className=" flex space-x-3 items-center">
                <button
                  onClick={() => {
                    locationOnClickHandle();
                    setLocationMapVisbility(false);
                  }}
                >
                  <Icon type="chevronLeftIcon" className="text-slate-700" />
                </button>
                <Typography bold={"semibold"} variant={"lifeText"}>
                  Enter Location
                </Typography>
              </div>
              <button onClick={() => setCloseModal()}>
                <Icon type="crossIcon" className="text-slate-700" />
              </button>
            </div>
            <div className="w-full relative z-[10000] " ref={inputRef}>
              <div className="w-full">
                <Autocomplete
                  onLoad={(place: google.maps.places.Autocomplete) => {
                    setPlaceData(place);
                  }}
                  onPlaceChanged={() => {
                    if (mapref) {
                      setSelectedLocation([
                        placeData.getPlace().geometry.location.lat(),
                        placeData.getPlace().geometry.location.lng(),
                      ]);
                      setCurrentLocationFocus(false);
                      getGeoCodingData(
                        placeData.getPlace().geometry.location.lat(),
                        placeData.getPlace().geometry.location.lng()
                      );
                    }
                  }}
                >
                  <Input
                    value={searchBoxQuery}
                    className="w-full"
                    sizes={"sm"}
                    rounded={"sm"}
                    buttonRight={
                      <Button
                        size={"sm"}
                        rounded={"sm"}
                        position={"inputRightBtn"}
                        onClick={() => {
                          debugger;
                          if (formData.latitude !== undefined || "") {
                            setavailableAddresses(false);
                            setLocationMapVisbility(false);
                            setaddnewAddressFormVisibility(true);
                          }
                        }}
                      >
                        Confirm
                      </Button>
                    }
                    iconRight={
                      <Icon
                        type="crossIcon"
                        className="m-auto"
                        sizes={"sm"}
                        onClick={() => setSearchBoxQuery("")}
                      />
                    }
                    onChange={(e) => {
                      setSearchBoxQuery((e.target as HTMLInputElement).value);
                    }}
                  />
                </Autocomplete>
              </div>
            </div>
          </div>

          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "350px",
            }}
            onDragEnd={handleCenterChanged}
            center={{
              lat: selectedLocation[0],
              lng: selectedLocation[1],
            }}
            zoom={20}
            onLoad={handleOnLoad}
          >
            <iframe
              className="absolute inset-0 mx-auto mt-[88px] w-[5.5rem] cursor-none"
              src="https://lottie.host/?file=5dc5caa4-844b-41bf-a1aa-fc778f4ca6af/Iclv8H4a68.json"
            ></iframe>
            <button
              className="z-[1] absolute right-[80px] bottom-[25px] scale-110  bg-white backdrop-blur-sm rounded-full  shadow-md p-3 cursor-pointer"
              onClick={() => {
                if (mapref) {
                  setSelectedLocation(currentLocation);
                  setCurrentLocationFocus(true);
                }
              }}
            >
              <Navigation
                className={`w-5 h-5 m-auto text-blue-500 ${
                  focusLocation ? "fill-blue-500" : ""
                }`}
              />
            </button>
          </GoogleMap>
        </div>
      )}

      {addressData && addressData.length > 0 && availableAddresses ? (
        <div className=" overflow-y-auto overflow-x-hidden  no-scrollbar  min-h-fit  max-h-[calc(80vh-1rem)]">
          <div className="w-full flex justify-between pb-2 items-center">
            <div className="flex space-x-2 rtl:space-x-reverse items-center">
              <Icon type="locationPinIcon" className="text-white fill-red-400"/>
              <Typography size={"lg"} bold={"bold"} variant={"lifeText"}>
                Addresses
              </Typography>
            </div>

            <Button
              onClick={() => {
                setavailableAddresses(false);
                setLocationMapVisbility(true);
              }}
            >
              Add New Address
            </Button>
          </div>
          <RadioGroup onValueChange={(value) => setAddressDataIndex(value)}>
            <div className="rounded-lg p-3 bg-slate-50 border-2 border-muted">
              <div className="rounded-full p-1 px-2 bg-violet-100">
                <Typography size={"xs"} bold={"bold"}>
                  AVAILABLE ADDRESSES
                </Typography>
              </div>
              {addressData.map((addr: any, indx: number) => (
                <label
                  htmlFor={addr.id}
                  className={`
                    relative flex cursor-pointer p-2 ${
                      indx != addressData.length - 1
                        ? " border-muted border-b-2 focus:outline-none"
                        : ""
                    }`}
                >
                  <div className="flex w-full justify-between">
                    <div className="flex items-center">
                      <div className="text-sm flex space-x-7 rtl:space-x-reverse">
                        <div className="flex space-x-3 rtl:space-x-reverse items-start">
                          <RadioGroupItem
                            id={addr.id}
                            value={addr}
                            checked={AddressDataIndex.id === addr.id}
                          />
                          <table className="table-auto">
                            <tbody>
                              <tr>
                                <td className="table-data ">
                                  <Typography size={"xs"}>NAME</Typography>
                                </td>
                                <td className="table-data">
                                  <Typography size={"xs"} bold={"semibold"}>
                                    {" "}
                                    {addr.name}
                                  </Typography>
                                </td>
                              </tr>
                              <tr>
                                <td className="table-data">
                                  <Typography size={"xs"}>ADDRESS</Typography>
                                </td>
                                <td className="table-data">
                                  <Typography
                                    size={"xs"}
                                    bold={"semibold"}
                                    lineClamp={"one"}
                                  >
                                    {" "}
                                    {addr.google_address}
                                  </Typography>
                                </td>
                              </tr>
                              <tr>
                                <td className="table-data">
                                  <Typography size={"xs"}>PHONE</Typography>
                                </td>
                                <td className="table-data">
                                  <Typography size={"xs"} bold={"semibold"}>
                                    {" "}
                                    {addr.phone}
                                  </Typography>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant={"closeBtn"}
                      size={"sm"}
                      className="shrink-0 text-life cursor-pointer p-0"
                      onClick={() => {
                        // setValue("name", addr.name);
                        // setValue("phone", addr.phone);
                        // setValue("type", addr.type);
                        // setValue("state", addr.state);
                        // setValue("city", addr.city);
                        // setValue("google_address", addr.google_address);
                        // setValue("flat_number", addr.flat_number);
                        // setValue("building", addr.building);
                        // setValue("country", addr.country);
                        // setValue("additional_info", addr.additional_info);

                        setFormData(addr);
                        setavailableAddresses(false);
                        // setaddnewAddressFormVisibility(true);
                        setLocationMapVisbility(true);
                      }}
                    >
                      <Icon type="editIcon" sizes={"xs"} />
                    </Button>
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup>

          <div className="w-full bg-white pt-3 sticky bottom-0 leading-tight">
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                debugger;
                update({ selected_address: AddressDataIndex });
                setAddressDataIndex(AddressDataIndex);
                router.reload();
                setCloseModal();
              }}
            >
              CONFIRM ADDRESS
            </Button>
          </div>
        </div>
      ) : null}
    </ModalContainer>
  );
};

export default AddressModal;
