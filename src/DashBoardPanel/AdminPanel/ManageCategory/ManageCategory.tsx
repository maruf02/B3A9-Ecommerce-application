import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../Redux/features/produtcs/productsApi";
import { useState } from "react";

const ManageCategory = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const { data: categoryData, refetch } = useGetAllCategoryQuery(undefined);
  const [addCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = categoryData?.data || [];

  const handleAddCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const categoryName = form.categoryName.value;
    const mimage = form.Mimage.files[0];

    let mimageUrl; // Use existing image URL if no new image is uploaded

    if (mimage) {
      const formData = new FormData();
      formData.append("file", mimage);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        mimageUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    const newCategory = {
      categoryName: categoryName,
      categoryImage: mimageUrl,
    };

    try {
      await addCategory(newCategory).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      const modal = document.getElementById(
        "AddCategoryModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      refetch();
    } catch (error) {
      Swal.fire("Error!", "Failed to add category.", "error");
    }
  };

  const handleEditCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const modal = document.getElementById(
      "editCategoryModal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
    const category = categories.find((c: any) => c.categoryId === categoryId);
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const categoryName = form.categoryName.value;
    const mimage = form.Mimage.files[0];

    let mimageUrl; // Use existing image URL if no new image is uploaded

    if (mimage) {
      const formData = new FormData();
      formData.append("file", mimage);
      formData.append("upload_preset", "frontend_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dnsqmhk8i/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        mimageUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    const updatedCategory = {
      categoryName: categoryName,
      categoryImage: mimageUrl,
    };

    try {
      await updateCategory({
        categoryId: selectedCategoryId,
        categoryModifyData: updatedCategory,
      }).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      const modal = document.getElementById(
        "editCategoryModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update category.", "error");
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log(categoryId);
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
          await deleteCategory(categoryId).unwrap();
          Swal.fire("Deleted!", "Category has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire("Error!", "Failed to delete category.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">
          Category Management
        </h2>

        <button
          onClick={() => {
            const modal = document.getElementById(
              "AddCategoryModal"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          className="flex text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-md justify-between"
        >
          <IoAddCircleOutline className="w-6 h-7" />
          <span>Add Category</span>
        </button>
        <dialog id="AddCategoryModal" className="modal">
          <div className="modal-box bg-[#1A4870]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleAddCategory}>
              <h1 className="text-white text-3xl text-center">
                Add New Category
              </h1>
              <p className="border border-1 border-gray-400 my-3"></p>
              <div className="flex flex-col gap-2">
                <label className="pr-12 text-white">Category Name:</label>
                <input
                  type="text"
                  name="categoryName"
                  placeholder="Enter category name"
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <div className="py-3">
                  <label className="pr-3 text-white">Category Image:</label>
                  <input
                    type="file"
                    name="Mimage"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <button className="flex text-white btn hover:bg-[#1A4870] bg-[#5B99C2] btn-md w-full justify-center text-2xl pb-1">
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <dialog id="editCategoryModal" className="modal">
          <div className="modal-box bg-[#1A4870]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleEditFormSubmit}>
              <h1 className="text-white text-3xl text-center">Edit Category</h1>
              <p className="border border-1 border-gray-400 my-3"></p>
              <div className="flex flex-col gap-2">
                {selectedCategoryId && (
                  <div className="text-white text-center mb-4">
                    <p>Category ID: {selectedCategoryId}</p>
                  </div>
                )}
                <label className="pr-12 text-white">Category Name:</label>
                <input
                  type="text"
                  name="categoryName"
                  defaultValue={selectedCategory?.categoryName}
                  placeholder="Enter category name"
                  className="input input-bordered input-primary w-full bg-inherit text-white"
                />
                <div>
                  <label className="pr-3 text-white">Category Image:</label>
                  <input
                    type="file"
                    defaultValue={selectedCategory?.image}
                    name="Mimage"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
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
              <th>Category Name</th>
              <th>Category Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category: any) => (
                <tr key={category.categoryId} className="hover:bg-gray-300">
                  <td>
                    <div className="font-semibold">{category.categoryName}</div>
                  </td>
                  <td>
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={category.categoryImage}
                        alt="Avatar Tailwind CSS Component"
                        className="w-full h-full"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditCategory(category.categoryId)}
                        className="btn btn-ghost btn-sm"
                      >
                        <FaEdit className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteCategory(category.categoryId)
                        }
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

export default ManageCategory;
