import getMCHomePageData from "@/lib/getMCHomePageData";
import { Swiper } from "swiper/react";
import {
  Pagination,
  FreeMode,
} from "swiper";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SearchBoxSuggMenuMC from "@/components/lg-searchmenu-mc";
import { Typography } from "@/components/ui/typography";

export default function MedicalCentre({ medData }: { medData: any }) {
  const icons = [
    {
      slug: "/doctors",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="w-7 h-7 text-life-2"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>
      ),
    },
    {
      slug: "/doctors",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="w-7 h-7 text-life-2"
          viewBox="0 0 16 16"
        >
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full py-4">
      <div className="max-w-[1450px] sm:px-[10px] px-[5px] mx-auto">
        {medData.data.map((medSecData: any) =>
          medSecData.section_type === "banners" ? (
            <Swiper
              spaceBetween={10}
              speed={1000}
              modules={[FreeMode, Pagination]}
              pagination={true}
              slidesPerView={1.35}
              freeMode={true}
            >
              {medSecData.data.map((medChildData: any) => (
                <SwiperSlide>
                  <div className="banner-overlay">
                    <Link href="#">
                      <Image
                        src={medChildData.image_url}
                        alt=""
                        width={medChildData.width}
                        height={medChildData.height}
                      />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null || medSecData.section_type === "search" ? (
            <SearchBoxSuggMenuMC placeholderData={medSecData.placeholder} />
          ) : null || medSecData.section_type === "speciality_grid" ? (
            <div className="py-5 space-y-4">
              <Typography size={"xxl"} bold={"semibold"}>
                All Specialties
              </Typography>
              <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-x-4  gap-y-5 sm:text-sm text-xs">
                {medSecData.data.map((medChildData: any) => (
                  <div className="banner-overlay">
                    <Link
                      href={`/doctors?speciality=${medChildData.slug}`}
                      className="space-y-2"
                    >
                      <Image
                        src={medChildData.image_url}
                        height={175}
                        width={175}
                        alt={medChildData.slug}
                        className="mx-auto"
                      />
                      <p className="text-center">{medChildData.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : null || medSecData.section_type === "doctor_clinic_grid" ? (
            <div className="py-3 space-y-3">
              <Typography size={"xxl"} bold={"semibold"}>
                {medSecData.title}
              </Typography>
              <div className="md:flex block justify-between md:space-x-3 md:space-y-0 space-y-4">
                {medSecData.data.map((medChildData: any, indx: number) => (
                  <Link
                    href={icons[indx].slug}
                    className="bg-light w-full rounded-md p-5 cursor-pointer shadow flex flex-col justify-between"
                  >
                    <div className="flex items-center rtl:space-x-reverse space-x-2">
                      {icons[indx].icon}
                      <strong className="text-life  my-0">
                        {medChildData.title}
                      </strong>
                    </div>
                    <div className="text-life py-2 md:text-base text-sm">
                      {medChildData.description}
                    </div>
                    <button className="bg-life-2 rounded-full w-fit p-3 text-white block ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 "
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          ) : null || medSecData.section_type === "symptoms" ? (
            <div className="py-5">
              <h4 className="font-semibold sm:text-2xl text-xl">
                {medSecData.title}
              </h4>
              <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-x-4  gap-y-5 sm:text-sm text-xs">
                {medSecData.data.map((medChildData: any) => (
                  <div className="banner-overlay">
                    <Link href={medChildData} className="space-y-2">
                      <Image
                        src={medChildData.image_url}
                        height={175}
                        width={175}
                        alt={medChildData.slug}
                        className="mx-auto"
                      />
                      <p className="text-center">{medChildData.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const medData = await getMCHomePageData();

  return {
    props: {
      medData,
    },
  };
}
