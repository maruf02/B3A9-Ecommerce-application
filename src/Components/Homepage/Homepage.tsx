import { useEffect, useState } from "react";
import AllProductSection from "../../Pages/AllProductSection/AllProductSection";
import BannerSection from "../../Pages/BannerSection/BannerSection";
import BestSellingPage from "../../Pages/BestSellingPage/BestSellingPage";
import ProductCategory from "../../Pages/ProductCategory/ProductCategory";
import { FaArrowUp } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import FlashSaleSection from "../../Pages/FlashSaleSection/FlashSaleSection";
import RecentViewSection from "../../Pages/RecentViewSection/RecentViewSection";

const Homepage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const navigate = useNavigate();

  // Handle scroll event to show/hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true); // Show button if scrolled down 300px
      } else {
        setShowScrollButton(false); // Hide button if less than 300px
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to top
    });
  };

  const goToFlashSale = () => {
    navigate("/flashsale");
  };
  return (
    <div>
      <BannerSection />
      <BestSellingPage />
      <ProductCategory />
      <FlashSaleSection />

      <AllProductSection />
      {/* <FeatureCar />
      <WhyChooseUsSection />
      <TestimonialSection /> */}
      {showScrollButton && (
        <div className="fixed bottom-5 right-5 flex flex-row-reverse gap-4">
          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
          >
            <FaArrowUp className="text-lg" />
          </button>

          {/* Flash Sale Button */}
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
