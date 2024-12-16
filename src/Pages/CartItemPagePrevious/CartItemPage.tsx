// import { motion } from "framer-motion";
// import { useAppSelector } from "../../Redux/hooks";
// import { useGetProductsByCartIdsQuery } from "../../Redux/features/produtcs/productsApi";
// import ProductSingleViewPage from "./ProductSingleViewPage";
// import CartItenProductSingleViewPage from "./CartItenProductSingleViewPage";
// import { Link } from "react-router-dom";

// const CartItemPage = () => {
//   const cartItem = useAppSelector((state) => state.cart);

//   // Destructure productIds from the cart (assuming cart has a property productIds)
//   const productIds = cartItem.productIds || []; // Default to an empty array if no productIds in cart
//   console.log("productIds", productIds);

//   const {
//     data: cartProductsData,
//     isError,
//     isLoading,
//   } = useGetProductsByCartIdsQuery(productIds);
//   const cartProducts = cartProductsData?.data || {};
//   console.log("cartProducts", cartProducts);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error fetching products</p>;
//   }

//   if (!cartProductsData || cartProductsData.length === 0) {
//     return <p>No products found for this vendor.</p>;
//   }
//   return (
//     <div className="w-full h-full min-h-screen">
//       <motion.div
//         // whileHover={{ scale: 1.05 }}
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 2 }}
//         // className="text-center"
//       >
//         <div>
//           <h2 className="text-2xl text-black font-semibold text-center  pb-5 flex justify-center gap-10">
//             <span className="underline"> Saved Products: </span>
//             <span className="pl-5 ">Total Price:(${totalPrice})</span>
//           </h2>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//             // className="text-center"
//           >
//             <div className="flex flex-row flex-wrap">
//               {totalPrice === 0 ? (
//                 <div className="text-green-600 text-4xl font-semibold mx-auto">
//                   Empty Cart.Please add Product For Purchase!!
//                 </div>
//               ) : (
//                 cartItems.map((product) => (
//                   <div
//                     key={product._id}
//                     className="flex flex-col md:flex-row mx-auto w-fit px-5 py-2 h-fit gap-5 py-5 shadow-xl bg-gray-200 rounded-2xl my-3"
//                   >
//                     <div className="w-36 h-full rounded-md">
//                       <img
//                         src={product.Mimages}
//                         alt={product.name}
//                         className="w-full h-full rounded-lg"
//                       />
//                     </div>
//                     <div className="px-5">
//                       <h1>Name: {product.name}</h1>
//                       <h1>Product price: ${product.price}</h1>
//                       <h1>Category: {product.category}</h1>
//                       <h1>Ratings: {product.ratings}</h1>
//                       <h1>Available Stock: {product.quantity}</h1>
//                     </div>
//                     <div className="align-middle">
//                       <h1 className="flex flex-row align-middle">
//                         <span className="pr-2">Required Qty:</span>
//                         <input
//                           type="number"
//                           name="requiredQty"
//                           value={product.requiredQty}
//                           onChange={(e) => handleQtyChange(e, product._id)}
//                           min="1"
//                           max={product.quantity}
//                           placeholder="QTY"
//                           className="input input-bordered input-primary input-sm w-16 max-w-xs text-black text-lg font-semibold bg-inherit"
//                         />
//                         {product.requiredQty > product.quantity && (
//                           <span className="pl-2 text-red-700 font-normal">
//                             Exceeds stock
//                           </span>
//                         )}
//                       </h1>
//                       <h1>
//                         Purchase total price: $
//                         {(product.price * product.requiredQty).toFixed(2)}
//                       </h1>
//                       <button
//                         onClick={() => handleRemoveProduct(product._id)}
//                         className="btn btn-sm btn-warning"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </motion.div>

//           <div className="flex flex-col mx-auto w-5/12 px-5 py-2 h-32 gap-5  justify-center my-10">
//             <h1 className="text-2xl text-black font-semibold text-center mb-3 underline">
//               Total price: ${totalPrice.toFixed(2)}
//             </h1>
//             <div className="text-center">
//               {isPlaceOrderDisabled && (
//                 <span className="text-red-700 font-normal">
//                   Adjust quantities to place the order
//                 </span>
//               )}
//             </div>
//             {totalPrice > 0 ? (
//               <button
//                 onClick={handlePlaceOrder}
//                 className="btn btn-primary"
//                 disabled={isPlaceOrderDisabled}
//               >
//                 Place Order
//               </button>
//             ) : (
//               <button className="btn btn-primary " disabled>
//                 Place Order
//               </button>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CartItemPage;
