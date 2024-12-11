import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  addProductToCart,
  clearCart,
} from "../../Redux/features/CartItem/cartSlice";
import { useGetVendorByEmailQuery } from "../../Redux/features/vendor/vendorApi";
import { toast } from "react-toast";
interface Product {
  productId: string;
  email: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  ratings: number;
  mimage: string;
  description: string;
}

interface ProductsSingleViewProps {
  product: Product;
}
const ProductsSingleView = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
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
    if (cart.savedVendor && cart.savedVendor.vendorId !== vendor.vendorId) {
      Swal.fire({
        title: "Different Vendor Detected",
        text: "Your previous cart items will be removed because the vendor is different. Do you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, switch vendor",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearCart());
          dispatch(
            addProductToCart({
              vendor,
              product: { ...product, requiredQty: 1 },
            })
          );
          Swal.fire(
            "Cart Updated",
            "Your cart has been updated with the new vendor and product.",
            "success"
          );
        } else {
          Swal.fire("Cart update canceled");
        }
      });
    } else {
      dispatch(
        addProductToCart({ vendor, product: { ...product, requiredQty: 1 } })
      );
      Swal.fire(
        "Product Added",
        "The product has been added to your cart.",
        "success"
      );
    }
  };
  // *************************************

  return (
    <div className=" ">
      {/* *********************** */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        // className="text-center"
      >
        <div className="card glass w-80 ">
          <figure>
            <img src={mimage} alt="car!" className="w-80 h-60" />
          </figure>
          <div className=" my-5 ">
            <div className="space-y-0 pl-5">
              <div className="badge badge-outline">{category}</div>
              <h2 className="card-title m-0 py-2 text-2xl w-full h-20">
                {name}
              </h2>
              <p className="m-0 text-md">QTY: {quantity}pcs</p>
              <div className="flex justify-between align-middle pr-5 pb-3">
                <p className="m-0 text-md">Price: {price}</p>

                <StarRatings
                  // rating={ratings}
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

            <div className=" container mx-auto   mt-3   w-full flex flex-row gap-2">
              <button
                className="btn btn-primary  w-1/2 "
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <Link to={`/ProductDetailsView/${productId}`}>
                <button className="btn btn-primary  w-full ">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      {/* *********************** */}
    </div>
  );
};

export default ProductsSingleView;
