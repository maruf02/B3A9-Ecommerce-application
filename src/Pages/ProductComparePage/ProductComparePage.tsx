import { useState } from "react";
import Swal from "sweetalert2";
import StarRatings from "react-star-ratings";
import { motion } from "framer-motion";
import { useGetAllProductQuery } from "../../Redux/features/produtcs/productsApi";
import { TProduct } from "../../types";

const ProductComparePage = () => {
  const {
    data: productsData,

    isLoading,
  } = useGetAllProductQuery(undefined);
  const products = productsData?.data || [];
  const [selectedProducts, setSelectedProducts] = useState<TProduct[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Toggle the description view
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Truncate the description
  const truncatedDescription = (description: string) =>
    description.slice(0, 200);

  // Function to handle product selection for comparison
  const handleSelectProduct = (product: TProduct) => {
    if (selectedProducts.length >= 3) {
      Swal.fire("You can only compare up to 3 products.");
      return;
    }

    if (category && category !== product.category) {
      Swal.fire("All products must be from the same category to compare.");
      return;
    }

    setSelectedProducts((prev) => {
      const updatedSelectedProducts = [...prev, product];
      setCategory(product.category); // Set the category for comparison

      // Show swal message when a product is selected
      Swal.fire(`Product ${updatedSelectedProducts.length} selected`);

      // Automatically open the comparison modal once 3 products are selected
      if (updatedSelectedProducts.length === 3) {
        setShowModal(true);
      }

      return updatedSelectedProducts;
    });
  };

  // Function to clear selected products
  const clearComparison = () => {
    setSelectedProducts([]);
    setCategory(null);
    setShowModal(false); // Close the modal when comparison is cleared
  };

  // Render loading and error states
  if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading products!:{isError.message}</div>;

  return (
    <div>
      <h1 className="text-2xl text-black font-semibold">Compare Products:</h1>

      {/* Selected Products for Comparison */}
      <div>
        {selectedProducts.length <= 3 && (
          <>
            <h1 className="text-xl text-black">
              Select 3 Product to see comparison Result:
            </h1>
          </>
        )}
        {selectedProducts.length > 0 && (
          <div className="flex flex-wrap  justify-center items-center gap-5">
            <h1 className="text-xl">Selected Product:</h1>
            {selectedProducts.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card glass w-80">
                  <figure>
                    <img
                      src={product.mimage}
                      alt={product.name}
                      className="w-80 h-60"
                    />
                  </figure>
                  <div className="my-5">
                    <div className="space-y-0 pl-5">
                      <div className="badge badge-outline">
                        {product.category}
                      </div>
                      <h2 className="card-title m-0 py-2 text-2xl w-full h-20">
                        {product.name}
                      </h2>

                      <div className="flex justify-between align-middle pr-5 pb-3">
                        <p className="m-0 text-md">Price: ${product.price}</p>

                        <StarRatings
                          rating={product.ratings}
                          starRatedColor="#f39c12"
                          numberOfStars={5}
                          name="rating"
                          starDimension="18px"
                          starSpacing="1px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* <button onClick={clearComparison} className="btn btn-primary mt-4">
          Clear Comparison
        </button> */}
      </div>

      {/* Comparison Summary Button */}
      {selectedProducts.length === 3 && (
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-success mt-4"
          >
            View Comparison Summary
          </button>
        </div>
      )}

      {/* Modal for Comparison Summary */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Comparison Summary</h2>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Ratings</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.ratings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button
                onClick={clearComparison}
                className="btn btn-secondary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Listing */}
      <div className="product-list flex flex-wrap justify-center gap-5">
        {products.length === 0 ? (
          <p className="text-green-500 text-3xl font-semibold ">
            Sorry, No Product found!!
          </p>
        ) : (
          products.map((product: TProduct) => (
            <div key={product.productId} className="product-item">
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card glass w-80">
                  <figure>
                    <img
                      src={product.mimage}
                      alt={product.name}
                      className="w-80 h-60"
                    />
                  </figure>
                  <div className="my-5">
                    <div className="space-y-0 pl-5">
                      <div className="badge badge-outline">
                        {product.category}
                      </div>
                      <h2 className="card-title m-0 py-2 text-2xl w-full h-20">
                        {product.name}
                      </h2>

                      <div className="flex justify-between align-middle pr-5 pb-3">
                        <p className="m-0 text-md">Price: ${product.price}</p>

                        <StarRatings
                          rating={product.ratings}
                          starRatedColor="#f39c12"
                          numberOfStars={5}
                          name="rating"
                          starDimension="18px"
                          starSpacing="1px"
                        />
                      </div>

                      <p className="min-h-40 h-fit">
                        Description:{" "}
                        {isExpanded
                          ? product.description
                          : `${truncatedDescription(product.description)}...`}
                        {product.description.length > 200 && (
                          <button
                            onClick={toggleDescription}
                            className="text-blue-500 hover:underline ml-1"
                          >
                            {isExpanded ? "See Less" : "See More"}
                          </button>
                        )}
                      </p>
                    </div>

                    <div className="container mx-auto mt-3 w-full flex flex-row gap-2">
                      <button
                        onClick={() => handleSelectProduct(product)}
                        className="btn btn-primary"
                      >
                        Select for Comparison
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductComparePage;
