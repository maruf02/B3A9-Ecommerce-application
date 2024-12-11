import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import { useGetProductByIdQuery } from "../../Redux/features/produtcs/productsApi";
import { RootState } from "../../Redux/store";

const ProductDetailsViewPage: React.FC = () => {
  const [requiredQty, setRequiredQty] = useState(1);
  const { productId } = useParams<{ id: string }>();
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId as string);
  const dispatch = useDispatch();

  // --------------------
  // const savedProducts = useSelector(
  //   (state: RootState) => state.product.savedProducts
  // );

  // console.log("savedProducts", savedProducts);

  // --------------------

  const product = productsData?.data || [];
  // console.log(product);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error loading product</div>;

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequiredQty(Number(e.target.value));
  };

  const handleProductIdLocalStorage = () => {
    const productToAdd = { ...product, requiredQty };
    // console.log("productToAdd", productToAdd);
    dispatch(addProduct(productToAdd));
    setRequiredQty(1);
    Swal.fire({
      title: "Success!",
      text: "Product added to cart successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  // logic-> when user give input that time check his previous save data(requireQty)+present(RequireQty) === product Qty
  const currentProduct = savedProducts.find((p) => p._id === product._id);
  const totalRequiredQty =
    (currentProduct ? currentProduct.requiredQty : 0) + requiredQty;
  if (totalRequiredQty > product.quantity) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your Choose quantity exceed out Stock Quantity",
    });
  }

  const isOutOfStock = product.quantity === 0;
  // const existingProduct = savedProducts.find((p) => p._id === product._id);
  const isAddToCartDisabled =
    isOutOfStock ||
    requiredQty > product.quantity ||
    totalRequiredQty > product.quantity;

  const images = [
    product.Mimages,
    product.images2,
    product.images3,
    product.images4,
    product.images5,
  ];
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
            <h1 className="text-2xl text-black font-semibold">
              {product.name}
            </h1>
            <h1 className="text-2xl font-semibold">
              Price: <span className="text-red-500">${product.price}</span>
            </h1>
            <h1>
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
            <h1>Category: {product.category}</h1>
            <h1>Available Qty: {product.quantity}</h1>
            <h1 className="flex flex-row align-middle">
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
            <h1>Description:{product.description}</h1>
          </div>
          <div className="flex justify-center ">
            <button
              onClick={handleProductIdLocalStorage}
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
    </div>
  );
};

export default ProductDetailsViewPage;
