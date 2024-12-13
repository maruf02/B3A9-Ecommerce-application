import { FaCopy, FaEdit, FaSearch, FaSortNumericDown } from "react-icons/fa";
import { MdDeleteForever, MdManageSearch, MdPriceCheck } from "react-icons/md";
import { useEffect, useState } from "react";

import { Pagination, Select } from "antd";
import { useSelector } from "react-redux";

import { IoMdClose } from "react-icons/io";
import {
  useGetAllCategoryQuery,
  useGetProductByShopNamePaginateQuery,
} from "../../Redux/features/produtcs/productsApi";
import { useGetVendorByEmailQuery } from "../../Redux/features/vendor/vendorApi";
import { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";

const CustomerReviewsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedPriceAscDesc, setSelectedPriceAscDesc] = useState("");
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  console.log("products", products);
  const userDataToken =
    (useSelector((state: RootState) => state.auth.user) as User) || null; // get user info from redux token

  const [selectedCategory, setSelectedCategory] = useState("");

  // const { data: productData, refetch: productsRefech } =
  //   useGetProductByShopNameQuery(userDataToken.email);
  const email = userDataToken?.email;
  const { data: vendorData, refetch: vendorRefech } =
    useGetVendorByEmailQuery(email);

  const vendorId = vendorData?.data?.vendorId;
  const {
    data: productData,
    isLoading,
    isError,
    refetch: productsRefech,
  } = useGetProductByShopNamePaginateQuery({ vendorId, page, limit });

  // const { data: users } = useGetAllUserQuery(undefined);
  const { data: categoryData } = useGetAllCategoryQuery(undefined);

  const produtcs = productData?.data || [];
  // const productsData = produtcs?.result || 0;
  // const displayedProductsData = displayedProducts?.result || 0;
  const total = productData?.meta?.total;
  const categories = categoryData?.data || [];
  const vendor = vendorData?.data || [];

  // pagination***************************************************
  // pagination***************************************************

  useEffect(() => {
    if (productData?.data) {
      setProducts(productData?.data);
      setDisplayedProducts(productData?.data);
    }
  }, [productData]);

  if (isLoading)
    return (
      <div className="text-center py-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (isError) return <div>Error loading products</div>;

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    if (pageSize && pageSize !== limit) {
      setLimit(pageSize);
    }
  };
  // pagination***************************************************
  // pagination***************************************************
  // ******************************************************************
  //  *****************search function**************************
  //    *****************search function**************************
  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchText = form.SearchText.value.toLowerCase();
    setSearchText(searchText);
    console.log("searchText", searchText);
    event.preventDefault();
    const filteredProducts = products.filter(
      (product: any) =>
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
      (product: any) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (!selectedCategory || product.category === selectedCategory)
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSelectChangeCategoryFilter = (event) => {
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
  //  *****************search function**************************
  //    *****************search function**************************
  return (
    <div className="container mx-auto ">
      <div>
        <h1 className="text-center py-5 underline">Search your product</h1>
      </div>
      {/* *****************search function************************** */}
      {/* *****************search function************************** */}
      <div className="w-full flex flex-row gap-5 container mx-auto py-2">
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
              onChange={handleSelectChangeCategoryFilter}
              className="select select-bordered w-full  bg-[#1A4870] "
            >
              <option disabled>Select Category</option>
              {categories.map((category: any, index: string) => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
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
              <option disabled>Select Option</option>
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
      {/* *****************search function************************** */}
      {/* *****************search function************************** */}
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">
          Product Review and Rating
        </h2>
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
            {displayedProducts.length === 0 ? (
              <div>sorry</div>
            ) : (
              displayedProducts.map((product: any, index: number) => (
                <>
                  <tr key={product.productId} className="hover:bg-gray-300">
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
                        <Link to={`/ProductDetailsView/${product.productId}`}>
                          <button className="btn btn-primary  w-full ">
                            View Comment
                          </button>
                        </Link>
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

      {/* Pagination */}
      <div className="container mx-auto w-full flex   justify-center  my-10">
        {/* Pagination */}
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={true}
          pageSizeOptions={["1", "2", "3", "5", "10", "20"]}
        />
      </div>
    </div>
  );
};

export default CustomerReviewsPage;
