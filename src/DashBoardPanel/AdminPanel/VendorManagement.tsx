import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { GrTransaction } from "react-icons/gr";
import { useGetAllVendorQuery } from "../../Redux/features/vendor/vendorApi";
import {
  useDeleteVendorMutation,
  useUpdateVendorMutation,
} from "../../Redux/features/produtcs/orderApi";
import { TShopName } from "../../types";

const VendorManagement = () => {
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [selectedBlock, setSelectedBlock] = useState("");

  const { data: vendor, refetch } = useGetAllVendorQuery(undefined);

  const [updateVendor] = useUpdateVendorMutation();
  const [deleteVendor] = useDeleteVendorMutation();

  const vendors = vendor?.data || [];

  //   const isBlocks = ["Yes", "No"];

  const handleEditVendor = (vendorId: string) => {
    const vendor = vendors.find((v: TShopName) => v.vendorId === vendorId);
    if (vendor) {
      setSelectedVendorId(vendorId);
      setSelectedVendor(vendor);
      setSelectedBlock(vendor.isBlock);

      const modal = document.getElementById(
        "editVendorModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const vendorModifyData = {
      isBlock: selectedBlock,
    };

    try {
      await updateVendor({
        vendorId: selectedVendorId,
        vendorData: vendorModifyData,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Vendor info updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      const modal = document.getElementById(
        "editVendorModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      refetch();
    } catch (error) {
      // handle error
    }
  };

  const handleSelectChangeIsBlock = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedBlock(selectedValue);
  };

  const handleDeleteVendor = (vendorId: string) => {
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
          await deleteVendor(vendorId).unwrap();
          Swal.fire("Deleted!", "The vendor has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was an issue deleting the vendor.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="container mx-auto ">
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">Vendor Management</h2>

        {/* Edit Modal */}
        <dialog id="editVendorModal" className="modal">
          <div className="modal-box bg-[#1A4870]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleEditFormSubmit}>
              <div className="flex justify-center pt-5 ">
                <h1 className="text-white text-3xl ">
                  {selectedVendorId ? "Edit Vendor" : "Add New Vendor"}
                </h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                {selectedVendorId && (
                  <div className="text-white text-center mb-4">
                    <p>Vendor ID: {selectedVendorId}</p>
                  </div>
                )}
                <div>
                  <label className="pr-16 text-white">Shop Name:</label>
                  <input
                    type="text"
                    name="shopName"
                    readOnly
                    defaultValue={selectedVendor?.shopName}
                    placeholder="Enter vendor shop name"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-16 text-white">Email:</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={selectedVendor?.email}
                    name="email"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>

                <div>
                  <label className="pr-16 text-white">Is Blocked:</label>
                  <select
                    value={selectedBlock}
                    onChange={handleSelectChangeIsBlock}
                    className="select select-bordered w-full max-w-xs bg-inherit text-white"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="flex justify-center my-5">
                  <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md justify-center w-full text-2xl pb-1 ">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
      </div>

      {/* table view */}
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full ">
          {/* head */}
          <thead className="text-black text-lg">
            <tr>
              <th>ShopName</th>
              <th>Email</th>
              <th>IsBlock?</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {vendor?.data.length === 0 ? (
              <div>sorry</div>
            ) : (
              vendor?.data.map((user: TShopName) => (
                <>
                  <tr key={user.userId} className="hover:bg-gray-300">
                    <td>
                      <div className="flex items-center gap-3  ">
                        <div className="avatar"></div>
                        <div>
                          <div className="font-semibold">{user.shopName}</div>
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
                        <div className="font-semibold">{user.isBlock}</div>
                      </div>
                    </td>

                    <th>
                      <div className="space-x-0">
                        <button
                          onClick={() => handleEditVendor(user.vendorId)}
                          className="btn btn-ghost btn-sm  "
                        >
                          <GrTransaction className="w-6 h-6 " />
                        </button>
                        <button
                          onClick={() => handleDeleteVendor(user.vendorId)}
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

export default VendorManagement;
