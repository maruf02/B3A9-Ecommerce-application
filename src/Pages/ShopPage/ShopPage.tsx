import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetProductByVendorIdQuery } from "../../Redux/features/produtcs/productsApi";
import ProductSingleViewPage from "../ProductSingleViewPage/ProductSingleViewPage";

const ShopPage = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductByVendorIdQuery(vendorId as string);
  console.log("vendorId", vendorId);
  const produtcs = productsData?.data || {};
  console.log("produtcs", productsData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching products</p>;
  }

  if (!productsData || productsData.length === 0) {
    return <p>No products found for this vendor.</p>;
  }
  return (
    <div>
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
                produtcs.map((product: any) => (
                  <ProductSingleViewPage
                    key={product.productId}
                    product={product}
                  ></ProductSingleViewPage>
                ))
              )}
            </div>
            {/* *********************** */}
          </div>
        </motion.div>
        {/* ****************all product shown********************************************* */}
      </div>
    </div>
  );
};

export default ShopPage;
