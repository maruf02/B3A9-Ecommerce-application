import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RootState } from "../../Redux/store";
import { useGetAllProductQuery } from "../../Redux/features/produtcs/productsApi";

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderData = useSelector((state: RootState) => state.order.orderData);

  // Extract user, vendor, and items from orderData
  const user = orderData?.user;
  const vendor = orderData?.vendor;
  const items = orderData?.items || [];
  const totalItems = orderData?.totalItems ?? 0;
  const totalPrice = orderData?.totalPrice ?? 0;
  // const [createOrderItem] = useCreateOrderItemMutation();
  const { refetch } = useGetAllProductQuery(undefined);
  console.log("items", items);
  const handleCheckOut = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.nameT.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const payment = form.payment.value;
    const purchaseDate = new Date().toLocaleDateString();
    const itemIds = items.map((item) => item.productId);

    const orderItem = {
      items,
      totalItems,
      totalPrice,
      itemIds,
      name,
      email,
      phone,
      address,
      payment,
      purchaseDate,
    };
    // console.log("Checkout Details:", {
    //   orderItem,
    // });

    //   try {
    //     // const response =
    //     await createOrderItem(orderItem).unwrap();
    //     // console.log("Order created successfully", response);
    //     Swal.fire({
    //       title: `Hey ${email}. Your purchase is Success. Wait for your Product. Thanks`,
    //       width: 600,
    //       padding: "3em",
    //       color: "#716add",
    //       background: "#fff url(/images/trees.png)",
    //       backdrop: `
    //   rgba(0,0,123,0.4)
    //   url("/images/nyan-cat.gif")
    //   left top
    //   no-repeat
    // `,
    //       allowOutsideClick: false, // Disable closing by clicking outside
    //       confirmButtonText: "OK", // Text for the confirm button
    //     });

    //     dispatch(clearOrderData());
    //     dispatch(clearProducts());
    //     refetch();
    //     navigate("/");
    //   } catch (error) {
    //     // console.error("Failed to create order", error);
    //   }
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
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        </div>
        {/* left */}
        {/* right */}
        <div className="w-full  justify-start pl-10 pt-10">
          <form
            onSubmit={handleCheckOut}
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
              <label className="pr-3">Payment:</label>
              <input
                type="radio"
                name="payment"
                value="CashOnDelivery"
                id="credit"
                required
                className="radio radio-primary"
              />
              <label>Cash On Delivery</label>
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
