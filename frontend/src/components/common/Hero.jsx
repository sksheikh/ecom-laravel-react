import React from 'react';
// import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderImgOne from '../../assets/images/banner-1.jpg';
import SliderImgTwo from '../../assets/images/banner-2.jpg';

const Hero = () => {
    return (
        <>
            <div className="hero-section">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    breakpoints={{
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        }
                    }}
                >
                    <SwiperSlide>
                        <div className="content" style={{ backgroundImage: `url(${SliderImgOne})` }}>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="content" style={{ backgroundImage: `url(${SliderImgTwo})` }}>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default Hero
