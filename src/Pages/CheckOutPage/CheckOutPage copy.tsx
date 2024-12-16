// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { RootState } from "../../Redux/store";
// import { useGetAllProductQuery } from "../../Redux/features/produtcs/productsApi";
// import { useCreateOrderMutation } from "../../Redux/features/produtcs/orderApi";

// const CheckOutPage = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const orderData = useSelector((state: RootState) => state.order.orderData);
//   const [createOrder] = useCreateOrderMutation();

//   // Extract user, vendor, and items from orderData
//   const user = orderData?.user;

//   const items = orderData?.items || [];

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };
//   const userId = orderData?.user?.userId || "";
//   const userEmail = orderData?.user?.email || "";
//   const vendorId = orderData?.vendor?.vendorId || "";
//   const vendorEmail = orderData?.vendor?.email || "";
//   const shopName = orderData?.vendor?.shopName || "";
//   const products = orderData?.items || [];
//   const totalItems = orderData?.totalItems || 0;
//   const totalPrice = orderData?.totalPrice || 0;

//   const handlePaymentSubmit = () => {
//     console.log("object");

//     const orderData = {
//       userId,
//       userEmail,
//       vendorId,
//       vendorEmail,
//       shopName,
//       totalItems,
//       totalPrice,
//       paymentMethod: "credit_card",
//       status: "completed",
//       orderItems: products,
//     };

//     console.log(orderData);
//   };

//   return (
//     <div className="my-10 ">
//       <h1 className="text-2xl text-black font-semibold text-center pb-5 underline">
//         CheckOut Your Purchase:
//       </h1>
//       <div className=" flex flex-col lg:flex-row gap-5 w-full md:w-7/12 h-full mx-auto  shadow-2xl rounded-lg">
//         {/* left */}
//         <div className=" w-full pl-3 md:pl-10  align-middle py-10 ">
//           <div className="text-xl text-black font-medium underline">
//             Total Items: ({totalItems})
//           </div>
//           <div className="text-lg text-black font-medium ">Items:</div>
//           <ul>
//             {items.map((item, index) => (
//               <li key={item.productId}>
//                 {index + 1} . {item.name}: {item.requiredQty} pcs
//               </li>
//             ))}
//           </ul>
//           <div className="text-xl text-black font-medium ">
//             Total Price: ${totalPrice.toFixed(2)}
//           </div>
//         </div>
//         {/* left */}
//         {/* right */}
//         <div className="w-full  justify-start pl-10 pt-10">
//           <form className="flex flex-col gap-2 py-5 pl-5 ">
//             <div>
//               <label className="pr-5">Name:</label>
//               <input
//                 type="text"
//                 name="nameT"
//                 placeholder="Enter your name"
//                 id="name"
//                 required
//                 className=" bg-white text-black input input-bordered input-primary input-sm pl-5"
//               />
//             </div>
//             <div>
//               <label className="pr-7">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 defaultValue={user?.email}
//                 placeholder="Enter your Email"
//                 id="email"
//                 required
//                 readOnly
//                 className=" bg-white text-black input input-bordered input-primary input-sm pl-5"
//               />
//             </div>
//             <div>
//               <label className="pr-5">Phone:</label>
//               <input
//                 type="number"
//                 name="phone"
//                 placeholder="Enter your phone"
//                 id="phone"
//                 required
//                 className=" bg-white text-black input input-bordered input-primary input-sm pl-5"
//               />
//             </div>
//             <div>
//               <label className="pr-3">Address:</label>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Enter your Address"
//                 id="address"
//                 required
//                 className=" bg-white text-black input input-bordered input-primary input-sm"
//               />
//             </div>

//             <div className="flex flex-row align-middle gap-2">
//               <label className="pr-3">Payment:</label>
//               <input
//                 type="radio"
//                 name="payment"
//                 value="CashOnDelivery"
//                 id="credit"
//                 required
//                 className="radio radio-primary"
//               />
//               <label>Cash On Delivery</label>
//             </div>

//             <div className="flex justify-center my-5 w-full">
//               <button
//                 className="btn btn-primary w-10/12 flex justify-center"
//                 onClick={openModal}
//               >
//                 Place Order
//               </button>
//             </div>
//           </form>
//         </div>
//         {/* right */}
//         {isOpen && (
//           <dialog className="modal" open>
//             <div className="modal-box bg-[#B7B7B7] text-black">
//               <h3 className="font-bold text-2xl text-center  ">Welcome!</h3>
//               <p className="py-4">Amount: {totalPrice}</p>
//               <p className="py-2"> </p>
//               <div className="modal-action">
//                 <button
//                   onClick={handlePaymentSubmit}
//                   className="flex mx-auto text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-3/4 text-2xl pb-1"
//                 >
//                   Proceed to Pay
//                 </button>
//                 <button
//                   className="btn text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </dialog>
//         )}
//       </div>

//       <div>
//         <h1>all infor of order data from from reduc store:</h1>
//         <div className="my-10">
//           <h1 className="text-2xl text-black font-semibold text-center pb-5 underline">
//             CheckOut Your Purchase:
//           </h1>

//           {/* Display Order Summary */}
//           <div className="w-full md:w-7/12 mx-auto shadow-2xl rounded-lg p-5">
//             <h2 className="text-xl font-bold">Order Summary</h2>
//             <div className="mt-3">
//               <p>
//                 <strong>User ID:</strong> {userId}
//               </p>
//               <p>
//                 <strong>User Email:</strong> {userEmail}
//               </p>
//               <p>
//                 <strong>Vendor ID:</strong> {vendorId}
//               </p>
//               <p>
//                 <strong>Vendor Email:</strong> {vendorEmail}
//               </p>
//               <p>
//                 <strong>Shop Name:</strong> {shopName}
//               </p>
//               <p>
//                 <strong>Total Items:</strong> {totalItems}
//               </p>
//               <p>
//                 <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
//               </p>
//             </div>

//             {/* Display Product List */}
//             <div className="mt-5">
//               <h3 className="text-lg font-semibold">Products:</h3>
//               <ul className="list-disc pl-5">
//                 {products.map((product, index) => (
//                   <li key={product.productId}>
//                     <p>
//                       <strong>Product {index + 1}:</strong>
//                     </p>
//                     <p>Product ID: {product.productId}</p>
//                     <p>Name: {product.name}</p>
//                     <p>Required Quantity: {product.requiredQty}</p>
//                     <p>Price: ${product.price.toFixed(2)}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOutPage;
