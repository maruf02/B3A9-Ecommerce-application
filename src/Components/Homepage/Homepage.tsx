import { useEffect, useState } from "react";
import AllProductSection from "../../Pages/AllProductSection/AllProductSection";
import BannerSection from "../../Pages/BannerSection/BannerSection";
import BestSellingPage from "../../Pages/BestSellingPage/BestSellingPage";
import ProductCategory from "../../Pages/ProductCategory/ProductCategory";
import { FaArrowUp } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import FlashSaleSection from "../../Pages/FlashSaleSection/FlashSaleSection";
// import OfferSection from "../../Pages/OfferSection/OfferSection";
import NewArrivaleSection from "../../Pages/NewArrivaleSection/NewArrivaleSection";
import NewsLetterSection from "../../Pages/NewsLetterSection/NewsLetterSection";
import OfferBaner from "../../Pages/BannerSection/OfferBaner";

const Homepage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToFlashSale = () => {
    navigate("/flashsale");
  };
  return (
    <div>
      <BannerSection />
      <OfferBaner />
      <BestSellingPage />
      <NewArrivaleSection />
      <ProductCategory />
      <FlashSaleSection />

      <AllProductSection />
      <NewsLetterSection />
      {/* <FeatureCar />
      <WhyChooseUsSection />
      <TestimonialSection /> */}
      {showScrollButton && (
        <div className="fixed bottom-5 right-5 flex flex-row-reverse gap-4">
          <button
            onClick={scrollToTop}
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
          >
            <FaArrowUp className="text-lg" />
          </button>

          <button
            onClick={goToFlashSale}
            data-tip="Flash Sale"
            className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all tooltip tooltip-open tooltip-top"
          >
            <BiSolidOffer className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
