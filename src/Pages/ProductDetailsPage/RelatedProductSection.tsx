import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductsSingleView from "../../Components/AllProductPage/ProductsSingleView";
import { useGetProductsGetByCategoryQuery } from "../../Redux/features/produtcs/productsApi";
import { TProduct } from "../../types";

const RelatedProductSection = ({ category }: { category: string }) => {
  const [displayedProducts, setDisplayedProducts] = useState<TProduct[]>([]);

  const { data: productsData, isLoading } =
    useGetProductsGetByCategoryQuery(category);

  useEffect(() => {
    if (productsData) {
      setDisplayedProducts(productsData.data || []);
    }
  }, [productsData]);

  if (isLoading) return <p>Loading products...</p>;
  // if (isError) return <p>Error loading products</p>;

  return (
    <div className="w-full h-full min-h-screen py-10">
      {/* ****************************************************************************************************** */}

      {/* ****************************************************************************************************** */}
      {/* ************************************all product shown****************************************************************** */}
      <div className="flex-1 ">
        <a className=" text-4xl font-bold underline pl-3">Related Product: </a>
      </div>
      {/* ****************all product shown********************************************* */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="px-8 mt-5 w-full h-full my-10 text-black ">
          <div className="flex flex-wrap justify-center align-middle gap-5">
            {displayedProducts.length === 0 ? (
              <p className="text-green-500 text-3xl font-semibold">
                No Related Category Product Found!
              </p>
            ) : (
              displayedProducts.map((product) => (
                <ProductsSingleView key={product.productId} product={product} />
              ))
            )}
          </div>
        </div>
      </motion.div>
      {/* ****************all product shown********************************************* */}
    </div>
  );
};

export default RelatedProductSection;
