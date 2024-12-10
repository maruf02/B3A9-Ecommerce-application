// import React, { useState } from "react";

// const ManageProduct = () => {
//   const [isDivVisible, setIsDivVisible] = useState(false);

//   const toggleDiv = () => {
//     setIsDivVisible(!isDivVisible);
//   };

//   return (
//     <div className="w-full h-full min-h-screen p-4">
//       <div>
//         <h1 className="text-2xl text-center text-black font-bold">
//           Manage Product
//         </h1>
//       </div>
//       {/* Button aligned to the right */}
//       <div className="flex justify-end pr-5">
//         <button
//           className="text-xl bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//           onClick={toggleDiv}
//         >
//           {isDivVisible ? "Hide Add Product" : "Add Product"}
//         </button>
//       </div>
//       {/* Conditionally visible div */}
//       {isDivVisible && (
//         <div className="mt-4 p-4 border rounded bg-gray-100 shadow">
//           <h2 className="text-lg font-bold">Add New Product</h2>
//           <form>
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Product Name:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded p-2"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Product Price:</label>
//               <input
//                 type="number"
//                 className="w-full border border-gray-300 rounded p-2"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Save Product
//             </button>
//           </form>
//         </div>
//       )}
//       <div>
//         <h1 className="text-3xl text-center mt-8">All Products</h1>
//       </div>
//     </div>
//   );
// };

export default ManageProduct;

import { IoAddCircleOutline } from "react-icons/io5";
import {
  useAddCarItemMutation,
  useDeleteCarMutation,
  useGetAllCarsQuery,
  useGetAllUserQuery,
  useUpdateCarMutation,
} from "../../../Redux/features/car/carApi";
import Swal from "sweetalert2";
import StarRatings from "react-star-ratings";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const ManageProduct = () => {
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [rating, setRating] = useState(selectedCar?.ratings || 0);

  const { data: carData, refetch } = useGetAllCarsQuery(undefined);
  const { data: users } = useGetAllUserQuery(undefined);
  const [addCarItem, {}] = useAddCarItemMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  const cars = carData?.data || [];
  console.log("object", users);
  const categories = ["Sedan", "SUV", "Sports Car", "Hybrid", "Electric"];
  const colors = ["White", "Black", "Red", "Matte", "BLue"];

  const handleAddCar = async (event: React.FormEvent) => {
    event.preventDefault();
    // Extract form data
    const form = event.target as HTMLFormElement;
    const name = form.nameT.value;
    const Mimages = form.Mimage.files[0];
    const images2 = form.image2.files[0];
    const images3 = form.image3.files[0];
    const images4 = form.image4.files[0];
    const images5 = form.image5.files[0];
    // const Mimages = form.Mimage.value;
    // const images2 = form.image2.value;
    // const images3 = form.image3.value;
    // const images4 = form.image4.value;
    // const images5 = form.image5.value;
    const model = form.model.value;
    const year = form.year.value;
    const feature1 = form.feature1.value;
    const feature2 = form.feature2.value;
    const feature3 = form.feature3.value;
    const category = selectedCategory;
    const color = selectedColor;
    const pricePerHour = parseInt(form.price.value);
    // const quantity = parseInt(form.quantity.value);
    // ***************************************************************************
    // ***************************************************************************

    // Mimage upload portion
    let MimageUrl; // Use existing image URL if no new image is uploaded

    if (Mimages) {
      const formData = new FormData();
      formData.append("file", Mimages);
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
        MimageUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Mimage upload portion
    // image2 upload portion
    let imageUrl2; // Use existing image URL if no new image is uploaded

    if (images2) {
      const formData = new FormData();
      formData.append("file", images2);
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
    // image2 upload portion
    // image3 upload portion
    let imageUrl3; // Use existing image URL if no new image is uploaded

    if (images3) {
      const formData = new FormData();
      formData.append("file", images3);
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
    // image3upload portion
    // image4 upload portion
    let imageUrl4; // Use existing image URL if no new image is uploaded

    if (images4) {
      const formData = new FormData();
      formData.append("file", images4);
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
    // image4 upload portion
    // image5 upload portion
    let imageUrl5; // Use existing image URL if no new image is uploaded

    if (images5) {
      const formData = new FormData();
      formData.append("file", images5);
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
    // image5 upload portion
    // ***************************************************************************
    // ***************************************************************************
    const description = form.description.value;

    const carData = {
      name,
      images: [MimageUrl, imageUrl2, imageUrl3, imageUrl4, imageUrl5],
      features: [feature1, feature2, feature3],
      category,
      color,
      pricePerHour,
      model,
      year,
      rating,
      description,
    };
    // console.log("productData", productData);

    try {
      await addCarItem(carData).unwrap();
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

  const handleEditCar = (carId: string) => {
    setSelectedCarId(carId);
    const modal = document.getElementById(
      "editProductModal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
    const car = cars.find((p: any) => p._id === carId);
    if (car) {
      setSelectedCar(car);
      setSelectedCategory(car.category);
    }
  };

  const handleEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.nameT.value;
    const Mimages = form.Mimage.value;
    const images2 = form.image2.value;
    const images3 = form.image3.value;
    const images4 = form.image4.value;
    const images5 = form.image5.value;
    const model = form.model.value;
    const year = form.year.value;
    const feature1 = form.feature1.value;
    const feature2 = form.feature2.value;
    const feature3 = form.feature3.value;
    const category = selectedCategory;
    const color = selectedColor;
    const pricePerHour = parseInt(form.price.value);
    // const quantity = parseInt(form.quantity.value);

    const description = form.description.value;

    const carModifyData = {
      name,
      images: [Mimages, images2, images3, images4, images5],
      features: [feature1, feature2, feature3],
      category,
      color,
      pricePerHour,
      model,
      year,
      rating,
      description,
    };
    // console.log("Product ID:", selectedProductId);
    // console.log("Product Data:", productModifyData);

    // console.log("Product ID:", selectedProductId);
    // console.log("Product Data:", productModifyData);

    try {
      await updateCar({
        carId: selectedCarId,
        carModifyData,
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
      refetch();
    } catch (error) {
      // console.error("Failed to update product:", error);
    }
  };
  const handleSelectChangeCategory = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedCategory(selectedValue);
  };
  const handleSelectChangeColor = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedColor(selectedValue);
  };

  // console.log(selectedProductId);

  const handleDeleteCar = (carId: string) => {
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
          await deleteCar(carId).unwrap();
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
        <h2 className="text-2xl text-black font-semibold">Car Management</h2>

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
          <span>Add Car</span>
        </button>
        <dialog id="AddProductModal" className="modal  ">
          <div className="modal-box bg-[#1A4870]  ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {/* add car form */}
            <form onSubmit={handleAddCar}>
              <div className="flex justify-center pt-5 ">
                <h1 className="text-white text-3xl ">Add New Product</h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="pr-12 text-white">Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-3 text-white"> Main Image:</label>
                  <input
                    type="file"
                    name="Mimage"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-10 text-white">Image2:</label>
                  <input
                    type="file"
                    name="image2"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-10 text-white">Image3:</label>
                  <input
                    type="file"
                    name="image3"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-10 text-white">Image4:</label>
                  <input
                    type="file"
                    name="image4"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>
                <div>
                  <label className="pr-10 text-white">Image5:</label>
                  <input
                    type="file"
                    name="image5"
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs bg-transparent"
                  />
                </div>

                <div>
                  <label className="pr-9 text-white">Category:</label>
                  <select
                    onChange={handleSelectChangeCategory}
                    value={selectedCategory || ""}
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-14 text-white">Color:</label>
                  <select
                    onChange={handleSelectChangeColor}
                    value={selectedColor || ""}
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {colors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-14 text-white">Model:</label>
                  <input
                    type="text"
                    name="model"
                    min="0"
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div>
                  <label className="pr-16 text-white">Year:</label>
                  <input
                    type="text"
                    name="year"
                    min="0"
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div>
                  <label className="pr-5 text-white">Price(Hour):</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                {/* <div>
                  <label className="pr-10 text-white">Quantity:</label>
                  <input
                    type="number"
                    min="0"
                    name="quantity"
                    placeholder="Type here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white"
                  />
                </div> */}

                <div>
                  <label className="pr-12 text-white">Ratings:</label>
                  {/* <input
                    type="number"
                    name="rating"
                    max="5"
                    min="1"
                    placeholder="Enter rating here"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  /> */}
                  <StarRatings
                    rating={rating}
                    starRatedColor="#f39c12"
                    starHoverColor="#f39c12"
                    changeRating={setRating}
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">features:</label>
                  <input
                    type="text"
                    name="feature1"
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">features2:</label>
                  <input
                    type="text"
                    name="feature2"
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">features3:</label>
                  <input
                    type="text"
                    name="feature3"
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
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
                  {selectedCarId ? "Edit Product" : "Add New Product"}
                </h1>
              </div>
              <p className="border border-1 border-gray-400 my-3 "></p>
              <div className="flex flex-col gap-2">
                {selectedCarId && (
                  <div className="text-white text-center mb-4">
                    <p>Car ID: {selectedCarId}</p>
                  </div>
                )}
                <div>
                  <label className="pr-12 text-white">Name:</label>
                  <input
                    type="text"
                    name="nameT"
                    defaultValue={selectedCar?.name}
                    placeholder="Enter Product name"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-2 text-white">Main Image:</label>
                  <input
                    type="text"
                    defaultValue={selectedCar?.images[0]}
                    name="Mimage"
                    placeholder="Enter image Link (Link only)"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-2 text-white">Image2(Link):</label>
                  <input
                    type="text"
                    defaultValue={selectedCar?.images[1]}
                    name="image2"
                    placeholder="Enter image Link (Link only)"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-2 text-white">Image3(Link):</label>
                  <input
                    type="text"
                    defaultValue={selectedCar?.images[2]}
                    name="image3"
                    placeholder="Enter image Link (Link only)"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-2 text-white">Image4(Link):</label>
                  <input
                    type="text"
                    defaultValue={selectedCar?.images[3]}
                    name="image4"
                    placeholder="Enter image Link (Link only)"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-2 text-white">Image5(Link):</label>
                  <input
                    type="text"
                    defaultValue={selectedCar?.images[4]}
                    name="image5"
                    placeholder="Enter image Link (Link only)"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  />
                </div>
                <div>
                  <label className="pr-8 text-white">Category:</label>
                  <select
                    onChange={handleSelectChangeCategory}
                    value={selectedCategory || selectedCar?.category || ""}
                    className="select select-bordered w-full max-w-xs bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-14 text-white">Color:</label>
                  <select
                    onChange={handleSelectChangeColor}
                    value={selectedColor || selectedCar?.color || ""}
                    // defaultValue={selectedCar?.color}
                    className="select select-bordered w-full max-w-60 bg-[#1A4870] text-white"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {colors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pr-14 text-white">Model:</label>
                  <input
                    type="text"
                    name="model"
                    defaultValue={selectedCar?.model}
                    min="0"
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div>
                  <label className="pr-16 text-white">Year:</label>
                  <input
                    type="text"
                    name="year"
                    defaultValue={selectedCar?.year}
                    min="0"
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div>
                  <label className="pr-5 text-white">Price(Hour):</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    defaultValue={selectedCar?.pricePerHour}
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>

                <div>
                  <label className="pr-12 text-white">Ratings:</label>
                  {/* <input
                    type="number"
                    name="rating"
                    max="5"
                    min="1"
                    defaultValue={selectedProduct?.ratings}
                    placeholder="Enter rating here"
                    className="input input-bordered input-primary w-full max-w-xs bg-inherit text-white"
                  /> */}
                  <StarRatings
                    // rating={selectedProduct?.ratings}
                    rating={rating || selectedCar?.rating}
                    starRatedColor="#f39c12"
                    starHoverColor="#f39c12"
                    changeRating={setRating}
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">features:</label>
                  <input
                    type="text"
                    name="feature1"
                    defaultValue={selectedCar?.features[0]}
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">features2:</label>
                  <input
                    type="text"
                    name="feature2"
                    defaultValue={selectedCar?.features[1]}
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div>
                  <label className="pr-12 text-white">features3:</label>
                  <input
                    type="text"
                    name="feature3"
                    defaultValue={selectedCar?.features[2]}
                    placeholder="Enter Price Here"
                    className="input input-bordered input-primary w-full max-w-60 bg-inherit text-white  "
                  />
                </div>
                <div className="flex flex-row align-middle">
                  <label className="pr-6  text-white">Description:</label>
                  <textarea
                    name="description"
                    defaultValue={selectedCar?.description}
                    className="textarea textarea-bordered w-full max-w-xs bg-[#1A4870] text-white"
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
      </div>
      {/* table view */}
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full ">
          {/* head */}
          <thead className="text-black text-lg">
            <tr>
              <th>Name</th>
              <th>category</th>
              <th>Model</th>
              <th>Year</th>
              <th>pricePerHour</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cars.length === 0 ? (
              <div>sorry</div>
            ) : (
              cars.map((car: any) => (
                <>
                  <tr key={car._id} className="hover:bg-gray-300">
                    <td>
                      <div className="flex items-center gap-3 ">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={car.images[0]}
                              alt="Avatar Tailwind CSS Component"
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{car.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{car.category}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{car.model}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">{car.year}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold">${car.pricePerHour}</div>
                      </div>
                    </td>
                    <th>
                      <div className="space-x-0">
                        <button
                          onClick={() => handleEditCar(car._id)}
                          className="btn btn-ghost btn-sm  "
                        >
                          <FaEdit className="w-6 h-6 " />
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
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
