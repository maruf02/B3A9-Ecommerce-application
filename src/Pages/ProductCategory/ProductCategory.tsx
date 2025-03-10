import { motion } from "framer-motion";
import { useGetAllCategoryQuery } from "../../Redux/features/produtcs/productsApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../Redux/features/produtcs/productsSlice";
import { TCategory } from "../../types";
import SkeletonCard from "../../shared/SkeletonCard";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const { data: categoryData, isLoading } = useGetAllCategoryQuery(undefined);
  const categories = categoryData?.data || [];

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category)); // Dispatch selected category
  };
  if (isLoading)
    return (
      <div className="w-full min-h-screen flex flex-wrap justify-center gap-5 py-5">
        {/* Render 6 skeleton cards as placeholders */}
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        {/* category section */}
        <div className="w-full h-full md:px-10 ">
          {/* title section */}
          <div className="flex flex-row justify-between py-5">
            <h1 className="text-xl md:text-3xl text-black font-bold pl-5">
              Our Products Category:
            </h1>
          </div>
          <div className="border border-2 border-gray-400 mx-5 "></div>
          <div className="flex flex-row justify-center flex-wrap gap-10 py-8">
            {categories.length === 0 ? (
              <p className="text-green-500 text-3xl font-semibold ">
                Sorry, Nothing found!!
              </p>
            ) : (
              categories.map((category: TCategory) => (
                <Link to="/products">
                  <div
                    key={category.categoryId}
                    className="  bg-transparent w-48 h-48  "
                    onClick={() => handleCategorySelect(category.categoryName)}
                  >
                    <figure className="px-0 pt-0">
                      <img
                        src={category.categoryImage}
                        alt={category.categoryName}
                        className="w-full h-full"
                      />
                    </figure>
                    <div className=" ">
                      <h2 className="text-xl text-black font-semibold text-center py-2">
                        {category.categoryName}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
        {/* category section */}
      </motion.div>
    </div>
  );
};

export default ProductCategory;
