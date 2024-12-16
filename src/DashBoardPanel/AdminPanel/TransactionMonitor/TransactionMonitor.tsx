import { useEffect, useState } from "react";
import { useGetAllOrderQuery } from "../../../Redux/features/produtcs/orderApi";
import { Pagination } from "antd";
import { TOrder } from "../../../types";

const TransactionMonitor = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orders, setOrders] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  console.log(orders);

  const {
    data: orderData,

    isLoading,
  } = useGetAllOrderQuery({ page, limit });

  const total = orderData?.meta?.total;
  console.log("total", total);
  useEffect(() => {
    if (orderData?.data) {
      setOrders(orderData?.data);
      setDisplayedProducts(orderData?.data);
    }
  }, [orderData]);

  if (isLoading)
    return (
      <div className="text-center py-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  // if (isError) return <div>Error loading products</div>;

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    if (pageSize && pageSize !== limit) {
      setLimit(pageSize);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between pt-5">
        <h2 className="text-2xl text-black font-semibold">
          Monitor Transaction
        </h2>
      </div>
      <div className="container mx-auto overflow-x-auto pb-5 w-full max-w-4xl">
        <table className="table w-full">
          <thead className="text-black text-lg">
            <tr>
              <th>ShopName</th>
              <th>VendorEmail</th>
              <th>UserEmail</th>
              <th>Items</th>
              <th>Price</th>
              <th>Payment</th>
              <th>TRId</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center">
                  <p className="text-green-500 text-3xl font-semibold ">
                    Sorry, No transaction found!!
                  </p>
                </td>
              </tr>
            ) : (
              displayedProducts.map((order: TOrder) => (
                <tr key={order.orderId} className="hover:bg-gray-300">
                  <td>
                    <div className="font-semibold">{order.shopName}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{order.vendorEmail}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{order.userEmail}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{order.totalItems}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{order.totalPrice}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{order.paymentMethod}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{order.transactionId}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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

export default TransactionMonitor;
