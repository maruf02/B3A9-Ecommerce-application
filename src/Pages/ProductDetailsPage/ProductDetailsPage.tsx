import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../Redux/features/produtcs/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useGetVendorByEmailQuery } from "../../Redux/features/vendor/vendorApi";

import Swal from "sweetalert2";
import StarRatings from "react-star-ratings";
import {
  addProductToCart,
  clearCart,
} from "../../Redux/features/CartItem/cartSlice";
import SideBySideMagnifier from "../../shared/SideBySideMagnifier";
import CommentSection from "./CommentSection";
import RelatedProductSection from "./RelatedProductSection";

type User = {
  userId: string;
  email: string;
  // Add other user properties as needed
};

const ProductDetailsPage = () => {
  const [requiredQty, setRequiredQty] = useState(1);
  const { productId } = useParams<{ productId: string }>();
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user as User);
  // Fetch product details
  const { data: productsData, isLoading } = useGetProductByIdQuery(
    productId as string
  );
  const product = productsData?.data || {};

  const category = product.category as string;
  // Fetch vendor details
  const { data: vendorData } = useGetVendorByEmailQuery(
    product.email as string
  );
  const vendor = vendorData?.data || {};

  // Fetch cart state
  const cart = useSelector((state: RootState) => state.cart);

  // Handle quantity change
  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequiredQty(Number(e.target.value));
  };

  // Handle add to cart logic
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

  // Check stock availability
  const currentProduct = cart.savedProducts.find(
    (p) => p.productId === product.productId
  );
  const totalRequiredQty =
    (currentProduct ? currentProduct.requiredQty : 0) + requiredQty;

  if (totalRequiredQty > product.quantity) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your chosen quantity exceeds available stock.",
    });
  }

  const isOutOfStock = product.quantity === 0;
  const isAddToCartDisabled =
    isOutOfStock ||
    requiredQty > product.quantity ||
    totalRequiredQty > product.quantity;

  const images = [
    product.mimage,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ].filter(Boolean);

  console.log(images);
  if (isLoading) return <div>Loading...</div>;
  // if (isError || !product) return <div>Error loading product</div>;

  return (
    <div className="my-10 h-full lg:h-[700px] min-h-screen md:min-h-full">
      {/* <h2>ProductDetailsViewPage:{product.Mimages}</h2> */}
      <div className="text-3xl text-black font-semibold underline text-center pb-8 md:pb-14">
        See your Product in details:
      </div>
      <div className="flex flex-col lg:flex-row  w-11/12   mx-auto h-full gap-10">
        {/* left side portion */}
        <div className="w-full md:w-full h-full flex justify-center  ">
          <SideBySideMagnifier images={images} />
        </div>
        {/* left side portion */}
        {/* Right side portion */}
        <div className="w-full lg:w-4/6 h-fit  flex flex-col justify-between">
          <div>
            <Link to={`/shopPage/${vendor.shopName}/${vendor.vendorId}`}>
              <h1 className="text-2xl text-blue-600 font-semibold">
                {product.shopNameM}
              </h1>
            </Link>
            <h1 className="text-2xl text-black font-semibold">
              {product.name}
            </h1>
            <h1 className="text-2xl font-semibold">
              Price: <span className="text-red-500">${product.price}</span>
            </h1>
            <h1 className="text-xl">
              rating:
              <StarRatings
                rating={product.ratings}
                starRatedColor="#f39c12"
                numberOfStars={5}
                name="rating"
                starDimension="18px"
                starSpacing="1px"
              />
            </h1>
            <h1 className="text-xl">Category: {product.category}</h1>
            <h1 className="text-xl">Available Qty: {product.quantity}</h1>
            <h1 className="flex flex-row align-middle text-xl">
              <span className="pr-2">Require Qty:</span>
              <input
                type="number"
                name="requiredQty"
                value={requiredQty}
                onChange={handleQtyChange}
                disabled={isOutOfStock}
                min="1"
                max={product.quantity}
                placeholder="QTY"
                className="input input-bordered input-primary  input-sm w-16 max-w-xs text-black text-lg font-semibold bg-inherit "
              />
              {isOutOfStock ? (
                <span className="pl-2 text-red-700 font-normal">
                  Out of Stock
                </span>
              ) : (
                requiredQty > product.quantity && (
                  <span className="pl-2 text-red-700 font-normal">
                    Exceeds stock
                  </span>
                )
              )}
            </h1>
            <p className="broder border-2 border-gray-300 my-2"></p>
            <h1 className="text-base">Description:{product.description}</h1>
          </div>
          <div className="flex justify-center ">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary mt-4 my-5 w-2/4 mt-5"
              disabled={isAddToCartDisabled}
            >
              {isAddToCartDisabled ? (
                <p className="text-red-500">Cannot Add to Cart</p>
              ) : (
                "Add to Cart"
              )}
            </button>
            <br />
          </div>
        </div>
        {/* Right side portion */}
      </div>
      {/* <div>
        <h1>comment</h1>
        <CommentSection
          productId={productId || ""}
          vendorId={vendor.vendorId}
        />
      </div> */}
      <div>
        <h1 className="text-3xl font-semibold text-black">Comments:</h1>
        {/* Button to toggle comment visibility */}
        <div className="w-full flex flex-row justify-center">
          <button
            onClick={() => setIsCommentsVisible(!isCommentsVisible)}
            className="btn btn-outline btn-primary mt-4 text-black"
          >
            {isCommentsVisible ? "Hide Comments" : "See All Comments & Reviews"}
          </button>
        </div>
        {/* Conditionally render comment section */}
        {isCommentsVisible && (
          <CommentSection
            productId={productId || ""}
            vendorId={vendor.vendorId}
          />
        )}
      </div>
      <div>
        <RelatedProductSection category={category || ""} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
