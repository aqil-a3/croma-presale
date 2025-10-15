import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

export function PoweredByCarousel(){
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={3}
      loop={true}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      speed={6000}
      modules={[Autoplay]}
      breakpoints={{
        640: {
          slidesPerView: 7,
          spaceBetween: 16,
        },
      }}
    >
      {supportTeams.map(({icon, width, height}: {icon: string; width: number; height: number}) => (
        <SwiperSlide key={icon}>
          <div className='w-full h-[24px] xl:h-[24] flex justify-center'>
            <Image
              src={`/support_logo/${icon}`}
              alt='Logo support'
              width={width}
              height={height}
              className='w-auto h-full object-contain'
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
};

const supportTeams = [
  {
    icon: 'ethereum.svg',
    width: 180,
    height: 48
  }, {
    icon: 'apple.svg',
    width: 130,
    height: 48
  }, {
    icon: 'nvidia.svg',
    width: 218,
    height: 48
  }, {
    icon: 'google.svg',
    width: 132,
    height: 48
  }, {
    icon: 'openai.svg',
    width: 147,
    height: 48
  }, {
    icon: 'lenovo.svg',
    width: 120,
    height: 48
  }, {
    icon: 'trixwallet.svg',
    width: 186,
    height: 48
  }, {
    icon: 'opensea.svg',
    width: 154,
    height: 48
  }, {
    icon: 'cromachain.svg',
    width: 256,
    height: 48
  }, {
    icon: 'trixnews.svg',
    width: 164,
    height: 48
  }
];
