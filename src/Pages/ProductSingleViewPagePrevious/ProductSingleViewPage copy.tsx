import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useGetVendorByEmailQuery } from "../../Redux/features/vendor/vendorApi";
import { toast } from "react-toast";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { addProductToCart } from "../../Redux/features/CartItem/cartSlice";

const ProductSingleViewPage = ({ product }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    productId,
    shopNameM,
    email,
    name,
    price,
    category,
    description,
    quantity,
    mimage,
    image2,
    image3,
    image4,
    image5,
    discount,
    discountPrice,
  } = product;

  const { data: vendorData, refetch: vendorRefetch } = useGetVendorByEmailQuery(
    email as string
  );
  const vendor = vendorData?.data || {};

  const { vendorId } = vendor;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription = description.slice(0, 200);

  // *************************************
  const handleAddToCart = () => {
    const existingCart = localStorage.getItem("cartItem");
    const existingCartData = existingCart ? JSON.parse(existingCart) : null;

    if (existingCartData) {
      const existingVendorId = existingCartData.vendorId;

      if (existingVendorId === vendorId) {
        // Same vendor, just add the productId
        const updatedCart = {
          vendorId,
          productIds: [...existingCartData.productIds, productId],
        };
        localStorage.setItem("cartItem", JSON.stringify(updatedCart));
        toast.success("Product added to cart");
      } else {
        // Different vendor, show confirmation to switch vendors
        const confirmSwitch = window.confirm(
          "Your previous cart items will be removed because the vendor is different. Do you want to continue?"
        );

        if (confirmSwitch) {
          // Clear the previous cart data and save the new cart item
          const newCart = {
            vendorId,
            productIds: [productId],
          };
          localStorage.setItem("cartItem", JSON.stringify(newCart));
          toast.success("Cart updated with new vendor and product");
        } else {
          toast.info("Cart update canceled");
        }
      }
    } else {
      // No existing cart, create a new cart item
      const newCart = {
        vendorId,
        productIds: [productId],
      };
      localStorage.setItem("cartItem", JSON.stringify(newCart));
      toast.success("Product added to cart");
    }
  };
  // *************************************

  return (
    <div>
      <div>
        {/* *********************** */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          // className="text-center"
        >
          <div className="card glass w-80">
            <figure>
              <img src={mimage} alt="car!" className="w-80 h-60" />
            </figure>
            <div className=" my-5 ">
              <div className="space-y-0 pl-5">
                <div className="badge badge-outline">{category}</div>
                <h2 className="card-title m-0 py-2 text-2xl w-full h-20">
                  {name}
                </h2>

                <div className="flex justify-between align-middle pr-5 pb-3">
                  <p className="m-0 text-md">Price: ${price}</p>

                  <StarRatings
                    // rating={rating}
                    rating={3}
                    starRatedColor="#f39c12"
                    numberOfStars={5}
                    name="rating"
                    starDimension="18px"
                    starSpacing="1px"
                  />
                </div>
                <p className="min-h-40 h-fit">
                  Description:{" "}
                  {isExpanded ? description : `${truncatedDescription}...`}
                  {description.length > 200 && (
                    <button
                      onClick={toggleDescription}
                      className="text-blue-500 hover:underline ml-1"
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  )}
                </p>
              </div>
              <div className="card-actions mt-3">
                <button
                  className="btn btn-secondary w-full"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
              <Link to={`/productDetailsView/${productId}`}>
                <div className="card-actions   mt-3 ">
                  <button className="btn btn-primary w-full ">
                    View Details
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
        {/* *********************** */}
      </div>
    </div>
  );
};

export default ProductSingleViewPage;
