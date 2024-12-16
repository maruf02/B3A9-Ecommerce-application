import { motion } from "framer-motion";
import { useGetAllCategoryQuery } from "../../Redux/features/produtcs/productsApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../Redux/features/produtcs/productsSlice";
import { TCategory } from "../../types";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const categories = categoryData?.data || [];

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category)); // Dispatch selected category
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        {/* category section */}
        <div className="w-full h-full ">
          {/* title section */}
          <div className="flex flex-row justify-between py-5">
            <h1 className="text-xl md:text-3xl text-black font-bold pl-5">
              Our Products Category:
            </h1>
          </div>
          <div className="border border-2 border-gray-400 "></div>
          <div className="flex flex-row justify-center flex-wrap gap-5 pt-8">
            {categories.length === 0 ? (
              <p className="text-green-500 text-3xl font-semibold ">
                Sorry, Nothing found!!
              </p>
            ) : (
              categories.map((category: TCategory) => (
                <Link to="/products">
                  <div
                    key={category.categoryId}
                    className="card bg-transparent w-60 shadow-xl"
                    onClick={() => handleCategorySelect(category.categoryName)}
                  >
                    <figure className="px-0 pt-0">
                      <img
                        src={category.categoryImage}
                        alt={category.categoryName}
                        className="w-80 h-60"
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
