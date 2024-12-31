import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Search from "antd/es/input/Search";

const images = [
  "https://i.postimg.cc/rFLm8J96/disc-reader-reading-arm-hard-drive.webp",
  "https://i.postimg.cc/3JCwWvLk/Elect-headphone-slider.webp",
  "https://i.postimg.cc/NjsjXjVp/Elect-phone-slider-1ecd440c-b42a-419d-9e85-dc44487e7c0e.webp",
  // "https://img.lazcdn.com/us/domino/2f8b8337-eaaa-41f1-9d96-0d96224d4168_BD-1976-688.jpg_2200x2200q80.jpg",
  "https://i.postimg.cc/wMDjXygb/Slaider-2.webp",
];

const BannerSection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleBookNowClicks = () => {
    if (!location) {
      Swal.fire("Please fill out both the location and date fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/cars"); // Navigate to the cars page
    }, 2000); // 2 seconds delay
  };
  console.log(handleBookNowClicks, loading);
  // const handleBookNowClick = () => {
  //   if (!location || !date) {
  //     message.error("Please fill out both the location and date fields.");
  //     return;
  //   }

  const onSearch = () => {
    console.log("dfjgjp;");
  };
  return (
    <div>
      <div className="my-2">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper w-full h-fit"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                // className="bg-white rounded-lg shadow-lg p-6 mx-auto w-full sm:w-3/4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="object-cover w-full h-[500px]"
                  />

                  <div className="absolute top-1/3 left-0 md:left-[30%]   text-left text-white z-10 px-12  ">
                    <h1 className="text-2xl lg:text-5xl font-bold pb-0 text-black">
                      Welcome To PeraCommerce
                    </h1>
                    <div className="text-xl lg:text-3xl font-semibold text-black  ">
                      Upgrade Your Tech & Life, Shop Now for the Latest
                      Accessories!
                    </div>
                    <div className="text-xl lg:text-3xl font-semibold text-black  ">
                      Exclusive Deals on Top-Notch Gadgets – Limited Time Offer!
                    </div>
                    <div className="text-xl lg:text-3xl font-semibold text-black my-5">
                      <Search
                        placeholder="search What you want!!!"
                        onSearch={onSearch}
                        style={{ width: 400, height: "10px" }}
                      />
                    </div>
                    <NavLink to="/products" className="block w-full">
                      <div className="text-xl lg:text-3xl font-semibold text-black mb-5">
                        <button className="btn btn-primary btn-sm">
                          ShopNow
                        </button>
                      </div>
                    </NavLink>
                  </div>

                  {/* <div className="absolute top-1/2 left-1/2 md:left-[30%]  transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                    <h1 className="text-2xl lg:text-5xl font-bold mb-5 text-black">
                      Welcome To PeraCommerce
                    </h1>
                    <div className="text-xl lg:text-3xl font-semibold text-black mb-5">
                      Get Your Result by Searching your time and location
                    </div>
                  </div> */}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSection;
