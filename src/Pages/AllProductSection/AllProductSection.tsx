import { motion } from "framer-motion";
import { useGetAllProductQuery } from "../../Redux/features/produtcs/productsApi";
import ProductDetailsPage from "../ProductDetailsPage/ProductDetailsPage";

const AllProductSection = () => {
  const { data: productData } = useGetAllProductQuery(undefined);
  const produtcs = productData?.data || [];

  console.log("produtcs", produtcs);
  return (
    <div>
      {" "}
      {/* ****************all product shown********************************************* */}
      <motion.div
        // whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        // className="text-center"
      >
        <div className=" px-8 mt-5  w-full h-full my-10">
          <div className="flex flex-wrap justify-center align-middle gap-5   ">
            {produtcs.length === 0 ? (
              <p className="text-green-500 text-3xl font-semibold ">
                Sorry, Nothing found!!
              </p>
            ) : (
              produtcs.map((product) => (
                <ProductDetailsPage
                  key={product.productId}
                  product={product}
                ></ProductDetailsPage>
              ))
            )}
          </div>
          {/* *********************** */}
        </div>
      </motion.div>
      {/* ****************all product shown********************************************* */}
    </div>
  );
};

export default AllProductSection;
