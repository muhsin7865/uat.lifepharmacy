import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SingleProductData } from "./single-product-data";
import { Pagination, Navigation, Autoplay, Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { Icon } from "./ui/icons";
const ProductsSlider = ({ proData }: { proData: any }) => {
  const swiperRef = useRef<SwiperType>();

  const params = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: (index: any, className: any) => {
        return '<span class="mt-1' + className + '">' + (index + 1) + "</span>";
      },
    },
  };
  return (
    <div className="relative w-full">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-0 bottom-0 -left-10 xl-view-only"
      >
        <Icon type="chevronLeftIcon" />
      </button>
      <Swiper
        {...params}
        className=""
        slidesPerView={"auto"}
        modules={[Autoplay, Navigation, Pagination]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={5}
        pagination={{ clickable: true }}
        breakpoints={{
          991: {
            width: 991,
            slidesPerView: 4.8,
          },
          767: {
            width: 767,
            slidesPerView: 4,
          },
          372: {
            width: 671,
            slidesPerView: 3.5,
            spaceBetween: 4,
          },
        }}
      >
        {proData.map((pro_data: any, indx: number) => (
          <SwiperSlide className={`  py-3 ${indx === 0 ? "ml-3" : ""}`}>
            <SingleProductData pro_data={pro_data} isRowView={false} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-0 bottom-0 -right-10 xl-view-only"
      >
        <Icon type="chevronLeftIcon" className="-rotate-180" />
      </button>
    </div>
  );
};

export default ProductsSlider;
