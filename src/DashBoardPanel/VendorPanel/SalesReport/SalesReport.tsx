import React from "react";
import { useGetAllProductQuery } from "../../../Redux/features/produtcs/productsApi";
import { MdDeleteForever } from "react-icons/md";
import { Pagination } from "antd";

const SalesReport = () => {
  const { data: productData, refetch: productsRefech } =
    useGetAllProductQuery(undefined);
  const produtcs = productData?.data || [];
  return (
    <div>
      <div>
        <label className="input input-bordered flex items-center gap-2 bg-gray-200">
          <input
            type="text"
            className="grow text-black bg-gray-200"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
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
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* table view */}
      <div className="w-full container mx-auto">
        <Pagination defaultCurrent={1} total={500} />
      </div>
    </div>
  );
};

export default SalesReport;
