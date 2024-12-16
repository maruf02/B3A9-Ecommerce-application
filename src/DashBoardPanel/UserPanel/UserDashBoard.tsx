import { useSelector } from "react-redux";

import { RootState } from "../../Redux/store";
import { TUser } from "../../types";
import {
  useChangePasswordMutation,
  useGetUserByUserIdQuery,
  useUpdateUserMutation,
} from "../../Redux/user/userApi";
import Swal from "sweetalert2";
import { useState } from "react";
import { useLoginMutation } from "../../Redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "../../shared/UploadImageToCloudinary";

interface FormData {
  shopName: string;
  name: string;
  email: string;
  phone: string;
}

const UserDashBoard = () => {
  const userDataToken =
    (useSelector((state: RootState) => state.auth.user) as TUser) || null;
  const { userId } = userDataToken;

  const { data: userData, refetch: userRefetch } =
    useGetUserByUserIdQuery(userId);
  const [updateUserById] = useUpdateUserMutation();
  const [loginUser] = useLoginMutation();
  const [updatePassword] = useChangePasswordMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isConfirmPasswordModalOpen, setConfirmPasswordModalOpen] =
    useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const { register, handleSubmit } = useForm<FormData>();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openPasswordModal = () => setPasswordModalOpen(true);
  const closePasswordModal = () => setPasswordModalOpen(false);
  const openConfirmPasswordModal = () => setConfirmPasswordModalOpen(true);
  const closeConfirmPasswordModal = () => setConfirmPasswordModalOpen(false);

  const handleImageUpload = async () => {
    const profileImageUrl = profileImageFile
      ? await uploadImageToCloudinary(profileImageFile)
      : userData?.data?.image;
    return { profileImageUrl };
  };

  const onSubmit = async (data: FormData) => {
    const { profileImageUrl } = await handleImageUpload();

    const newUserData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: profileImageUrl, // Ensure this is sent for the profile image update
    };

    await updateUserById({
      userId: userId,
      userModifyData: newUserData,
    }).unwrap();

    userRefetch();
    closeModal();
    Swal.fire("Updated!");
  };

  const handlePasswordCheck = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const userInfo = { email, password };

    try {
      const res = await loginUser(userInfo).unwrap();
      if (res.success) {
        Swal.fire("Password match");
        closePasswordModal();
        openConfirmPasswordModal();
      }
    } catch (err: any) {
      const error = err;
      if (error.data?.message) {
        Swal.fire("Error", error.data.message as string, "error");
      } else {
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }
  };

  const handlePassChange = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;

    const userInfo = { email, oldPassword, newPassword };

    try {
      const res = await updatePassword(userInfo).unwrap();
      if (res.success) {
        Swal.fire("Success", "Password updated successfully!", "success");
        setConfirmPasswordModalOpen(false);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update password.", "error");
    }
  };

  return (
    <div className="w-full h-full min-h-screen text-center align-middle">
      {/* User Details */}
      {userData && (
        <div className="w-full h-full min-h-72 flex items-center justify-center">
          <div className="w-3/4 text-black max-w-2xl shadow-xl mx-auto">
            <div className="card-body">
              <h2 className="card-title">
                Name: {userData?.data?.name || "Name not available"}
              </h2>
              <h2 className="card-title">
                Email: {userData?.data?.email || "Email not available"}
              </h2>
              <h2 className="card-title">
                Phone: {userData?.data?.phone || "Phone not available"}
              </h2>

              <h1 className="card-title">
                Change Password:
                <button
                  onClick={openPasswordModal}
                  className="btn btn-sm btn-primary"
                >
                  Change password
                </button>
              </h1>

              {/* Change password modal */}
              {isPasswordModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                  <form onSubmit={handlePasswordCheck}>
                    <div className="bg-[#B7B7B7] rounded-lg p-6 w-96 border border-2 border-primary">
                      <h2 className="text-2xl font-bold mb-4">
                        Enter Current Password
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
                          type="submit"
                          className="px-4 py-2 bg-primary text-white rounded-lg"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Confirm password modal */}
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
                        <label>Old Password:</label>
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
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white rounded-lg"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <img
                src={userData?.data?.image || "https://via.placeholder.com/150"}
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

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-80">
          <div className="bg-[#B7B7B7] rounded-lg p-6 w-96 border border-2 border-primary">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Update Profile
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="text-black">
              <div>
                <label>Name:</label>
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
                  defaultValue={userData?.data?.phone || ""}
                />
              </div>
              <div>
                <label>Profile Image:</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setProfileImageFile(e.target.files?.[0] || null)
                  }
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
    </div>
  );
};

export default UserDashBoard;
