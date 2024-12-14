import { motion } from "framer-motion";
import { useLazyGetAllProductQuery } from "../../Redux/features/produtcs/productsApi";
import ProductsSingleView from "../../Components/AllProductPage/ProductsSingleView";

import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const AllProductSection = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Lazy query hook
  const [fetchProducts, { data, isLoading, isError, isFetching }] =
    useLazyGetAllProductQuery();

  const fetchedPosts = data?.data || [];

  // Append new products to the posts state
  useEffect(() => {
    if (fetchedPosts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
      if (fetchedPosts.length < 10) setHasMore(false); // If less than 10 items, assume no more
    }
  }, [fetchedPosts]);

  const fetchNextPage = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page to load the next batch
    }
  };

  // Fetch products when the page or `hasMore` changes
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

  return (
    <div className="w-full h-full min-h-screen">
      {/* title bar left section */}
      <div className="flex-1 ">
        <a className=" text-4xl font-bold underline pl-3">ALL PRODUCTS: </a>
      </div>

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
              dataLength={posts.length}
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
                {posts.length === 0 ? (
                  <p className="text-green-500 text-3xl font-semibold">
                    Sorry, Nothing found!!
                  </p>
                ) : (
                  posts.map((product: any, index: number) => (
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
