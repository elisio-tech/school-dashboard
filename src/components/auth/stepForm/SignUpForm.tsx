import { ArrowLeft } from "iconsax-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Swiper as SwiperCore } from "swiper/types";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function SignUp() {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex justify-between w-full max-w-md mx-auto mb-5 sm:pt-10">
        <button
          onClick={() => swiper && swiper.slidePrev()}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ArrowLeft size={24} color="#101828" />
          Anterior
        </button>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Finalizar
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Forneça seus dados pessoais para prosseguir com o cadastro
            </p>
          </div>

          <div>
            <div className="space-y-5">
              <div className="sm:col-span-1">
                <Swiper
                  modules={[Pagination, EffectFade]}
                  spaceBetween={50}
                  slidesPerView={1}
                
                  pagination={{ clickable: true }}
                  speed={1}
                  onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
                >
                  <SwiperSlide>Slide 1</SwiperSlide>
                  <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
                 
                  <div className="mt-5 mb-12">
                    <button
                      onClick={() => swiper && swiper.slideNext()}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    >
                      Próximo
                    </button>
                  </div>

                  <div className="swiper-pagination"></div>
                </Swiper>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-4">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Já tem uma conta?{" "}
              <a className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                Entrar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
