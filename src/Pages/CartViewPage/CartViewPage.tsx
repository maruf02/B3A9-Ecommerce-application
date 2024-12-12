import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { RootState } from "../../Redux/store";
import { removeProductFromCart } from "../../Redux/features/CartItem/cartSlice";
import { setOrderData } from "../../Redux/features/CartItem/placeOrderSlice";

const CartViewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedProducts = useSelector(
    (state: RootState) => state.cart.savedProducts
  );
  const savedVendors = useSelector(
    (state: RootState) => state.cart.savedVendor
  );
  const savedUser = useSelector((state: RootState) => state.cart.savedUser);

  console.log("savedUser", savedUser);
  const [cartItems, setCartItems] = useState(savedProducts);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPlaceOrderDisabled, setIsPlaceOrderDisabled] = useState(false);
  console.log("cartItems", cartItems);
  // Recalculate total price and check stock after every update
  useEffect(() => {
    calculateTotalPrice();
    checkIfExceedsStock();
  }, [cartItems]);

  // Handle quantity change
  const handleQtyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const newQty = Number(e.target.value);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, requiredQty: newQty } : item
      )
    );
  };

  // Remove product from cart with confirmation
  const handleRemoveProduct = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this product from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeProductFromCart(productId));
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId !== productId)
        );
        Swal.fire(
          "Removed!",
          "The product has been removed from the cart.",
          "success"
        );
      }
    });
  };

  // Calculate total price based on products in cart
  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.requiredQty,
      0
    );
    setTotalPrice(total);
  };

  // Check if any product exceeds available stock
  const checkIfExceedsStock = () => {
    const exceedsStock = cartItems.some(
      (item) => item.requiredQty > item.quantity
    );
    const hasZeroQty = cartItems.some((item) => item.requiredQty <= 0);
    setIsPlaceOrderDisabled(exceedsStock || hasZeroQty);
  };

  // Place order function
  const handlePlaceOrder = () => {
    // Get user info from the cart
    const userInfo = {
      userId: savedUser?.userId || "", // Ensure fallback to an empty string if undefined
      email: savedUser?.email || "",
    };

    // Get product info from the cart items
    const productInfo = savedProducts.map((item) => ({
      productId: item.productId,
      mimage: item.mimage,
      name: item.name,
      requiredQty: item.requiredQty,
      price: item.price,
    }));

    // Get vendor info from the cart
    const vendorInfo = {
      vendorId: savedVendors?.vendorId || "", // Ensure fallback to an empty string if undefined
      email: savedVendors?.email || "",
      shopName: savedVendors?.shopName || "",
    };

    // Create the orderData object matching the expected type
    const orderData = {
      user: userInfo,
      vendor: vendorInfo,
      items: productInfo, // Map `productInfo` to `items` field
      totalItems: savedProducts.length,
      totalPrice,
    };

    // Dispatch the action to store the order data in Redux
    dispatch(setOrderData(orderData));
    navigate("/checkout");
  };

  return (
    <div className="w-full h-full min-h-screen">
      <motion.div
        // whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        // className="text-center"
      >
        <div>
          <h2 className="text-2xl text-black font-semibold text-center  pb-5 flex justify-center gap-10">
            <span className="underline"> Saved Products: </span>
            <span className="pl-5 ">Total Price:(${totalPrice})</span>
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            // className="text-center"
          >
            <div className="flex flex-row flex-wrap">
              {totalPrice === 0 ? (
                <div className="text-green-600 text-4xl font-semibold mx-auto">
                  Empty Cart.Please add Product For Purchase!!
                </div>
              ) : (
                cartItems.map((product) => (
                  <div
                    key={product.productId}
                    className="flex flex-col md:flex-row mx-auto w-fit px-5 py-2 h-fit gap-5 py-5 shadow-xl bg-gray-200 rounded-2xl my-3"
                  >
                    <div className="flex flex-row">
                      <div className="w-36 h-full rounded-md">
                        <img
                          src={product.mimage}
                          alt={product.name}
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                      <div className="px-5">
                        <h1 className="text-xl">Name: {product.name}</h1>
                        <h1 className="text-xl">
                          Product price: ${product.price}
                        </h1>
                        <h1 className="text-xl">
                          Category: {product.category}
                        </h1>
                        {/* <h1>Ratings: {product.ratings}</h1> */}
                        <h1 className="text-xl">
                          Available Stock: {product.quantity}
                        </h1>
                      </div>
                      <div className="align-middle">
                        <h1 className="flex flex-row align-middle text-xl">
                          <span className="pr-2">Required Qty:</span>
                          <input
                            type="number"
                            name="requiredQty"
                            value={product.requiredQty}
                            onChange={(e) =>
                              handleQtyChange(e, product.productId)
                            }
                            min="1"
                            max={product.quantity}
                            placeholder="QTY"
                            className="input input-bordered input-primary input-sm w-16 max-w-xs text-black text-lg font-semibold bg-inherit"
                          />
                          {product.requiredQty > product.quantity && (
                            <span className="pl-2 text-red-700 font-normal">
                              Exceeds stock
                            </span>
                          )}
                        </h1>
                        <h1 className="text-xl">
                          Purchase total price: $
                          {(product.price * product.requiredQty).toFixed(2)}
                        </h1>
                        <button
                          onClick={() => handleRemoveProduct(product.productId)}
                          className="btn btn-sm btn-warning"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          <div className="flex flex-col mx-auto w-5/12 px-5 py-2 h-32 gap-5  justify-center my-10">
            <h1 className="text-2xl text-black font-semibold text-center mb-3 underline">
              Total price: ${totalPrice.toFixed(2)}
            </h1>
            <div className="text-center">
              {isPlaceOrderDisabled && (
                <span className="text-red-700 font-normal">
                  Adjust quantities to place the order
                </span>
              )}
            </div>
            {totalPrice > 0 ? (
              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary"
                disabled={isPlaceOrderDisabled}
              >
                Place Order
              </button>
            ) : (
              <button className="btn btn-primary " disabled>
                Place Order
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartViewPage;
