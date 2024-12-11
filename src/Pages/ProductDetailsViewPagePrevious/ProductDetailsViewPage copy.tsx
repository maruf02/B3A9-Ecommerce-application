import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetProductsByCartIdsQuery,
} from "../../Redux/features/produtcs/productsApi";
import StarRatings from "react-star-ratings";
import SideBySideMagnifier from "../../shared/SideBySideMagnifier";
import { useGetVendorByEmailQuery } from "../../Redux/features/vendor/vendorApi";
import { useAppSelector } from "../../Redux/hooks";

const ProductDetailsViewPage = () => {
  // Accessing the cart state from Redux
  const cart = useAppSelector((state) => state.cart);
  console.log("Cart Info:", cart);
  // Accessing the cart state from Redux
  const { productId } = useParams<{ id: string }>();
  const { data: productsData } = useGetProductByIdQuery(productId as string);
  const product = productsData?.data || {};
  const { email, mimage, image2, image3, image4, image5 } = product;
  const { data: vendorData, refetch: vendorRefetch } = useGetVendorByEmailQuery(
    email as string
  );
  const vendor = vendorData?.data || {};
  const images = [mimage, image2, image3, image4, image5];
  const { vendorId } = vendor;
  console.log("images", vendor, email);

  // *********2nd
  const cartItem = useAppSelector((state) => state.cart);

  // Destructure productIds from the cart (assuming cart has a property productIds)
  const productIds = cartItem.productIds || []; // Default to an empty array if no productIds in cart
  console.log("productIds", productIds);
  // Fetch products based on the productIds in the cart
  const {
    data: cartProductsData,
    error,
    isLoading,
  } = useGetProductsByCartIdsQuery(productIds);
  const cartProducts = cartProductsData?.data || {};
  // *********2nd

  return (
    <div>
      <div className="my-10 h-full lg:h-[700px] min-h-screen md:min-h-full">
        <div className="text-3xl text-black font-semibold underline text-center pb-8 md:pb-14">
          See your Product in details:
        </div>
        <div className="flex flex-col lg:flex-row  w-11/12   mx-auto h-full gap-10">
          {/* left side portion */}
          <div className="w-full md:w-full h-full flex justify-center  ">
            <SideBySideMagnifier images={images} />
          </div>
          {/* Right side portion */}
          <div className="w-full lg:w-4/6 h-fit  flex flex-col justify-between">
            <div>
              <h4 className="text-2xl text-black font-semibold">
                {product.name}
              </h4>
              <Link to={`/shopPage/${vendorId}`}>
                <div className="text-2xl font-semibold">
                  shop:{" "}
                  <span className="text-blue-500">{product.shopNameM}</span>
                </div>
              </Link>
              <p className="text-2xl font-semibold">
                Price: <span className="text-red-500">${product.price}</span>
              </p>
              <p className="text-2xl font-medium">
                Status:{" "}
                {/* {product.status === "available" ? (
                  <>
                    <span className="text-green-500">{product.status}</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-500">{product.status}</span>
                  </>
                )} */}
              </p>
              <p>
                Rating:
                <StarRatings
                  rating={product.rating || 0}
                  starRatedColor="#f39c12"
                  numberOfStars={5}
                  name="rating"
                  starDimension="18px"
                  starSpacing="1px"
                />
              </p>
              <p>Category: {product.category}</p>

              <p className="broder border-2 border-gray-300 my-2"></p>
              <p>Description: {product.description}</p>
            </div>

            <Link to="/Booking">
              <div className="flex justify-center ">
                <button className="btn btn-primary mt-4 my-5 w-2/4 mt-5">
                  Book Now
                </button>

                <br />
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Display Cart Info */}
      <div className="my-10">
        <h2 className="text-2xl font-bold">Cart Details</h2>
        <p className="mt-2">
          <strong>Vendor ID:</strong>{" "}
          {cart.vendorId ? cart.vendorId : "No vendor selected"}
        </p>
        <p className="mt-2">
          <strong>Product IDs:</strong>{" "}
          {cart.productIds.length > 0
            ? cart.productIds.join(", ")
            : "No products in cart"}
        </p>
      </div>

      {/* **************2nd */}
      {/* Display Cart Product Info */}
      <div className="my-10">
        <h2 className="text-2xl font-bold">Cart Details</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products</p>
        ) : (
          <div>
            {cartProducts?.map((product: any) => (
              <div key={product.productId} className="border p-4 mb-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* **************2nd */}
    </div>
  );
};

export default ProductDetailsViewPage;
