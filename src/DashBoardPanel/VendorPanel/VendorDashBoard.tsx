import { TbCurrencyTaka } from "react-icons/tb";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetProductByShopNameQuery } from "../../Redux/features/produtcs/productsApi";
import { useOrderAllProductByVendorEmailQuery } from "../../Redux/features/produtcs/orderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { TProduct, TUser } from "../../types";
import SkeletonCard from "../../shared/SkeletonCard";

const VendorDashBoard = () => {
  const userDataToken =
    (useSelector((state: RootState) => state.auth.user) as TUser) || null;
  const email = userDataToken?.email;

  const { data: productData, isLoading } = useGetProductByShopNameQuery(
    email as string
  );

  const products = productData?.data || [];

  const { data: orderData } = useOrderAllProductByVendorEmailQuery(
    email as string
  );
  const orders = orderData?.data || [];
  console.log(products, orders);
  // Calculate totals
  const totalProducts = products.length;
  const totalSoldItems = orders.length;
  const totalSoldAmount = orders.reduce(
    (sum: number, order: TProduct) => sum + (order.totalPrice || 0),
    0
  );

  // Prepare graph data
  const chartData = [
    {
      name: "Total Items",
      value: totalProducts * 2000,
      original: totalProducts,
    },
    {
      name: "Sold Items",
      value: totalSoldItems * 2000,
      original: totalSoldItems,
    },
    {
      name: "Sold Amount",
      value: totalSoldAmount,
      original: totalSoldAmount,
    },
  ];
  if (isLoading)
    return (
      <div className="w-full min-h-screen flex flex-wrap justify-center gap-5 py-5">
        {/* Render 6 skeleton cards as placeholders */}
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  return (
    <div className="w-full h-full min-h-screen px-12 my-10">
      {/* Count Portion */}
      <h1 className="text-black text-3xl font-bold underline">Overview:</h1>
      <div className="w-full h-fit flex flex-col md:flex-row lg:flex-row gap-5 justify-between mb-20">
        <div>
          <div className="card w-fit shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Items</h2>
              <h2 className="card-title">{totalProducts} Pcs</h2>
            </div>
          </div>
        </div>
        <div>
          <div className="card w-fit shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Sold Items</h2>
              <h2 className="card-title">{totalSoldItems} Pcs</h2>
            </div>
          </div>
        </div>
        <div>
          <div className="card w-fit shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Sold Amount</h2>
              <h2 className="card-title flex items-center gap-1">
                <TbCurrencyTaka />
                {totalSoldAmount}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Graph Portion */}
      <h1 className="text-black text-3xl font-bold underline pb-10">
        Graph Overview:
      </h1>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string, props: any) => {
                if (!props || !props.payload) return `${value} (${name})`;
                const unit =
                  props.payload.name === "Sold Amount" ? "Tk" : "pcs";
                return `${props.payload.original} ${unit}`;
              }}
            />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VendorDashBoard;
