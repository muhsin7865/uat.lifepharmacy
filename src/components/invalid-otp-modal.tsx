import { AlertCircle, FileWarning, XCircle } from "lucide-react";
import { Icon } from "./ui/icons";
import ModalContainer from "./ui/modal-container";
import { Typography } from "./ui/typography";
// import { Player } from "@lottiefiles/react-lottie-player";
// import { useModal } from "./ui/modalcontext";
import { ReactNode } from "react";
const InvalidOTPModal = ({
  showModal,
  setCloseModal,
  modalMessage,
  modalHeader,
  buttonProps,
  isWarning
}: {
  showModal: any;
  setCloseModal: any;
  modalMessage: string;
  modalHeader: string;
  buttonProps: ReactNode;
  isWarning:boolean
}) => {
  return (
    <ModalContainer showModal={showModal} setCloseModal={setCloseModal}>
      <div className="rounded-t-xl text-center ">
      {isWarning ? 
        <AlertCircle className="w-32 h-32 mx-auto fill-orange-400 text-white animate-scaleIn duration-700" />
      :
      <XCircle className="w-32 h-32 mx-auto fill-red-500 text-white animate-scaleIn duration-700" />

      }
      </div>
      <Typography size={"xl"} bold={"bold"} alignment={"horizontalCenter"}>
        {modalHeader}
      </Typography>
      <div className=" p-5 text-center">
        <Typography
          variant={"paragraph"}
          size={"sm"}
          alignment={"horizontalCenter"}
        >
          {modalMessage}
          {/* {notValidModalMessage} */}
        </Typography>
      </div>
      {buttonProps}
    </ModalContainer>
  );
};

export default InvalidOTPModal;
