import { motion } from "framer-motion";
import {
  useGetAllCategoryQuery,
  useLazyGetAllProductQuery,
} from "../../Redux/features/produtcs/productsApi";
import ProductsSingleView from "../../Components/AllProductPage/ProductsSingleView";

import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSearch, FaSortNumericDown } from "react-icons/fa";
import { MdManageSearch, MdPriceCheck } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const AllProductSection = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceAscDesc, setSelectedPriceAscDesc] = useState("");

  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const categories = categoryData?.data || [];
  // Lazy query hook
  const [fetchProducts, { data, isLoading, isError, isFetching }] =
    useLazyGetAllProductQuery();

  const fetchedProducts = data?.data || [];

  // Append new products to the products state
  useEffect(() => {
    if (fetchedProducts.length > 0) {
      setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      setDisplayedProducts((prevProducts) => [
        ...prevProducts,
        ...fetchedProducts,
      ]);
      if (fetchedProducts.length < 10) setHasMore(false); // If less than 10 items, assume no more
    }
  }, [fetchedProducts]);

  const fetchNextPage = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page to load the next batch
    }
  };

  // Fetch products when the page changes
  useEffect(() => {
    if (hasMore) {
      fetchProducts(page); // Trigger fetch based on page number
    }
  }, [page, fetchProducts, hasMore]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchText = form.SearchText.value.toLowerCase();
    setSearchText(searchText);

    const filteredProducts = products.filter(
      (product: Product) =>
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
      (product: Product) =>
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
      (product: Product) => product.category === selectedValue
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
    setDisplayedProducts(products); // Reset to initial product list
  };

  return (
    <div className="w-full h-full min-h-screen">
      {/* title bar left section */}
      <div className="flex-1 ">
        <a className=" text-4xl font-bold underline pl-3">ALL PRODUCTS: </a>
      </div>
      {/* title bar right section */}
      <div className="navbar mt-2  flex flex-col md:flex-row gap-2     flex-wrap">
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
                <option disabled defaultValue="Select Category">
                  Select Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.categoryName}>
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
      </div>
      {/* title bar right section */}

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
            <InfiniteScroll
              dataLength={displayedProducts.length}
              next={fetchNextPage} // Function to fetch next set of data
              hasMore={hasMore} // Whether there are more posts to fetch
              loader={
                <div className="flex justify-center items-center py-4">
                  <div className="spinner-border text-blue-500" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              }
              endMessage={
                <p className="text-center text-gray-500">
                  No more products to load
                </p>
              }
              scrollThreshold={0.95} // Trigger next page when scroll is 95% down
              scrollableTarget="scrollableDiv" // Target scroll container
            >
              <div className="flex flex-wrap justify-center align-middle gap-5">
                {displayedProducts.length === 0 ? (
                  <p className="text-green-500 text-3xl font-semibold">
                    Sorry, Nothing found!!
                  </p>
                ) : (
                  displayedProducts.map((product: any, index: number) => (
                    <ProductsSingleView
                      key={`${product.productId}-${index}`}
                      product={product}
                    />
                  ))
                )}
              </div>
            </InfiniteScroll>
          </div>

          {/* *********************** */}
        </div>
      </motion.div>

      {/* Loading Spinner */}
      {/* Loading Spinner */}

      {/* ****************all product shown********************************************* */}
    </div>
  );
};

export default AllProductSection;
