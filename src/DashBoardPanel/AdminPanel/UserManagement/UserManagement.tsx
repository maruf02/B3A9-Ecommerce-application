import { IoAddCircleOutline } from "react-icons/io5";

import Swal from "sweetalert2";

import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { GrTransaction } from "react-icons/gr";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../Redux/user/userApi";
import { useDeleteCategoryMutation } from "../../../Redux/features/produtcs/productsApi";

const UserManagement = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");

  // console.log("selectedUser", selectedUser);
  const { data: user, refetch } = useGetAllUserQuery(undefined);
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = user?.data || [];
  console.log("object", users);

  const roles = ["ADMIN", "VENDOR", "USER"];
  const isBlocks = ["Yes", "No"];

  const handleAddUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.nameT.value;
    const email = form.email.value;
    const image = form.image.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const role = selectedRole;
    const isBlock = selectedBlock;

    const userData = {
      name,
      email,
      password: "password1234",
      image,
      phone,
      address,
      role,
      isBlock,
    };
    console.log("productData", userData);

    try {
      await addUser(userData).unwrap();
      // console.log("Product added:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      const modal = document.getElementById(
        "AddProductModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      refetch();
    } catch (error) {
      // console.error("Failed to add product:", error);
    }
  };

  const handleEditUser = (userId: string) => {
    const user = users.find((p: any) => p.userId === userId);
    if (user) {
      setSelectedUserId(userId);
      setSelectedUser(user);
      setSelectedRole(user.role);
      setSelectedBlock(user.isBlock);

      const modal = document.getElementById(
        "editProductModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.nameT.value;
    const email = form.email.value;
    const image = form.image.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const userModifyData = {
      name,
      email,
      // password: "password1234",
      image,
      phone,
      address,
      role: selectedRole,
      isBlock: selectedBlock,
    };
    console.log("userModifyData", userModifyData);
    // console.log("Product ID:", selectedProductId);
    // console.log("Product Data:", productModifyData);

    // console.log("Product ID:", selectedProductId);
    // console.log("Product Data:", productModifyData);

    try {
      await updateUser({
        userId: selectedUserId,
        userModifyData,
      });
      // console.log("Product updated:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Updated Product info",
        showConfirmButton: false,
        timer: 1500,
      });

      const modal = document.getElementById(
        "editProductModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      refetch();
    } catch (error) {
      // console.error("Failed to update product:", error);
    }
  };
  const handleSelectChangeRole = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedRole(selectedValue);
  };
  const handleSelectChangeIsBlock = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedBlock(selectedValue);
  };

  // console.log(selectedProductId);

  const handleDeleteUser = (userId: string) => {
    console.log(userId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId).unwrap();
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          refetch();
        } catch (error) {
          // console.error("Failed to delete product:", error);
          Swal.fire(
            "Error!",
            "There was an issue deleting the product.",
            "error"
          );
        }
      }
    });
  };
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">User Management</h2>

        <button
          onClick={() => {
            const modal = document.getElementById(
              "AddProductModal"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          className="flex text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-md justify-between  "
        >
          <span>
            <IoAddCircleOutline className="w-6 h-7" />
          </span>
          <span>Add User</span>
        </button>
        <dialog id="AddProductModal" className="modal  ">
          <div className="modal-box bg-[#1A4870]  ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {/* add car form */}
            <form onSubmit={handleAddUser}>
              <div className="flex justify-center pt-5 ">
                <h1 className="text-white text-3xl ">Add New User</h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="pr-16 text-white">Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    required
                    placeholder="Enter user name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-16 text-white"> Email:</label>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="Enter user email  "
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                  <label className="pr-16 text-white py-3">
                    Password:{" "}
                    <span className="pl-10 text-white text-xl font-bold">
                      [password1234 (default)]
                    </span>
                  </label>
                </div>
                <div>
                  <label className="pr-3 text-white">Image(Optional):</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Enter image Link (Link only)"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-16 text-white">Phone: </label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter user phone number"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>

                <div>
                  <label className="pr-16 text-white">Role:</label>
                  <select
                    onChange={handleSelectChangeRole}
                    value={selectedRole || ""}
                    required
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-10 text-white">IsBlock?:</label>
                  <select
                    onChange={handleSelectChangeIsBlock}
                    value={selectedBlock || ""}
                    required
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Block Status
                    </option>
                    {isBlocks.map((block, index) => (
                      <option key={index} value={block}>
                        {block}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-row align-middle">
                  <label className="pr-6  text-white">Address:</label>
                  <textarea
                    name="address"
                    required
                    className="textarea textarea-bordered w-full max-w-sm bg-[#1A4870] text-white"
                    placeholder="address"
                  ></textarea>
                </div>
                <div className="flex justify-center my-5  ">
                  <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                    Save
                  </button>
                </div>
              </div>
            </form>
            {/* add car form */}
          </div>
        </dialog>
        {/* edit modal */}
        <dialog id="editProductModal" className="modal">
          <div className="modal-box bg-[#1A4870]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleEditFormSubmit}>
              <div className="flex justify-center pt-5 ">
                <h1 className="text-white text-3xl ">
                  {selectedUserId ? "Edit User" : "Add New User"}
                </h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                {selectedUserId && (
                  <div className="text-white text-center mb-4">
                    <p>User ID: {selectedUserId}</p>
                  </div>
                )}
                <div>
                  <label className="pr-16 text-white">Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    defaultValue={selectedUser?.name}
                    placeholder="Enter user name"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-16 text-white">Email:</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={selectedUser?.email}
                    name="email"
                    placeholder="Enter user email"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Image(Optional):</label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={selectedUser?.image}
                    placeholder="Enter image Link (Link only)"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-16 text-white">Phone:</label>
                  <input
                    type="number"
                    defaultValue={selectedUser?.phone}
                    name="phone"
                    placeholder="Enter user phone number"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-16 text-white">Role:</label>
                  <select
                    onChange={handleSelectChangeRole}
                    value={selectedRole || selectedUser?.role || ""}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-10 text-white">IsBlock?:</label>
                  <select
                    onChange={handleSelectChangeIsBlock}
                    value={selectedBlock || selectedUser?.isBlock || ""}
                    // defaultValue={selectedCar?.color}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Block Status
                    </option>
                    {isBlocks.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-row align-middle">
                  <label className="pr-12  text-white">Address:</label>
                  <textarea
                    name="address"
                    defaultValue={selectedUser?.address}
                    className="textarea textarea-bordered w-full max-w-xs bg-[#1A4870] text-white"
                    placeholder="address"
                  ></textarea>
                </div>
                <div className="flex justify-center my-5  ">
                  <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
        {/* edit modal */}
      </div>
      {/* table view */}
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full ">
          {/* head */}
          <thead className="text-black text-lg">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Address</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.length === 0 ? (
              <div>sorry</div>
            ) : (
              users.map((user: any) => (
                <>
                  <tr key={user.userId} className="hover:bg-gray-300">
                    <td>
                      <div className="flex items-center gap-3  ">
                        <div className="avatar">
                          {/* <div className="mask mask-squircle h-12 w-12">
                            {user?.image.includes(".co") ? (
                              <>
                                <img
                                  src={user.image}
                                  alt="Avatar Tailwind CSS Component"
                                  className="w-full h-full"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  // src={user.image}
                                  src="https://i.ibb.co/PrtzmM1/avator.png"
                                  alt="Avatar Tailwind CSS Component"
                                  className="w-full h-full"
                                />
                              </>
                            )}
                          </div> */}
                        </div>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{user.email}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{user.role}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{user.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{user.address}</div>
                      </div>
                    </td>
                    <th>
                      <div className="space-x-0">
                        <button
                          onClick={() => handleEditUser(user.userId)}
                          className="btn btn-ghost btn-sm  "
                        >
                          <GrTransaction className="w-6 h-6 " />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.userId)}
                          className="btn btn-ghost btn-sm"
                        >
                          <MdDeleteForever className="w-6 h-6 text-red-700 " />
                        </button>
                      </div>
                    </th>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* table view */}
    </div>
  );
};

export default UserManagement;
