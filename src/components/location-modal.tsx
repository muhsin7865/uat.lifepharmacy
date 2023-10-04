import ModalContainer from "./ui/modal-container";
import { Button, buttonVariants } from "./ui/button";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useModal } from "./ui/modalcontext";
import { RadioGroup, RadioGroupItem } from "./ui/radio";
// import { Player } from "@lottiefiles/react-lottie-player";

const LocationModal = () => {
  const { setSheetOpen } = useModal();
  const { locationModalState, setLocationModalState } = useModal();
  return (
    <ModalContainer
      showModal={locationModalState}
      setCloseModal={setLocationModalState}
    >
      <div className="relative bg-white rounded-lg ">
        <div className="flex items-center justify-between rounded-t ">
          <Button
            type="button"
            variant={"closeBtn"}
            rounded={"full"}
            size={"sm"}
            onClick={() => setLocationModalState(false)}
          >
            <Icon type="crossIcon" />
          </Button>
        </div>
        <div className="text-center space-y-4">
          <Typography
            variant={"primary"}
            type="h5"
            size={"xl"}
            bold={"semibold"}
            alignment={"horizontalCenter"}
          >
            {" "}
            Where do you want the delivery?
          </Typography>
          {/* <Player
            src="/animations/location-animation.json"
            loop
            autoplay
            className="player"
          /> */}
          <Typography size={"sm"} alignment={"horizontalCenter"}>
            By knowing your area, we will be able to provide instant delivery
            from the nearest Life store around you!{" "}
          </Typography>
          <Button disableBtn={true} size={"lg"} className="w-full">
            Detect My Location
          </Button>
          <Typography bold={"bold"} size={"lg"} alignment={"horizontalCenter"}>
            OR
          </Typography>

          <Input
            sizes={"sm"}
            placeholder="Type Location"
            buttonLeft={
              <select
                id="country"
                className={cn(
                  buttonVariants({
                    variant: "normal",
                  }),
                  "rtl:rounded-l-none ltr::rounded-r-none"
                )}
              >
                <option selected>Ship To</option>
                <option value="ae">UAE</option>
                <option value="sa">KSA</option>
              </select>
            }
          />
          <Button
            variant={"primaryLink"}
            size={"lg"}
            onClick={() => {
              setLocationModalState(false);
              setSheetOpen(true);
            }}
          >
            Or Login Now
          </Button>

          <Typography size={"xs"} alignment={"horizontalCenter"}>
            {" "}
            Get access to My Address, Orders & Prescriptions in your profile
            section.
          </Typography>
        </div>
      </div>
    </ModalContainer>
  );
};

export const PaymentMethodModal = ({
  newCardSelected,
  showModal,
  setCloseModal,
  setNewCardSelectedState,
}: {
  newCardSelected: boolean;
  showModal: any;
  setCloseModal: any;
  setNewCardSelectedState: any;
}) => {
  return (
    <ModalContainer
      size={"lg"}
      showModal={showModal}
      setCloseModal={setCloseModal}
    >
      <div className=" space-y-3">
        <div className="flex justify-between">
          <Typography bold={"bold"} variant={"lifeText"} size={"xl"}>
            Select Payment Method
          </Typography>
          <button
            onClick={() => {
              setCloseModal(false);
            }}
          >
            <Icon type="crossIcon" />
          </button>
        </div>
        <button
          onClick={() => setNewCardSelectedState(!newCardSelected)}
          className="flex space-x-4  rtl:space-x-reverse py-2 w-full items-center"
        >
          <RadioGroup className={""}>
            <RadioGroupItem checked={newCardSelected} value="" id="method-1" />
          </RadioGroup>
          <img
            src="https://www.lifepharmacy.com/images/card.svg"
            height={30}
            width={30}
          />
          <Typography>Pay with New Card</Typography>
        </button>
        <Button
          onClick={() => {
            setCloseModal(false);
          }}
          disableBtn={!newCardSelected}
          className="text-xs w-full"
        >
          SELECT AND CONTINUE
        </Button>
      </div>
    </ModalContainer>
  );
};

export default LocationModal;
