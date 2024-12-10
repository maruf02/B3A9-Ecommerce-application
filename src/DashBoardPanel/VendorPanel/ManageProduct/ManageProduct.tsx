import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

import { FaCopy, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllCategoryQuery,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "../../../Redux/features/produtcs/productsApi";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useGetVendorByEmailQuery } from "../../../Redux/features/vendor/vendorApi";

const ManageProduct = () => {
  const userDataToken =
    (useSelector((state: RootState) => state.auth.user) as User) || null; // get user info from redux token

  const [selectedproductId, setSelectedproductId] = useState<string | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedIsFlashSale, setSelectedIsFlashSale] = useState("");

  const { data: productData, refetch: productsRefech } =
    useGetAllProductQuery(undefined);
  const { data: vendorData, refetch: vendorRefech } = useGetVendorByEmailQuery(
    userDataToken.email
  );
  // const { data: users } = useGetAllUserQuery(undefined);
  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const [addProductItem, {}] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const produtcs = productData?.data || [];
  const categories = categoryData?.data || [];
  const vendor = vendorData?.data || [];
  // console.log("object", produtcs, categories);
  console.log("selectedCategory", selectedCategory, categories);

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    // Extract form data
    const form = event.target as HTMLFormElement;
    const shopNameM = vendor.shopName;
    const email = userDataToken.email;
    const name = form.nameT.value;
    const price = parseFloat(form.price.value);
    const category = selectedCategory;
    const description = form.description.value;
    const quantity = parseInt(form.quantity.value);
    const mimage = form.Mimage.files[0];
    const image2 = form.image2.files[0];
    const image3 = form.image3.files[0];
    const image4 = form.image4.files[0];
    const image5 = form.image5.files[0];
    const discount = selectedDiscount;
    const discountPrice = parseFloat(form.discountPrice.value);
    const isFlashSale = selectedIsFlashSale;

    // ***************************************************************************
    // ***************************************************************************

    // Mimage upload portion
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

    // Mimage upload portion
    // Mimage2upload portion
    let imageUrl2; // Use existing image URL if no new image is uploaded

    if (image2) {
      const formData = new FormData();
      formData.append("file", image2);
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
        imageUrl2 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage2 upload portion
    // Mimage3 upload portion
    let imageUrl3; // Use existing image URL if no new image is uploaded

    if (image3) {
      const formData = new FormData();
      formData.append("file", image3);
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
        imageUrl3 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage3 upload portion
    // Mimage4 upload portion
    let imageUrl4; // Use existing image URL if no new image is uploaded

    if (image4) {
      const formData = new FormData();
      formData.append("file", image4);
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
        imageUrl4 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage4 upload portion
    // Mimage5 upload portion
    let imageUrl5; // Use existing image URL if no new image is uploaded

    if (image5) {
      const formData = new FormData();
      formData.append("file", image5);
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
        imageUrl5 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // image3 upload portion

    // ***************************************************************************
    // ***************************************************************************

    const productData = {
      shopNameM,
      email,
      name,
      price,
      category,
      mimage: mimageUrl,
      image2: imageUrl2,
      image3: imageUrl3,
      image4: imageUrl4,
      image5: imageUrl5,
      quantity,
      description,
      discount,
      discountPrice,
      isFlashSale,
      vendorId: vendor.vendorId,
    };
    console.log("productData", productData);

    try {
      await addProductItem(productData).unwrap();
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
      productsRefech();
    } catch (error) {
      // console.error("Failed to add product:", error);
    }
  };

  const handleCopyProduct = async (productId: string) => {
    console.log(productId);
    const product = produtcs.find((p: any) => p.productId === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedCategory(product.category);
      setSelectedDiscount(product.discount);
      setSelectedIsFlashSale(product.isFlashSale);
    }

    const productData = {
      shopNameM: selectedProduct?.shopNameM,
      email: selectedProduct?.email,
      name: selectedProduct?.name,
      price: selectedProduct?.price,
      category: selectedProduct?.category,
      mimage: selectedProduct?.mimage,
      image2: selectedProduct?.image2,
      image3: selectedProduct?.imageUrl3,
      image4: selectedProduct?.imageUrl4,
      image5: selectedProduct?.imageUrl5,
      quantity: selectedProduct?.quantity,
      description: selectedProduct?.description,
      discount: selectedProduct?.discount,
      discountPrice: selectedProduct?.discountPrice,
      isFlashSale: selectedProduct?.isFlashSale,
      vendorId: vendor.vendorId,
    };
    console.log("productData", productData);

    try {
      await addProductItem(productData).unwrap();
      // console.log("Product added:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your duplicate work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      productsRefech();
    } catch (error) {
      // console.error("Failed to add product:", error);
    }
  };

  const handleEditProduct = (productId: string) => {
    setSelectedproductId(productId);
    const modal = document.getElementById(
      "editProductModal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
    const product = produtcs.find((p: any) => p.productId === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedCategory(product.category);
      setSelectedDiscount(product.discount);
      setSelectedIsFlashSale(product.isFlashSale);
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.nameT.value;
    const price = parseFloat(form.price.value);
    const category = selectedCategory;

    const quantity = parseInt(form.quantity.value);
    const mimage = form.Mimage.files[0];
    const image2 = form.image2.files[0];
    const image3 = form.image3.files[0];
    const image4 = form.image4.files[0];
    const image5 = form.image5.files[0];
    const discount = selectedDiscount || selectedProduct.discount;
    const discountPrice = parseFloat(form.discountPrice.value);
    const isFlashSale = selectedIsFlashSale || selectedProduct.isFlashSale;

    const description = form.description.value;

    // Mimage upload portion
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

    // Mimage upload portion
    // Mimage2upload portion
    let imageUrl2; // Use existing image URL if no new image is uploaded

    if (image2) {
      const formData = new FormData();
      formData.append("file", image2);
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
        imageUrl2 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage2 upload portion
    // Mimage3 upload portion
    let imageUrl3; // Use existing image URL if no new image is uploaded

    if (image3) {
      const formData = new FormData();
      formData.append("file", image3);
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
        imageUrl3 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage3 upload portion
    // Mimage4 upload portion
    let imageUrl4; // Use existing image URL if no new image is uploaded

    if (image4) {
      const formData = new FormData();
      formData.append("file", image4);
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
        imageUrl4 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage4 upload portion
    // Mimage5 upload portion
    let imageUrl5; // Use existing image URL if no new image is uploaded

    if (image5) {
      const formData = new FormData();
      formData.append("file", image5);
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
        imageUrl5 = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // image3 upload portion

    // ***************************************************************************
    // ***************************************************************************

    const productModifyData = {
      name,
      price,
      category,
      quantity,
      mimage: mimageUrl || selectedProduct?.mimage,
      image2: imageUrl2 || selectedProduct?.image2,
      image3: imageUrl3 || selectedProduct?.image3,
      image4: imageUrl4 || selectedProduct?.image4,
      image5: imageUrl5 || selectedProduct?.image5,
      description,
      discount,
      discountPrice,
      isFlashSale,
    };
    console.log("productModifyData", productModifyData);
    try {
      await updateProduct({
        productId: selectedproductId,
        productsModifyData: productModifyData,
      });
      // console.log("Product updated:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Updated Product info",
        showConfirmButton: false,
        timer: 1500,
      });

      // Optionally close the modal after a successful update
      const modal = document.getElementById(
        "editProductModal"
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      productsRefech();
    } catch (error) {
      // console.error("Failed to update product:", error);
    }
  };
  const handleSelectChangeCategory = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedCategory(selectedValue);
  };
  const handleSelectChangeDiscount = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedDiscount(selectedValue);
  };
  const handleSelectChangeIsFlashSale = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedIsFlashSale(selectedValue);
  };

  // console.log(selectedproductId);

  const handleDeleteProducts = (productId: string) => {
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
          await deleteProduct(productId).unwrap();
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          productsRefech();
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
        <h2 className="text-2xl text-black font-semibold">
          Product Management
        </h2>
        {/* **************add product modal********************************* */}
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
          <span>Add Product</span>
        </button>
        <dialog id="AddProductModal" className="modal  ">
          <div className="modal-box bg-[#1A4870]  ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {/* add car form */}
            <form onSubmit={handleAddProduct}>
              <div className="flex justify-center pt-5 ">
                <h1 className="text-white text-3xl ">Add New Product</h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="pr-12 text-white">Shop Name:</label>
                  <input
                    type="text"
                    name="shopName"
                    defaultValue={vendor.shopName}
                    readOnly
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Price:</label>
                  <input
                    type="number"
                    name="price"
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-1:</label>
                  <input
                    type="file"
                    name="Mimage"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-2:</label>
                  <input
                    type="file"
                    name="image2"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-3:</label>
                  <input
                    type="file"
                    name="image3"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-4:</label>
                  <input
                    type="file"
                    name="image4"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-5:</label>
                  <input
                    type="file"
                    name="image5"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>

                <div>
                  <label className="pr-9 text-white">Category:</label>
                  <select
                    onChange={(e) => setSelectedCategory(e.target.value)} // Update state with the selected value
                    value={selectedCategory || ""} // Ensure the selected value reflects the state
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white "
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category: any, index: number) => (
                      <option key={index} value={category.CategoryName}>
                        {category.CategoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-9 text-white">Product discount:</label>
                  <select
                    onChange={(e) => setSelectedDiscount(e.target.value)} // Update state with the selected value
                    value={selectedDiscount || ""} // Ensure the selected value reflects the state
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white "
                  >
                    <option value="" disabled selected>
                      Select Discount status
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {selectedDiscount === "Yes" ? (
                  <div>
                    <label className="pr-12 text-white">Discount Price:</label>
                    <input
                      type="number"
                      name="discountPrice"
                      min={1}
                      placeholder="Enter Product name"
                      className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="pr-12 text-white">Discount Price:</label>
                    <input
                      type="number"
                      name="discountPrice"
                      min={0}
                      defaultValue={0}
                      readOnly
                      placeholder="Enter Product name"
                      className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="pr-9 text-white">IsFlash Sale:</label>
                  <select
                    onChange={(e) => setSelectedIsFlashSale(e.target.value)} // Update state with the selected value
                    value={selectedIsFlashSale || ""} // Ensure the selected value reflects the state
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white "
                  >
                    <option value="" disabled>
                      Select Flash sale
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-row align-middle">
                  <label className="pr-8  text-white">Description:</label>
                  <textarea
                    name="description"
                    className="textarea textarea-bordered w-full max-w-sm bg-[#1A4870] text-white"
                    placeholder="Bio"
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

        {/* **************add product modal********************************* */}
        {/* **************edit product modal********************************* */}
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
                  {selectedproductId ? "Edit Product" : "Add New Product"}
                </h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                {selectedproductId && (
                  <div className="text-white text-center mb-4">
                    <p>product ID: {selectedproductId}</p>
                  </div>
                )}
                <div>
                  <label className="pr-12 text-white">Shop Name:</label>
                  <input
                    type="text"
                    name="shopName"
                    defaultValue={vendor.shopName}
                    readOnly
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    defaultValue={selectedProduct?.name}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Price:</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={selectedProduct?.price}
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">Product Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={selectedProduct?.quantity}
                    min={1}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>

                <div>
                  <label className="pr-3 text-white">Main Image-1:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.mimage}
                    name="Mimage"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-2:</label>
                  <input
                    type="file"
                    name="image2"
                    defaultValue={selectedProduct?.image2}
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-3:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image3}
                    name="image3"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-4:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image4}
                    name="image4"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white">Main Image-5:</label>
                  <input
                    type="file"
                    defaultValue={selectedProduct?.image5}
                    name="image5"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-9 text-white">Category:</label>
                  <select
                    onChange={handleSelectChangeCategory}
                    value={selectedCategory || selectedProduct?.category || ""}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category: any, index: number) => (
                      <option key={index} value={category.CategoryName}>
                        {category.CategoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-9 text-white"> Discount:</label>
                  <select
                    onChange={handleSelectChangeDiscount}
                    value={selectedDiscount || selectedProduct?.discount || ""}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Discount status
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="pr-9 text-white"> Discount Price:</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={selectedProduct?.discountPrice || 0}
                    min={0}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>

                <div>
                  <label className="pr-9 text-white">IsFlash Sale:</label>
                  <select
                    onChange={handleSelectChangeIsFlashSale}
                    value={
                      selectedIsFlashSale || selectedProduct?.isFlashSale || ""
                    }
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Flash sale
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-row align-middle">
                  <label className="pr-8  text-white">Description:</label>
                  <textarea
                    name="description"
                    defaultValue={selectedProduct?.description}
                    className="textarea textarea-bordered w-full max-w-sm bg-[#1A4870] text-white"
                    placeholder="Bio"
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
        {/* **************edit product modal********************************* */}
      </div>
      {/* table view */}
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full ">
          {/* head */}
          <thead className="text-black text-lg">
            <tr>
              <th>Name</th>
              <th>category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>disPr</th>
              <th>FlashS</th>

              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {produtcs.length === 0 ? (
              <div>sorry</div>
            ) : (
              produtcs.map((product: any, index: string) => (
                <>
                  <tr key={index} className="hover:bg-gray-300">
                    <td>
                      <div className="flex items-center gap-3 ">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={product.mimage}
                              alt="Avatar Tailwind CSS Component"
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{product.category}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">${product.price}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{product.quantity}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">
                          ${product.discountPrice || 0}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">
                          {product.isFlashSale}
                        </div>
                      </div>
                    </td>
                    <th>
                      <div className="space-x-0">
                        <button
                          onClick={() => handleEditProduct(product.productId)}
                          className="btn btn-ghost btn-sm  "
                        >
                          <FaEdit className="w-6 h-6 " />
                        </button>
                        <button
                          onClick={() => handleCopyProduct(product.productId)}
                          className="btn btn-ghost btn-sm  "
                        >
                          <FaCopy className="w-6 h-6 " />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteProducts(product.productId)
                          }
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

export default ManageProduct;
