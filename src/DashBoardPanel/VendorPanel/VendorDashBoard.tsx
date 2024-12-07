import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  useAddShopNameMutation,
  useGetVendorByEmailQuery,
} from "../../Redux/features/vendor/vendorApi";
import Swal from "sweetalert2";

interface User {
  userId: string;
  email: string;
  role: string;
}
const VendorDashBoard = () => {
  const user =
    (useSelector((state: RootState) => state.auth.user) as User) || null; // get user info from redux token

  const { email } = user;
  const { data: vendorData, refetch: vendorRefetch } = useGetVendorByEmailQuery(
    email as string
  );
  const [addShopName] = useAddShopNameMutation();
  console.log(vendorData);
  const handleAddShopname = async (event: any) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const shopName = form.shopName.value;
    const email = user.email;
    const userId = user.userId;
    if (!email || !userId) {
      Swal.fire("Error", "User is not authenticated.", "error");
      return;
    }
    const shopData = { shopName };
    // console.log(shopData);
    try {
      await addShopName(shopData).unwrap();
      // console.log("Product added:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      vendorRefetch();
    } catch (error) {
      console.error("Failed to add product:", error);
      Swal.fire(
        "Error",
        // error?.data?.message || "Failed to add shop name",
        "Failed to add shop name",
        "error"
      );
    }
  };

  return (
    <div className="border border-2 border-red-600 w-full h-full min-h-screen text-center align-middle">
      {vendorData ? (
        <div className="place-content-center">
          Shop Name:{vendorData.data.shopName}
        </div>
      ) : (
        <div className="place-content-center">
          <div>
            <form onSubmit={handleAddShopname}>
              <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                Shop Name
              </label>
              <div className="mb-4">
                <input
                  type="text"
                  name="shopName"
                  required
                  className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                  placeholder="Enter Your Shop Name"
                />
              </div>
              <div className="flex justify-center my-5  ">
                <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashBoard;
