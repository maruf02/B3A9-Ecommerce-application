import AllProductSection from "../../Pages/AllProductSection/AllProductSection";
import BannerSection from "../../Pages/BannerSection/BannerSection";
import BestSellingPage from "../../Pages/BestSellingPage/BestSellingPage";

const Homepage = () => {
  return (
    <div>
      <BannerSection />
      <BestSellingPage />
      <AllProductSection />
      {/* <FeatureCar />
      <WhyChooseUsSection />
      <TestimonialSection /> */}
    </div>
  );
};

export default Homepage;
