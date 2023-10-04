import Image from "next/image";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { Calendar, HomeIcon } from "lucide-react";
import { Icon } from "./ui/icons";

const SingleDoctorData = ({ dList }: { dList: any }) => {
  return (
    <div className="w-full border border-muted shadow rounded-lg p-2 space-y-2 relative py-2">
      <div className="absolute right-2 rtl:left-2 top-2 rounded-lg bg-[#ffe6e6] text-life text-sm font-bold text-center px-3 leading-tight py-0.5">
        <Typography
          bold={"semibold"}
          alignment={"horizontalCenter"}
          size={"xs"}
        >
          XP
        </Typography>

        <Typography
          alignment={"horizontalCenter"}
          size={"xs"}
          bold={"semibold"}
        >
          {dList.experience.years}
        </Typography>

        <Typography bold={"light"} alignment={"horizontalCenter"} size={"xs"}>
          Years
        </Typography>
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="rounded-md">
            <Image
              src={dList.photo}
              height={100}
              width={100}
              alt={dList.name}
            />
          </div>
          <div className="space-y-1">
            <Typography variant={"lifeText"} bold={"bold"}>
              {dList.name}
            </Typography>
            <Typography variant={"lifeText"} size={"sm"}>
              {dList.department}
            </Typography>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <span className="space-x-1 rtl:space-x-reverse flex items-center">
                <Icon
                  type="checkIcon"
                  sizes={"sm"}
                  className="text-white fill-green-500"
                />
                <Typography variant={"primary"} size={"sm"}>
                  {dList.likes.percentage}
                </Typography>
              </span>
              <span className="space-x-1 rtl:space-x-reverse flex items-center">
                <Icon type="chatIcon" sizes={"sm"} className="text-life" />
                <Typography variant={"primary"} size={"sm"}>
                  {dList.stories.count}
                </Typography>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-x-2 rtl:space-x-reverse flex items-center">
        <Typography size={"xs"}>Speak :</Typography>
        <div className="flex space-x-2 rtl:space-x-reverse">
          {dList.languages.map((langData: any) => (
            <Button
              variant={"normal"}
              size={"xs"}
              className="!text-xs border border-muted !text-[11px] px-2 py-[1px]"
            >
              {langData.value}
            </Button>
          ))}
        </div>
      </div>
      <hr />
      <div>
        {dList.available_clinics.data.map((avClinics: any) => (
          <div className="flex justify-between mb-1">
            <div>
              <div className="flex space-x-2 rtl:space-x-reverse items-center">
                <HomeIcon className="w-4 h-4" />
                <Typography size={"sm"} bold={"semibold"} variant={"lifeText"}>
                  {avClinics.name}
                </Typography>
              </div>
            </div>
            <Typography size={"xs"} variant={"paragraph"} bold={"light"}>
              ({avClinics.distance_text})
            </Typography>
          </div>
        ))}
        <div className="flex justify-between pt-1 items-center">
          <div className="space-y-1">
            <Typography size={"xs"} variant={"primary"}>
              AVAILABILITY STATUS
            </Typography>
            <div className="flex space-x-2 rtl:space-x-reverse items-center">
              <Calendar className="h-3 w-3" />
              <Typography size={"xs"} bold={"light"}>
                {dList.slot.date_time}
              </Typography>
            </div>
          </div>
          <Button
            rounded={"md"}
            size={"lg"}
            className="h-fit !text-xs !py-1.5 !px-7"
          >
            BOOK NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export { SingleDoctorData };
