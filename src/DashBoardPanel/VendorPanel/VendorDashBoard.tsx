import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  useAddShopNameMutation,
  useGetVendorByEmailQuery,
  useUpdateShopNameMutation,
} from "../../Redux/features/vendor/vendorApi";
import Swal from "sweetalert2";
import { useState } from "react";
import { useLoginMutation } from "../../Redux/features/auth/authApi";
import {
  useChangePasswordMutation,
  useGetUserByUserIdQuery,
  useUpdateUserMutation,
} from "../../Redux/user/userApi";
import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "../../shared/UploadImageToCloudinary";
import { useGetfollowerByVendorIdQuery } from "../../Redux/features/produtcs/orderApi";

interface User {
  userId: string;
  email: string;
  role: string;
}
const VendorDashBoard = () => {
  const userDataToken =
    (useSelector((state: RootState) => state.auth.user) as User) || null; // get user info from redux token
  const { userId, email } = userDataToken;
  const { data: vendorData, refetch: vendorRefetch } = useGetVendorByEmailQuery(
    email as string
  );
  const { vendorId, shopName } = vendorData?.data || {};
  const { data: userData, refetch: userRefetch } =
    useGetUserByUserIdQuery(userId);
  const { data: followerData } = useGetfollowerByVendorIdQuery(vendorId);
  const [updateUserById] = useUpdateUserMutation();
  const [updateShopNameByEmail] = useUpdateShopNameMutation();
  const [addShopName] = useAddShopNameMutation();

  // *****************************
  const [loginUser] = useLoginMutation();
  const [updatePassword] = useChangePasswordMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFollowerModalOpen, setFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isConfirmPasswordModalOpen, setConfirmPasswordModalOpen] =
    useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  console.log("userData", userData);
  const { register, handleSubmit, setValue } = useForm();
  // *****************************

  const handleAddShopname = async (event: any) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const shopName = form.shopName.value;
    const email = userDataToken.email;
    const userId = userDataToken.userId;

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

  // ************************************
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleImageUpload = async () => {
    const profileImageUrl = profileImageFile
      ? await uploadImageToCloudinary(profileImageFile)
      : vendorData?.data?.image;
    console.log("profileImageUrl", profileImageUrl);
    return { profileImageUrl };
  };

  const onSubmit = async (data: TUser) => {
    const { profileImageUrl } = await handleImageUpload();

    const newUserData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    const newShopName = {
      shopName: data.shopName,
      image: profileImageUrl,
    };

    console.log("updateinfo", newUserData, newShopName, userId, vendorId);

    console.log("Updated User Data:", newUserData);

    await updateUserById({
      userId: userId,
      userModifyData: newUserData,
    }).unwrap();
    await updateShopNameByEmail({
      shopId: vendorId,
      shopModifyData: newShopName,
    });
    vendorRefetch();
    userRefetch();
    closeModal();
    Swal.fire("updated");
  };

  const openFollowerModal = () => setFollowerModalOpen(true);
  const closeFollowerModal = () => setFollowerModalOpen(false);
  const openFollowingModal = () => setFollowingModalOpen(true);
  const closeFollowingModal = () => setFollowingModalOpen(false);

  // password portiom
  const openPasswordModal = () => setPasswordModalOpen(true);
  const closePasswordModal = () => setPasswordModalOpen(false);
  const openConfirmPasswordModal = () => setConfirmPasswordModalOpen(true);
  const closeConfirmPasswordModal = () => setConfirmPasswordModalOpen(false);

  const handlePasswordCheck = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const userInfo = { email, password };
    console.log("userInfo", userInfo);

    try {
      const res = await loginUser(userInfo).unwrap();
      if (res.success) {
        Swal.fire("password match");
        closePasswordModal();
        openConfirmPasswordModal();
      }
      console.log("res", res);
    } catch (err) {
      const error = err as any;
      if (error.data?.message) {
        // console.error("Login error:", err.data.message);
        Swal.fire("Error", error.data.message as string, "error");
      } else {
        // console.error("Login error:", err);
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }

    // closePasswordModal();
    // openConfirmPasswordModal();
  };

  const handlePassChange = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;

    const userInfo = { email, oldPassword, newPassword };
    console.log("User Info:", userInfo);

    try {
      const res = await updatePassword(userInfo).unwrap();
      if (res.success) {
        Swal.fire("Success", "Password updated successfully!", "success");
        setConfirmPasswordModalOpen(false);
      }
    } catch (error) {
      console.error("Password change error:", error);
      Swal.fire("Error", "Failed to update password.", "error");
    }
  };
  // ************************************

  return (
    <div className=" w-full h-full min-h-screen text-center align-middle">
      <div>
        {vendorData ? (
          <div className="place-content-center text-4xl font-bold py-3 underline">
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
      {/* view shop details portion */}
      {vendorData && (
        <div className=" w-full h-full min-h-72 flex items-center justify-center">
          {/* view shop details portion */}
          <div className=" w-3/4 text-black  max-w-2xl shadow-xl mx-auto">
            <div className="card-body">
              <h2 className="card-title">
                Shop Name: {vendorData?.data?.shopName || "Name not available"}
              </h2>
              <h2 className="card-title">
                Shop owner Name: {userData?.data?.name || "Name not available"}
              </h2>
              <h2 className="card-title">
                Email: {userData?.data?.email || "Email not available"}
              </h2>
              <h2 className="card-title">
                Phone: {userData?.data?.phone || "Phone not available"}
              </h2>
              <h2 className="card-title">
                Total Followers: {followerData?.data?.length || 0}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={openFollowerModal}
                >
                  see all followers
                </button>
              </h2>

              <h1 className="card-title">
                Change Password:{" "}
                <button
                  onClick={openPasswordModal}
                  className="btn btn-sm btn-primary"
                >
                  Change password
                </button>
              </h1>
              {/* change password modal option */}
              {isPasswordModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 ">
                  <form onSubmit={handlePasswordCheck}>
                    <div className="bg-[#B7B7B7] rounded-lg p-6 w-96 border border-2 border-primary">
                      <h2 className="text-2xl font-bold mb-4">
                        Enter New Password
                      </h2>
                      <div>
                        <label>Email</label>
                        <input
                          type="text"
                          name="email"
                          readOnly
                          defaultValue={userData?.data?.email}
                          className="input input-bordered max-w-xl mb-4 input-sm input-primary bg-white text-black ml-20"
                        />
                      </div>
                      <div>
                        <label>Current Password:</label>
                        <input
                          type="password"
                          name="password"
                          className="input input-bordered input-sm input-primary max-w-xl mb-4 bg-white text-black ml-2"
                          required
                        />
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={closePasswordModal}
                          className="mr-4 px-4 py-2 bg-gray-300 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          // onClick={() => {
                          //   closePasswordModal();
                          //   openConfirmPasswordModal(); // Open second modal
                          // }}
                          // onClick={handlePasswordCheck}
                          className="px-4 py-2 bg-primary text-white rounded-lg"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {isConfirmPasswordModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <form onSubmit={handlePassChange}>
                    <div className="bg-[#B7B7B7] rounded-lg p-6 w-96 border border-2 border-primary">
                      <h2 className="text-2xl font-bold mb-4 text-black">
                        Update Password
                      </h2>
                      <div>
                        <label className="text-black">Email</label>
                        <input
                          type="text"
                          name="email"
                          readOnly
                          defaultValue={userData?.data?.email}
                          className="input input-bordered max-w-xl mb-4 input-sm input-primary bg-white text-black ml-20"
                        />
                      </div>
                      <div>
                        <label>old Password:</label>
                        <input
                          type="password"
                          name="oldPassword"
                          className="input input-bordered max-w-xl mb-4 input-sm input-primary bg-white text-black ml-6"
                          required
                        />
                      </div>
                      <div>
                        <label>New Password:</label>
                        <input
                          type="password"
                          name="newPassword"
                          className="input input-bordered max-w-xl mb-4 input-sm input-primary bg-white text-black ml-6"
                          required
                        />
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={closeConfirmPasswordModal}
                          className="mr-4 px-4 py-2 bg-gray-300 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg">
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {/* change password modal option */}
              <img
                src={
                  vendorData?.data?.image || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
            </div>
            <button
              onClick={openModal}
              className="w-full h-10 my-5 bg-primary rounded-lg"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {/* Simple Modal  update all info portion*/}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-80">
          <div className="bg-[#B7B7B7] rounded-lg p-6 w-96 border border-2 border-primary">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Update Profile
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="text-black">
              <div>
                <label>Shop Name:</label>
                <input
                  type="text"
                  {...register("shopName", { required: true })}
                  className="input input-bordered input-sm input-primary max-w-xl mb-4 bg-white text-black ml-2"
                  // readOnly
                  defaultValue={vendorData.data.shopName}
                />
              </div>
              <div>
                <label>Owner Name:</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered input-sm input-primary max-w-xl mb-4 bg-white text-black ml-2"
                  defaultValue={userData?.data?.name}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  {...register("email")}
                  className="input input-bordered input-sm input-primary ml-4 max-w-xl mb-4 bg-white text-black"
                  readOnly
                  defaultValue={userData?.data?.email || ""}
                />
              </div>

              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  className="input input-bordered input-sm input-primary max-w-xl mb-4 bg-white text-black ml-2"
                  defaultValue={userData?.data?.phone || "dfd"}
                />
              </div>
              <div>
                <label>Profile Image:</label>
                <input
                  type="file"
                  // onChange={(e) => setProfileImageFile(e.target.files[0])}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setProfileImageFile(file);
                  }}
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="mr-4 px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn px-4 py-2 bg-primary text-black hover:bg-gray-300 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isFollowerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#B7B7B7] rounded-lg p-6 w-96 border border-2 border-primary">
            <h2 className="text-2xl font-bold mb-4 text-black">Followers</h2>
            <div className="space-y-4 text-black">
              {followerData?.data?.length ? (
                followerData.data.map((follower: TUser) => (
                  <div
                    key={follower.followId}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={
                        follower.user.image || "https://via.placeholder.com/50"
                      }
                      alt="Follower Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{follower.user.name || "Unknown"}</span>
                  </div>
                ))
              ) : (
                <p>No followers found.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeFollowerModal}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isFollowingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#B7B7B7] rounded-lg p-6 w-96 border border-2 border-primary">
            <h2 className="text-2xl font-bold mb-4 text-black">Following</h2>
            <div className="space-y-4 text-black">
              {userData?.data?.followingP?.length ? (
                userData.data.followingP.map((following: TUser) => (
                  <div
                    key={following._id}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={
                        following.profileImage ||
                        "https://via.placeholder.com/50"
                      }
                      alt="Following Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{following.name || "Unknown"}</span>
                  </div>
                ))
              ) : (
                <p>No following found.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeFollowingModal}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashBoard;
