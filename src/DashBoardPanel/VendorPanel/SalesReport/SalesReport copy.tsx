import React, { useState } from "react";
import {
  useGetAllCategoryQuery,
  useGetAllProductQuery,
} from "../../../Redux/features/produtcs/productsApi";
import { Pagination } from "antd";
import { FaSearch, FaSortNumericDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdManageSearch, MdPriceCheck } from "react-icons/md";

const SalesReport = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: productData,
    isError,
    isLoading,
    refetch,
  } = useGetAllProductQuery({
    page,
    limit,
  });

  const productPagination = productData?.data || [];
  const total = productData?.meta?.total;

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize && pageSize !== limit) {
      setLimit(pageSize);
    }
  };

  return (
    <div>
      <div></div>
      {/* Search Bar ***********************************************************************************/}
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
            {productPagination.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              productPagination.map((product: any, index: number) => (
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
          onShowSizeChange={handlePageChange}
          pageSizeOptions={["1", "2", "3", "5"]}
        />
      </div>
    </div>
  );
};

export default SalesReport;
