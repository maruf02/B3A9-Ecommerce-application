import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../Redux/store";
import { useCreateOrderMutation } from "../../Redux/features/produtcs/orderApi";
import { clearCart } from "../../Redux/features/CartItem/cartSlice";

interface ApiError {
  data?: {
    message?: string;
  };

  status?: number;
}

const CheckOutPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const orderData = useSelector((state: RootState) => state.order.orderData);
  const [createOrder] = useCreateOrderMutation();

  // Extract user, vendor, and items from orderData
  const user = orderData?.user;

  const items = orderData?.items || [];

  const userId = orderData?.user?.userId || "";
  const userEmail = orderData?.user?.email || "";
  const vendorId = orderData?.vendor?.vendorId || "";
  const vendorEmail = orderData?.vendor?.email || "";
  const shopName = orderData?.vendor?.shopName || "";
  const products = orderData?.items || [];
  const totalItems = orderData?.totalItems || 0;
  const totalPrice = orderData?.totalPrice || 0;
  const [coupon, setCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);

  const handlePaymentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const finalPrice = discountedPrice;
    console.log("object");
    Swal.fire({
      title: "Are you sure?",
      text: `You need to pay $${totalPrice}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed  it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const orderData = {
            userId,
            userEmail,
            vendorId,
            vendorEmail,
            shopName,
            totalItems,
            totalPrice: finalPrice,
            paymentMethod: "credit_card",
            status: "completed",
            orderItems: products,
          };

          // ************************
          console.log("orderData", orderData);

          const res = await createOrder(orderData).unwrap();
          if (res.data && res.data.payment_url) {
            dispatch(clearCart());
            window.location.href = res.data.payment_url;
          } else {
            throw new Error("Payment URL not found in response.");
          }
        } catch (error) {
          // console.error("Error during payment submission:", error);
          // Swal.fire(
          //   "Error",
          //   error.data?.message || "There was a problem processing your payment",
          //   "error"
          // );
          const apiError = error as ApiError;

          console.error("Error during payment submission:", apiError);
          Swal.fire(
            "Error",
            apiError.data?.message ||
              "There was a problem processing your payment",
            "error"
          );
        }

        // ************************

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });

    console.log(orderData);
  };

  const handleCouponBlur = () => {
    if (coupon === "amaarPay") {
      setDiscountedPrice(totalPrice * 0.95);
      Swal.fire("Coupon code correct. You get a 5% discount.");
    } else if (coupon) {
      setDiscountedPrice(totalPrice);
      Swal.fire("Coupon code incorrect.");
    }
  };

  return (
    <div className="my-10 ">
      <h1 className="text-2xl text-black font-semibold text-center pb-5 underline">
        CheckOut Your Purchase:
      </h1>
      <div className=" flex flex-col lg:flex-row gap-5 w-full md:w-7/12 h-full mx-auto  shadow-2xl rounded-lg">
        {/* left */}
        <div className=" w-full pl-3 md:pl-10  align-middle py-10 ">
          <div className="text-xl text-black font-medium underline">
            Total Items: ({totalItems})
          </div>
          <div className="text-lg text-black font-medium ">Items:</div>
          <ul>
            {items.map((item, index) => (
              <li key={item.productId}>
                {index + 1} . {item.name}: {item.requiredQty} pcs
              </li>
            ))}
          </ul>
          <div className="text-xl text-black font-medium ">
            {/* Total Price: ${totalPrice.toFixed(2)} */}
            Total Price: ${discountedPrice.toFixed(2)}
          </div>
          <div className="text-lg text-blue-500 font-medium ">
            Use cupon "amaarPay" for less 5%.
          </div>
        </div>
        {/* left */}
        {/* right */}
        <div className="w-full  justify-start pl-10 pt-10">
          <form
            onSubmit={handlePaymentSubmit}
            className="flex flex-col gap-2 py-5 pl-5 "
          >
            <div>
              <label className="pr-5">Name:</label>
              <input
                type="text"
                name="nameT"
                placeholder="Enter your name"
                id="name"
                required
                className=" bg-white text-black input input-bordered input-primary input-sm pl-5"
              />
            </div>
            <div>
              <label className="pr-7">Email:</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="Enter your Email"
                id="email"
                required
                readOnly
                className=" bg-white text-black input input-bordered input-primary input-sm pl-5"
              />
            </div>
            <div>
              <label className="pr-5">Phone:</label>
              <input
                type="number"
                name="phone"
                placeholder="Enter your phone"
                id="phone"
                required
                className=" bg-white text-black input input-bordered input-primary input-sm pl-5"
              />
            </div>
            <div>
              <label className="pr-3">Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your Address"
                id="address"
                required
                className=" bg-white text-black input input-bordered input-primary input-sm"
              />
            </div>

            <div className="flex flex-row align-middle gap-2">
              <label className="pr-3">Cupon :</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your Address"
                id="address"
                className=" bg-white text-black input input-bordered input-primary input-sm"
                // onChange={(e) => {
                //   const input = e.target.value;
                //   setCoupon(input);
                //   if (input === "amaarPay") {
                //     setDiscountedPrice(totalPrice * 0.95);
                //     Swal.fire("cupon code correct. you get 5% discount");
                //   } else {
                //     setDiscountedPrice(totalPrice);
                //     Swal.fire("cupon code incorrect. ");
                //   }
                // }}
                onChange={(e) => setCoupon(e.target.value)}
                onBlur={handleCouponBlur}
              />
            </div>

            <div className="flex justify-center my-5 w-full">
              <button className="btn btn-primary w-10/12 flex justify-center">
                Place Order
              </button>
            </div>
          </form>
        </div>
        {/* right */}
      </div>
    </div>
  );
};

export default CheckOutPage;
