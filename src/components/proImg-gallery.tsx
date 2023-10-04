import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import Image from "next/image";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper";
import { useState } from "react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

export default function ProductImage({
  galleryImages,
}: {
  galleryImages: any;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const { width } = useWindowDimensions();
  return (
    <div className="lg:grid grid-cols-12  gap-2  flex flex-col ">
      <div className="overflow-auto col-span-2 order-last lg:order-first lg:h-[20rem] h-fit no-scrollbar">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          slidesPerView={4}
          direction={width < 991 ? "horizontal" : "vertical"}
          spaceBetween={10}
          freeMode={true}
          watchSlidesProgress={true}
          className="lg:h-full h-fit"
        >
          {galleryImages?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id}`}
              className="thumb-gallery-img"
            >
              <div>
                <Image
                  src={galleryImages.length > 1 ? item.thumbnail : item}
                  alt={`Product thumb gallery ${item.id}`}
                  width={100}
                  height={100}
                  className="w-20  border rounded-lg cursor-pointer overflow-x-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-span-10 ">
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
        >
          {galleryImages?.map((item: any) => (
            <SwiperSlide key={`product-gallery-${item.id}`}>
              <div>
                <Image
                  src={galleryImages.length > 1 ? item.full : item}
                  alt={`Product gallery ${item.id}`}
                  width={400}
                  height={400}
                  className="w-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
