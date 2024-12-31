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
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { addProductToView } from "../../Redux/features/CartItem/viewSlice";
import { TUser } from "../../types";
import { FaRegHeart } from "react-icons/fa";
import { addProductToWishList } from "../../Redux/features/CartItem/wishListSlice";

export type Product = {
  productId: string;
  email: string;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  mimage: string;
  vendorId: string;
  shopName: string;
  requiredQty: number;
  ratings: number;
};

type ProductsSingleViewProps = {
  product: Product;
};

const ProductsSingleView: React.FC<ProductsSingleViewProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [requiredQty, setRequiredQty] = useState(1);
  const cart = useAppSelector((state) => state.cart);
  // const [isExpanded, setIsExpanded] = useState(false);
  console.log(setRequiredQty);
  const {
    productId,
    email,
    name,
    price,
    category,
    // description,
    quantity,
    mimage,
  } = product;

  const { data: vendorData } = useGetVendorByEmailQuery(email as string);
  const vendor = vendorData?.data || {};
  const user = useSelector((state: RootState) => state.auth.user as TUser);
  // const { vendorId } = vendor;

  // const toggleDescription = () => {
  //   setIsExpanded(!isExpanded);
  // };

  // const truncatedDescription = description.slice(0, 200);

  // *************************************
  const handleAddToCart = () => {
    if (!user) {
      Swal.fire(
        "Please log in",
        "You need to log in to add products to your cart.",
        "info"
      );
      return;
    }

    if (cart.savedVendor && cart.savedVendor.vendorId !== vendor.vendorId) {
      Swal.fire({
        title: "Different Vendor Detected",
        text: "Your previous cart items will be removed because the vendor is different. Do you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, switch vendor",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearCart());
          dispatch(
            addProductToCart({
              user,
              vendor,
              product: { ...product, requiredQty },
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
        addProductToCart({ user, vendor, product: { ...product, requiredQty } })
      );
      Swal.fire(
        "Product Added",
        "The product has been added to your cart.",
        "success"
      );
    }
  };
  // *************************************

  const handleAddView = (product: Product) => {
    // console.log("product", product);
    dispatch(addProductToView(product)); // Save product details in the view slice
  };
  const handleAddWish = (product: Product) => {
    // console.log("product", product);
    dispatch(addProductToWishList(product));
    Swal.fire({
      title: "Success!",
      text: "Product added to your wishlist.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

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
        <div className="card glass w-72 ">
          <figure>
            <img src={mimage} alt="car!" className="w-80 h-60" />
          </figure>
          <div className=" my-5 ">
            <div className="space-y-0 pl-5">
              <div className="w-full flex flex-row justify-between">
                <div className="badge badge-outline ">{category}</div>
                <div className="pr-5">
                  <button onClick={() => handleAddWish(product)}>
                    <FaRegHeart className="w-5 h-5 text-red-800" />
                  </button>
                </div>
              </div>
              <h2 className="card-title m-0 py-2 text-lg w-full h-20">
                {name}
              </h2>
              {/* <p className="m-0 text-md">QTY: {quantity}pcs</p> */}
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
              {/* <p className="min-h-40 h-fit">
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
              </p> */}
            </div>

            <div className=" container mx-auto   mt-3   w-full flex flex-row gap-2">
              <button
                className="btn btn-primary  w-1/2 "
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <Link to={`/ProductDetailsView/${productId}`}>
                <button
                  className="btn btn-primary  w-full  "
                  onClick={() => handleAddView(product)}
                >
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
