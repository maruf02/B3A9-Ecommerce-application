import { useState } from "react";

import Swal from "sweetalert2";
import { useCreateEmailMutation } from "../../Redux/features/vendor/vendorApi";

const NewsLetterSection = () => {
  const [email, setEmail] = useState("");
  const [createEmail, { isLoading }] = useCreateEmailMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
      });
      return;
    }

    try {
      await createEmail({ email }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "You have successfully subscribed to our newsletter.",
      });
      setEmail(""); // Clear the input field
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: error?.data?.message || "Something went wrong. Please try again!",
      });
    }
  };

  return (
    <div className="mx-12 my-5 bg-[#DDF1F5] rounded-lg card shadow-xl">
      <div className="w-full h-32 flex justify-between items-center">
        <div className="px-5">
          <h1 className="text-xl">
            100% Natural Quality Organic Product See Our latest discounted
          </h1>
          <p>Products from here and get a special discount product</p>
        </div>

        <div className="text-xl lg:text-3xl font-semibold text-black mr-10">
          <form onSubmit={handleSubscribe}>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type here"
                required
                className="input input-bordered input-primary w-80 max-w-6xl bg-white"
              />
              <button
                className={`btn btn-primary ml-2 ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
