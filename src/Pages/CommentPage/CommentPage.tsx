import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { RootState } from "../../Redux/store";

import StarRatings from "react-star-ratings";
import { useGetUserEmailQuery } from "../../Redux/user/userApi";
import { useCreateCommentMutation } from "../../Redux/features/produtcs/orderApi";
import { clearOrderData } from "../../Redux/features/CartItem/placeOrderSlice";
import { clearCart } from "../../Redux/features/CartItem/cartSlice";

const CommentPage = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Record<string, string>>({});

  const [remainingProducts, setRemainingProducts] = useState(
    useSelector((state: RootState) => state.order.orderData?.items || [])
  );
  const orderData = useSelector((state: RootState) => state.order.orderData);
  const userEmail = orderData?.user?.email || "";
  // const user = orderData?.user || [];
  const { data: userData } = useGetUserEmailQuery(userEmail || "");
  const [createComment] = useCreateCommentMutation();
  const userId = orderData?.user?.userId || "";
  const userName = userData?.data?.name || "";
  const vendorId = orderData?.vendor?.vendorId || "";
  // const vendorEmail = orderData?.vendor?.email || "";
  // const shopName = orderData?.vendor?.shopName || "";

  // const totalItems = orderData?.totalItems || 0;

  // const items = orderData?.items || [];
  // const userInfo = userData?.data || [];

  // const products = orderData?.items || [];
  const totalPrice = orderData?.totalPrice || 0;

  const handleComment = async (event: React.FormEvent, productId: string) => {
    event.preventDefault();
    // const form = event.target as HTMLFormElement;
    const comment = comments[productId] || "";
    if (!comment) {
      Swal.fire({
        icon: "error",
        title: "Comment is required!",
        text: "Please enter your comment.",
      });
      return;
    }
    if (!rating) {
      Swal.fire({
        icon: "error",
        title: "Rating is required!",
        text: "Please provide a rating.",
      });
      return;
    }

    // Handle the comment submission here
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: `Your comment for product ID: ${productId} has been saved.`,
    });

    const commentData = {
      userId,
      userEmail,
      userName,
      productId,
      vendorId,
      comment,
      rating,
    };
    try {
      await createComment(commentData).unwrap();

      // Remove commented product from the list
      setRemainingProducts((prev) =>
        prev.filter((product) => product.productId !== productId)
      );
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: `Your comment for product ID: ${productId} has been saved.`,
      });

      // Clear cart and order data if all products are commented
      if (remainingProducts.length === 1) {
        dispatch(clearOrderData());
        dispatch(clearCart());
        setComments({});
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit your comment. Please try again later.",
      });
    }
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    productId: string
  ) => {
    setComments((prev) => ({
      ...prev,
      [productId]: event.target.value,
    }));
  };

  return (
    <div className="w-full h-full min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div>
          <h2 className="text-2xl text-black font-semibold text-center pb-5 flex justify-center gap-10">
            <span className="underline"> Saved Products: </span>
            <span className="pl-5 ">Total Price:(${totalPrice})</span>
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-row flex-wrap">
              {totalPrice === 0 ? (
                <div className="text-green-600 text-4xl font-semibold mx-auto">
                  Empty Cart. Please add Product For Purchase!!
                </div>
              ) : (
                remainingProducts.map((product) => (
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
                      </div>
                      <div className="align-middle">
                        <h1 className="flex flex-row align-middle text-xl">
                          <span className="pr-2">
                            Purchase Qty: {product.requiredQty}
                          </span>
                        </h1>
                        <h1 className="text-xl">
                          Purchase total price: $
                          {(product.price * product.requiredQty).toFixed(2)}
                        </h1>
                      </div>
                    </div>
                    <div className="">
                      <h1 className="text-xl">Share your experience:</h1>
                      <div>
                        <form
                          onSubmit={(e) => handleComment(e, product.productId)}
                        >
                          <div className="flex flex-row gap-2 justify-center align-middle">
                            <div>
                              <label className=" text-black px-2">
                                Ratings:
                              </label>
                              <StarRatings
                                rating={rating}
                                starRatedColor="#f39c12"
                                starHoverColor="#f39c12"
                                changeRating={setRating}
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                                name="rating"
                              />
                            </div>
                            <div className="flex flex-row gap-2">
                              <label className="px-2 text-black">
                                Comment:
                              </label>
                              <textarea
                                name="description"
                                className="textarea textarea-bordered   min-w-full   bg-gray-400  text-black"
                                placeholder="Enter your comment"
                                value={comments[product.productId] || ""}
                                onChange={(e) =>
                                  handleInputChange(e, product.productId)
                                }
                              ></textarea>
                            </div>
                          </div>
                          <div className="w-full flex flex-row justify-center my-5">
                            <button className="w-1/3 btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md  mx-5 text-black ">
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
          <Link to="/products">
            <div className="flex flex-col mx-auto w-5/12 px-5 py-2 h-32 gap-5  justify-center my-10 ">
              <button className="btn btn-primary">Back to Products page</button>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CommentPage;
