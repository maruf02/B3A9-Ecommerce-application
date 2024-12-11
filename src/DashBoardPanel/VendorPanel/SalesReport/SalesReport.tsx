import React, { useState, useEffect } from "react";
import {
  useGetAllCategoryQuery,
  useGetAllProductQuery,
  useGetAllProductQueryQuery,
} from "../../../Redux/features/produtcs/productsApi";
import { Pagination } from "antd";
import { FaSearch, FaSortNumericDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdManageSearch, MdPriceCheck } from "react-icons/md";

const SalesReport = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceAscDesc, setSelectedPriceAscDesc] = useState("");
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const {
    data: productData,
    isError,
    isLoading,
    refetch,
  } = useGetAllProductQueryQuery({
    page,
    limit,
  });

  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  console.log("productData", productData);
  const total = productData?.meta?.total;
  const categories = categoryData?.data || [];

  useEffect(() => {
    if (productData?.data) {
      setProducts(productData.data);
      setDisplayedProducts(productData.data);
    }
  }, [productData]);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    if (pageSize && pageSize !== limit) {
      setLimit(pageSize);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchText = form.SearchText.value.toLowerCase();
    setSearchText(searchText);
    console.log("searchText", searchText);
    event.preventDefault();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSortByPriceRange = (event) => {
    event.preventDefault();
    const form = event.target;
    const minPrice = parseFloat(form.MinPrice.value) || 0;
    const maxPrice = parseFloat(form.MaxPrice.value) || Infinity;

    const filteredProducts = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (!selectedCategory || product.category === selectedCategory)
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSelectChangeCategory = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);

    const filteredProducts = products.filter(
      (product) => product.category === selectedValue
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSelectChangePriceAscDesc = (event) => {
    const selectedValue = event.target.value;
    setSelectedPriceAscDesc(selectedValue);

    const sortedProducts = [...displayedProducts].sort((a, b) =>
      selectedValue === "asc" ? a.price - b.price : b.price - a.price
    );
    setDisplayedProducts(sortedProducts);
  };

  const handleReset = () => {
    setSearchText("");
    setSelectedCategory("");
    setSelectedPriceAscDesc("");
    setDisplayedProducts(products);
  };

  if (isLoading)
    return (
      <div className="text-center py-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <div></div>
      <div>
        {/* <form onSubmit={handleSearch}>
          <div className="dropdown dropdown-bottom text-white dropdown-hover lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-sm bg-[#1A4870]">
              <FaSearch className="text-xl text-[#F9DBBA]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu border-[#1F316F] bg-[#1A4870] rounded-box z-[1] w-auto p-2 shadow"
            >
              <input
                type="text"
                placeholder="Search By Name/Category"
                className="input input-bordered input-primary w-72 max-w-md bg-inherit text-white"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-sm bg-[#1A4870] text-white mt-2">
                Search
              </button>
            </ul>
          </div>
        </form> */}

        <form onSubmit={handleSearch}>
          <div className="dropdown dropdown-bottom text-white dropdown-hover lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn  btn-sm bg-[#1A4870]"
            >
              <FaSearch className=" text-xl text-[#F9DBBA]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu border-[#1F316F]  bg-[#1A4870] rounded-box z-[1] w-auto p-2 shadow"
            >
              <input
                type="text"
                name="SearchText"
                placeholder="Search By Name/Category"
                className="input input-bordered input-primary w-72 max-w-md bg-inherit text-white"
              />
              <button className="btn btn-sm bg-[#1A4870] text-white mt-2 ">
                Search
              </button>
            </ul>
          </div>
        </form>
        {/* ********************* */}
        <form onSubmit={handleSearch}>
          <div className="hidden lg:block">
            <label className="input flex items-center gap-2 bg-[#1A4870] w-auto h-auto">
              <FaSearch className=" text-xl text-[#F9DBBA]" />
              <input
                type="text"
                name="SearchText"
                className="input input-sm input-bordered input-[#1A4870] w-60 max-w-md   text-white"
                placeholder="Search By Name/Category"
              />
              <button className="btn btn-sm bg-[#1A4870] text-white ">
                Search
              </button>
            </label>
          </div>
        </form>
        {/* ********************************** */}

        {/******************  search *******************/}

        {/* //////// filter by price range /////// */}
        <form onSubmit={handleSortByPriceRange}>
          <div className="dropdown md:dropdown-end  text-white dropdown-hover ">
            <div tabIndex={0} role="button" className="btn btn-sm bg-[#1A4870]">
              <span className="hidden lg:block text-white">
                Filter By Price Range
              </span>
              <MdPriceCheck className=" text-3xl text-[#F9DBBA]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu  border-2 border-[#1F316F]  bg-[#1A4870] rounded-box z-[1] w-auto p-2 shadow"
            >
              <div className="flex    items-baseline ">
                <label className="pr-5 text-md">MinPrice:</label>
                <input
                  type="number"
                  name="MinPrice"
                  placeholder="Type here"
                  className="input input-bordered input-primary  input-sm w-24 max-w-xs text-white bg-inherit"
                />
              </div>
              <div className="flex items-baseline mt-2 ">
                <label className="pr-5 text-md">MaxPrice:</label>
                <input
                  type="number"
                  name="MaxPrice"
                  placeholder="Type here"
                  className="input input-bordered input-primary  input-sm w-24 max-w-xs text-white bg-inherit"
                />
              </div>
              <button className="btn btn-sm bg-[#1A4870] text-white  h-2 mt-2">
                <span className=" text-white">Apply</span>
              </button>
            </ul>
          </div>
        </form>
        {/* ////////////////////// */}
        {/* *******filter by category******** */}
        <div className="dropdown dropdown-bottom dropdown-end text-white dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-sm bg-[#1A4870]">
            <span className="hidden lg:block text-white">
              Filter By Category
            </span>
            <MdManageSearch className=" text-3xl text-[#F9DBBA]" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu border-[#1F316F]  bg-[#1A4870] rounded-box z-[1] w-52 p-2 shadow"
          >
            <select
              onChange={handleSelectChangeCategory}
              className="select select-bordered w-full  bg-[#1A4870] "
            >
              <option disabled selected>
                Select Category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category.CategoryName}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </ul>
        </div>
        {/* *******filter by category******** */}
        {/* *******filter by price sort low to hight******** */}
        <div className="dropdown dropdown-bottom dropdown-end text-white dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-sm  bg-[#1A4870]">
            <span className="hidden lg:block text-white">Sort By Price</span>
            <FaSortNumericDown className=" text-2xl text-[#F9DBBA]" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu border-[#1F316F]  bg-[#1A4870] rounded-box z-[1] w-52 p-2 shadow"
          >
            <select
              onChange={handleSelectChangePriceAscDesc}
              className="select select-bordered w-full bg-[#1A4870]"
            >
              <option disabled selected>
                Select Option
              </option>
              <option value="asc">Price Low to High</option>
              <option value="desc">Price High to Low</option>
            </select>
          </ul>
        </div>
        {/* *******filter by category******** */}
        {/* reset button */}
        <button
          onClick={handleReset}
          className="btn btn-sm bg-[#1A4870] text-white "
        >
          <span className="hidden lg:block text-white">Reset</span>
          <IoMdClose className=" text-2xl text-[#F9DBBA]" />
        </button>
        {/* reset button */}
      </div>

      {/* Table */}
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full">
          <thead className="text-black text-lg">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Discount Price</th>
              <th>Flash Sale</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              displayedProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-300">
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>${product.discountPrice || 0}</td>
                  <td>{product.isFlashSale ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full container mx-auto">
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={true}
          pageSizeOptions={["1", "2", "3", "5"]}
        />
      </div>
    </div>
  );
};

export default SalesReport;
