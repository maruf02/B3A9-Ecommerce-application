// import React, { useState } from "react";
import { useGetAllVendorQuery } from "../../Redux/features/vendor/vendorApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import StarRatings from "react-star-ratings";
import { TShopName } from "../../types";
import moment from "moment";
import SkeletonCard from "../../shared/SkeletonCard";

const AllShopPage = () => {
  const { data: vendorsData, isLoading } = useGetAllVendorQuery(undefined);
  const vendors = vendorsData?.data || [];
  console.log(vendors);

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex flex-wrap justify-center gap-5 py-5">
        {/* Render 6 skeleton cards as placeholders */}
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );

  return (
    <div>
      <div className="w-full h-full min-h-screen">
        {/* ****************************************************************************************************** */}
        {/* Product welcome banner section */}
        <div
          className="hero h-32"
          style={{
            backgroundImage:
              "url(https://i.postimg.cc/tgj1Lp4Q/pexels-pixabay-531880.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-40"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-lg">
              <h1 className="mb-5 text-3xl font-bold text-white">
                Buy your Suitable Product & Enjoy
              </h1>
            </div>
          </div>
        </div>
        <div className="border border-2  "></div>
        {/* ****************************************************************************************************** */}
        <motion.div
          // whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          // className="text-center"
        >
          <div className=" px-8 mt-5  w-full h-full my-10   text-black">
            <div className="flex flex-wrap justify-center align-middle gap-5   ">
              {vendors.length === 0 ? (
                <p className="text-green-500 text-3xl font-semibold ">
                  Sorry, Nothing found!!
                </p>
              ) : (
                vendors.map((vendor: TShopName) => (
                  <div className="card glass w-80 ">
                    <figure>
                      <img
                        src={vendor.image}
                        alt="car!"
                        className="w-80 h-60"
                      />
                    </figure>
                    <div className=" my-5 ">
                      <div className="space-y-0 pl-5">
                        <h2 className="card-title m-0 py-2 text-lg w-full h-20">
                          {vendor.shopName}
                        </h2>
                        <p className="m-0 text-md">
                          QTY: {moment(vendor.createdAt).format("YYYY-MM-DD")}
                        </p>
                        <div className="flex justify-between align-middle pr-5 pb-3">
                          <p className="m-0 text-md">
                            Total Product:{vendor.productCount}
                          </p>
                        </div>
                      </div>

                      <div className=" container mx-auto   mt-3   w-full flex flex-row gap-2">
                        <Link
                          to={`/shopPage/${vendor.shopName}/${vendor.vendorId}`}
                        >
                          <button className="btn btn-primary  w-full  ">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* *********************** */}
          </div>
        </motion.div>
        {/* ****************************************************************************************************** */}
      </div>
    </div>
  );
};

export default AllShopPage;
