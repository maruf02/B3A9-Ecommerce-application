import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { useState } from "react";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponQuery,
  useGetVendorByEmailQuery,
  useUpdateCouponMutation,
} from "../../../Redux/features/vendor/vendorApi";
import { TCoupon, TUser } from "../../../types";
import { RootState } from "../../../Redux/store";
import { useSelector } from "react-redux";

const CouponManagement = () => {
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<TCoupon | null>(null);
  const { data: couponData, refetch } = useGetAllCouponQuery(undefined);
  const [addCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const coupons = couponData?.data || [];
  console.log("coupons", coupons);

  const userDataToken =
    (useSelector((state: RootState) => state.auth.user) as TUser) || null; // get user info from redux token
  const { email } = userDataToken;
  const { data: vendorData } = useGetVendorByEmailQuery(email as string);
  const { vendorId } = vendorData?.data || {};

  const handleAddCoupon = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const couponCode = form.couponCode.value;
    const discountAmount = parseInt(form.discountAmount.value, 10);
    const startedDate = form.startedDate.value;
    const endDate = form.endDate.value;

    const CouponData = {
      vendorId,
      couponCode,
      discountAmount,
      startedDate,
      endDate,
    };
    console.log("CouponData", CouponData);
    try {
      await addCoupon(CouponData).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Coupon added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      const modal = document.getElementById(
        "AddCouponModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      refetch();
    } catch (error) {
      Swal.fire("Error!", "Failed to add coupon.", "error");
    }
  };

  const handleEditCoupon = (couponId: string) => {
    setSelectedCouponId(couponId);
    const modal = document.getElementById(
      "editCouponModal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
    const coupon = coupons.find((c: TCoupon) => c.couponId === couponId);
    if (coupon) {
      setSelectedCoupon(coupon);
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const couponCode = form.couponCode.value;
    const discountAmount = parseInt(form.discountAmount.value, 10);
    const startedDate = form.startedDate.value;
    const endDate = form.endDate.value;

    const updateData = {
      couponCode,
      discountAmount,
      startedDate,
      endDate,
    };
    console.log(updateData);
    try {
      await updateCoupon({
        CouponId: selectedCouponId,
        updateData,
      }).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Coupon updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      const modal = document.getElementById(
        "editCouponModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update coupon.", "error");
    }
  };

  const handleDeleteCoupon = (couponId: string) => {
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
          await deleteCoupon(couponId).unwrap();
          Swal.fire("Deleted!", "Coupon has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire("Error!", "Failed to delete coupon.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">Coupon Management</h2>

        <button
          onClick={() => {
            const modal = document.getElementById(
              "AddCouponModal"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          className="flex text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-md justify-between"
        >
          <IoAddCircleOutline className="w-6 h-7" />
          <span>Add Coupon</span>
        </button>
        <dialog id="AddCouponModal" className="modal">
          <div className="modal-box bg-[#1A4870]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleAddCoupon}>
              <h1 className="text-white text-3xl text-center">
                Add New Coupon
              </h1>
              <p className="border border-1 border-gray-400 my-3"></p>
              <div className="flex flex-col gap-2">
                <label className="pr-12 text-white">Coupon Code:</label>
                <input
                  type="text"
                  name="couponCode"
                  placeholder="Enter coupon code"
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <label className="pr-12 text-white">Discount Amount:</label>
                <input
                  type="number"
                  name="discountAmount"
                  placeholder="Enter discount amount"
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <label className="pr-12 text-white">Start Date:</label>
                <input
                  type="date"
                  name="startedDate"
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <label className="pr-12 text-white">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md w-full justify-center text-2xl pb-1">
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <dialog id="editCouponModal" className="modal">
          <div className="modal-box bg-[#1A4870]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleEditFormSubmit}>
              <h1 className="text-white text-3xl text-center">Edit Coupon</h1>
              <p className="border border-1 border-gray-400 my-3"></p>
              <div className="flex flex-col gap-2">
                {selectedCouponId && (
                  <div className="text-white text-center mb-4">
                    <p>Coupon ID: {selectedCouponId}</p>
                  </div>
                )}
                <label className="pr-12 text-white">Coupon Code:</label>
                <input
                  type="text"
                  name="couponCode"
                  defaultValue={selectedCoupon?.couponCode}
                  placeholder="Enter coupon code"
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <label className="pr-12 text-white">Discount Amount:</label>
                <input
                  type="number"
                  name="discountAmount"
                  defaultValue={selectedCoupon?.discountAmount}
                  placeholder="Enter discount amount"
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <label className="pr-12 text-white">Start Date:</label>
                <input
                  type="date"
                  name="startedDate"
                  defaultValue={selectedCoupon?.startedDate}
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <label className="pr-12 text-white">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  defaultValue={selectedCoupon?.endDate}
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md w-full justify-center text-2xl pb-1">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full">
          <thead className="text-black text-lg">
            <tr>
              <th>Coupon Code</th>
              <th>Discount Amount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <p className="text-green-500 text-2xl font-semibold ">
                    Sorry, No Coupons found!! Please Add Coupons
                  </p>
                </td>
              </tr>
            ) : (
              coupons.map((coupon: TCoupon) => (
                <tr key={coupon.couponId} className="hover:bg-gray-300">
                  <td>{coupon.couponCode}</td>
                  <td>{coupon.discountAmount}</td>
                  <td>{coupon.startedDate}</td>
                  <td>{coupon.endDate}</td>
                  <td>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditCoupon(coupon.couponId)}
                        className="btn btn-ghost btn-sm"
                      >
                        <FaEdit className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon.couponId)}
                        className="btn btn-ghost btn-sm"
                      >
                        <MdDeleteForever className="w-6 h-6 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponManagement;
