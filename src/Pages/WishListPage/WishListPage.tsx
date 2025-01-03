import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ProductsSingleView from "../../Components/AllProductPage/ProductsSingleView";
import { TProduct } from "../../types";
import { useCurrentWishList } from "../../Redux/features/CartItem/wishListSlice";

const WishListPage = () => {
  const { wishListProducts } = useSelector(useCurrentWishList);
  const displayedProducts = [...wishListProducts] as TProduct[];
  return (
    <div>
      <div className="w-full h-full min-h-screen">
        {/* ****************************************************************************************************** */}
        {/* Product welcome banner section */}
        <div
          className="hero h-32"
          style={{
            backgroundImage:
              "url(https://i.postimg.cc/tgj1Lp4Q/pexels-pixabay-531880.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-40"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-lg">
              <h1 className="mb-5 text-3xl font-bold text-white">
                Your Favorite Products
              </h1>
            </div>
          </div>
        </div>
        {/* ****************************************************************************************************** */}
        {/* ************************************all product shown****************************************************************** */}
        <div className="border border-2  "></div>
        {/* ****************all product shown********************************************* */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="px-8 mt-5 w-full h-full my-10 text-black">
            <div className="flex flex-wrap justify-center align-middle gap-5">
              {displayedProducts.length === 0 ? (
                <p className="text-green-500 text-3xl font-semibold ">
                  No recently added Favorite products found!
                </p>
              ) : (
                displayedProducts.map((product) => (
                  <ProductsSingleView
                    key={product.productId}
                    product={product}
                  ></ProductsSingleView>
                ))
              )}
            </div>
          </div>
        </motion.div>
        {/* ****************all product shown********************************************* */}
        <div>
          {/* <RecentViewSection />
        <ProductViwedSection /> */}
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
