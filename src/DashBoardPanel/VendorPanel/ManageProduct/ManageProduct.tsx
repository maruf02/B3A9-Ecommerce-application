import React, { useState } from "react";

const ManageProduct = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  return (
    <div className="w-full h-full min-h-screen p-4">
      <div>
        <h1 className="text-2xl text-center text-black font-bold">
          Manage Product
        </h1>
      </div>
      {/* Button aligned to the right */}
      <div className="flex justify-end pr-5">
        <button
          className="text-xl bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={toggleDiv}
        >
          {isDivVisible ? "Hide Add Product" : "Add Product"}
        </button>
      </div>
      {/* Conditionally visible div */}
      {isDivVisible && (
        <div className="mt-4 p-4 border rounded bg-gray-100 shadow">
          <h2 className="text-lg font-bold">Add New Product</h2>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Product Name:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Product Price:</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Product
            </button>
          </form>
        </div>
      )}
      <div>
        <h1 className="text-3xl text-center mt-8">All Products</h1>
      </div>
    </div>
  );
};

export default ManageProduct;
