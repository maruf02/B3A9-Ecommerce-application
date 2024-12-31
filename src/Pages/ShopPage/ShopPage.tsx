import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  useGetAllCategoryQuery,
  useGetProductByVendorIdPaginateQuery,
} from "../../Redux/features/produtcs/productsApi";
import ProductsSingleView from "../../Components/AllProductPage/ProductsSingleView";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { IoMdClose } from "react-icons/io";
import { FaSearch, FaSortNumericDown } from "react-icons/fa";
import { MdManageSearch, MdPriceCheck } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  useFollowStatusQuery,
  useGetfollowerByVendorIdQuery,
  useStartFollowMutation,
  useStartUnfollowMutation,
} from "../../Redux/features/produtcs/orderApi";
import Swal from "sweetalert2";
import { TCategory, TProduct, TUser } from "../../types";
import { useGetVendorByIdQuery } from "../../Redux/features/vendor/vendorApi";
import SkeletonCard from "../../shared/SkeletonCard";

const ShopPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceAscDesc, setSelectedPriceAscDesc] = useState("");
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState<TProduct[]>([]);
  const { vendorId, shopName } = useParams<{
    vendorId: string;
    shopName: string;
  }>();
  const { data: productsData, isLoading } =
    useGetProductByVendorIdPaginateQuery({ vendorId, page, limit });
  const { data: vendorData } = useGetVendorByIdQuery(vendorId as string);
  console.log(vendorData);
  const vendor = vendorData?.data || [];
  const user = useSelector((state: RootState) => state.auth.user as TUser);
  const userId = user?.userId;
  // const userRole = user?.role || [];
  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const categories = categoryData?.data || [];
  // console.log("vendorId", vendorId);
  const { data: followData, refetch: followStatusRefetch } =
    useFollowStatusQuery(vendorId);

  console.log("followData", followData, vendorId);
  const { data: followerData, refetch: followCountRefetch } =
    useGetfollowerByVendorIdQuery(vendorId as string);
  const [startFollow] = useStartFollowMutation();
  const [startUnFollow] = useStartUnfollowMutation();
  const [localFollowStatus, setLocalFollowStatus] = useState(
    followData?.message || ""
  );
  // const produtcs = productsData?.data || {};
  // const follow = followData?.message || "";
  // console.log("produtcs", productsData);

  // console.log("followData", followData);
  if (productsData && products.length === 0) {
    setProducts(productsData.data);
    setDisplayedProducts(productsData.data);
  }

  // pagination***************************************************
  // pagination***************************************************
  const total = productsData?.meta?.total;
  useEffect(() => {
    if (productsData?.data) {
      setProducts(productsData?.data);
      setDisplayedProducts(productsData?.data);
    }
  }, [productsData, vendorId]);

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex flex-wrap justify-center gap-5 py-5">
        {/* Render 6 skeleton cards as placeholders */}
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  // if (isError) return <div>Error loading products</div>;

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    if (pageSize && pageSize !== limit) {
      setLimit(pageSize);
    }
  };
  // pagination***************************************************
  // pagination***************************************************

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchText = form.SearchText.value.toLowerCase();
    setSearchText(searchText);

    const filteredProducts = products.filter(
      (product: TProduct) =>
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText)
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSortByPriceRange = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const minPrice = parseFloat(form.MinPrice.value) || 0;
    const maxPrice = parseFloat(form.MaxPrice.value) || Infinity;

    const filteredProducts = products.filter(
      (product: TProduct) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (!selectedCategory || product.category === selectedCategory)
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSelectChangeCategory = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
    setSelectedCategory(selectedValue);

    const filteredProducts = products.filter(
      (product: TProduct) => product.category === selectedValue
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleSelectChangePriceAscDesc = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    const selectedValue = form.value;
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
    setDisplayedProducts(productsData?.data || []); // Reset to initial product list
  };

  if (isLoading)
    return (
      <div className="text-center py-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  // if (isError) return <div>Error loading products</div>;

  // console.log("Selected :", selectedCategory);
  // console.log("Selected :", selectedPriceAscDesc);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // if (isError) {
  //   return <p>Error fetching products</p>;
  // }

  if (!productsData || productsData.length === 0) {
    return <p>No products found for this vendor.</p>;
  }
  const handleFollow = async (vendorId: string) => {
    try {
      await startFollow({ vendorId, userId }).unwrap();
      setLocalFollowStatus("Following"); // Update the local state
      followStatusRefetch();
      followCountRefetch();
    } catch (error: any) {
      Swal.fire(`Error following: ${vendorId}`, error);
    }
  };

  const handleUnFollow = async (vendorId: string) => {
    try {
      await startUnFollow({ vendorId, userId }).unwrap();
      setLocalFollowStatus("NeedFollow"); // Update the local state
      followStatusRefetch();
      followCountRefetch();
    } catch (error: any) {
      Swal.fire(`Error unfollowing: ${vendorId}`, error);
    }
  };

  console.log("localFollowStatus", followData, vendorId);

  return (
    <div>
      <div className="w-full h-full min-h-screen">
        {/* ****************************************************************************************************** */}
        {/* Product welcome banner section */}
        <div
          className="hero h-36"
          style={{
            backgroundImage:
              "url(https://i.postimg.cc/tgj1Lp4Q/pexels-pixabay-531880.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-40"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-lg">
              <div className="mb-2 text-5xl font-bold text-white">
                <div className="flex flex-row items-end justify-center gap-2">
                  <p>
                    <img
                      src={vendor.image}
                      alt=""
                      className="w-16 h-16 rounded-full"
                    />
                  </p>
                  <p> {shopName}</p>
                </div>
                {/* <h1 className="mb-5 text-3xl font-bold text-white">
                  Buy your Suitable Product & Enjoy
                </h1> */}
              </div>
            </div>
          </div>
        </div>
        {/* ****************************************************************************************************** */}
        {/* ****************************************************************************************************** */}
        {/* Product welcome banner section */}
        {/* title bar section */}
        <div className="navbar mt-2  flex flex-col md:flex-row gap-2     flex-wrap">
          <div className="text-white disabled:">
            {selectedPriceAscDesc}
            {searchText},{selectedCategory}
          </div>
          {/* ****************************************************************************************************** */}
          {/* title bar left section */}
          <div className="w-full  flex flex-row justify-between pb-5 px-16">
            <div>
              <a className=" text-4xl font-bold underline pl-3">
                ALL PRODUCTS -
                <span className="text-blue-600 text-4xl uppercase pl-2">
                  {shopName}
                </span>
              </a>
            </div>
            <div className="flex flex-row gap-2 align-middle pr-4">
              <span className="text-blue-500 font-bold text-lg">
                FollowedBY: {followerData?.data?.length || 0}
              </span>
              {localFollowStatus === "NeedFollow" ? (
                <button
                  className="btn btn-primary"
                  // onClick={() => handleUnFollow(vendorId)}
                  onClick={() => vendorId && handleUnFollow(vendorId)}
                >
                  UnFollow
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  // onClick={() => handleFollow(vendorId)}
                  onClick={() => vendorId && handleFollow(vendorId)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          {/* title bar left section */}
          {/* ****************************************************************************************************** */}
          {/* ****************************************************************************************************** */}
          {/* title bar right section */}
          <div className="flex-none gap-2">
            {/******************  search *******************/}
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
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm bg-[#1A4870]"
                >
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
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm bg-[#1A4870]"
              >
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
                  {categories.map((category: TCategory) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryName}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </ul>
            </div>
            {/* *******filter by category******** */}
            {/* *******filter by price sort low to hight******** */}
            <div className="dropdown dropdown-bottom dropdown-end text-white dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm  bg-[#1A4870]"
              >
                <span className="hidden lg:block text-white">
                  Sort By Price
                </span>
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
          {/* title bar right section */}
          {/* ****************************************************************************************************** */}
        </div>
        {/* title bar section */}
        {/* ****************************************************************************************************** */}
        {/* ****************************************************************************************************** */}
        {/* ************************************all product shown****************************************************************** */}
        <div className="border border-2  "></div>
        {/* ****************all product shown********************************************* */}
        <motion.div
          // whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          // className="text-center"
        >
          <div className=" px-8 mt-5  w-full h-full my-10   text-black">
            <div className="flex flex-wrap justify-center align-middle gap-5   ">
              {displayedProducts.length === 0 ? (
                <p className="text-green-500 text-3xl font-semibold ">
                  Sorry, Nothing found!!
                </p>
              ) : (
                displayedProducts.map((product: TProduct) => (
                  <ProductsSingleView
                    key={product.productId}
                    product={product}
                  ></ProductsSingleView>
                ))
              )}
            </div>
            {/* *********************** */}
          </div>
        </motion.div>
        {/* ****************all product shown********************************************* */}

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
    </div>
  );
};

export default ShopPage;
