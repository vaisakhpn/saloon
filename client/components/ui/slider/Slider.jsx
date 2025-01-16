"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import SliderButtons from "./SliderButtons";

const Slider = ({ data }) => {
  SwiperCore.use([Navigation]);

  return (
    <div className="w-full">
      <Swiper
        navigation
        pagination={{ type: "bullets", clickable: true }}
        autoplay={{ delay: 100000 }}
        loop
        modules={[Autoplay, Navigation, Pagination]}
      >
        {data.map(({ id, image, tagline, title, buttons }) => (
          <SwiperSlide key={id}>
            <div>
              <div className="relative w-full h-[550px] bg-no-repeat brightness-50 ">
                <Image
                  src={image}
                  layout="fill"
                  objectFit="cover"
                  alt="slider"
                  sizes="100vw"
                />
              </div>
              <div className="h-full w-full absolute left-0 top-0">
                <div className="relative z-10 h-full flex items-center justify-center ml-12">
                  <div className="flex flex-col gap-3 text-center items-center justify-center">
                    <p className="text-5xl font-thin text-white">{title}</p>
                    {tagline && (
                      <p className=" text-xl font-light text-white">
                        {tagline}
                      </p>
                    )}
                    {buttons.length > 0 ? (
                      <p className=" bg-violet-800 max-w-xs  justify-center items-center   px-4 py-2 rounded-md text-white mt-5">
                        <SliderButtons buttons={buttons} />
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
