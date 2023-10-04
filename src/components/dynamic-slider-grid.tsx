import { Swiper, SwiperSlide } from "swiper/react";
import { FC, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay, Swiper as SwiperType } from "swiper";
import ImgPage from "./img-page";
interface props {
  data: any;
  isDesktop: boolean;
  isMobile: boolean;
}

const DynamicSliderGrid: FC<props> = ({ data, isDesktop, isMobile }) => {
  const swiperRef = useRef<SwiperType>();
  if (isDesktop === false && isMobile === false) {
    return <></>;
  }

  return (
    <>
      {data.settings.show_section_title ? (
        <div className="text-lg text-center my-3">{data.section_title}</div>
      ) : (
        ""
      )}
      <div className={"max-w-[1440px] mx-auto relative"}>
        <Swiper
      
          slidesPerView={
            isDesktop
              ? data.settings.desktop.column
              : data.settings.mobile.column
          }
          pagination={data.settings.show_pagination ? {clickable:true}:false}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={data.settings.autoplay ? true : false}
          spaceBetween={20}
          className={"max-w-[1440px] pb-3"}
          speed={1000}
        >
          <span className="md:flex hidden " dir="ltr">
            {data.settings.navigation ? (
              <>
                <div className="group  top-0 bottom-0 absolute flex justify-start pr-16 z-50 rtl:space-x-reverse space-x-1">
                  <div>
                    <svg
                      viewBox="0 0 44 502"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="-ml-[1px] group-hover:scale-x-[2] scale-x-100 transition-all duration-300 group-hover:fill-white fill-white/50 h-full w-full"
                    >
                      <path
                        className="wave"
                        d="M0.999973 501C32.9999 301.5 42.9999 308 42.9999 252.5C42.9999 197 29.4999 189 1.00002 0.999996L0.999973 501Z"
                      ></path>
                    </svg>
                  </div>
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="my-auto   rounded-full group-hover:-translate-x-10 translate-x-0 transition-all ease-in duration-100"
                  >
                    <div className="  group-hover:bg-transparent group-hover:opacity-100 bg-slate-50 opacity-50 rounded-full p-3 my-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className=" w-6 h-6 rotate-180 fill-black "
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="group/next  top-0 bottom-0 -right-[1px] absolute flex justify-end pl-16 z-30 space-x-1 rtl:space-x-reverse">
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="z-50 my-auto rounded-full group-hover/next:translate-x-10 translate-x-0 transition-all ease-in duration-100"
                  >
                    <div className="  group-hover/next:bg-transparent group-hover/next:opacity-100 bg-slate-50 opacity-50 rounded-full p-3 my-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className=" w-6 h-6  fill-black "
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </div>
                  </button>
                  <div>
                    <svg
                      viewBox="0 0 44 502"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="z-50 group-hover/next:scale-x-[2] scale-x-100 transition-all duration-300 group-hover/next:fill-white fill-white/50 h-full w-full rotate-180"
                    >
                      <path
                        className="wave"
                        d="M0.999973 501C32.9999 301.5 42.9999 308 42.9999 252.5C42.9999 197 29.4999 189 1.00002 0.999996L0.999973 501Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </>
            ) : null}
          </span>

          {data.section_data_array.map(
            (sec_data: any) =>
              ((isDesktop && sec_data.desktop.image_url) ||
                (isMobile && sec_data.mobile.image_url)) && (
                <SwiperSlide>
                  <ImgPage 
                    sectionData={sec_data}
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    m_height={0}
                    m_width={0}
                    d_width={data.section_data_array[0].desktop.width}
                  />
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </>
  );
};

export default DynamicSliderGrid;
