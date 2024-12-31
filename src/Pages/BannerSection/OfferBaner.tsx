import { NavLink } from "react-router-dom";

const OfferBaner = () => {
  return (
    <div className=" mx-12 my-5 bg-[#DDF1F5] rounded-lg card shadow-xl">
      <div className="w-full h-fit  py-5 flex flex-col md:flex-row lg:flex-row justify-between items-center ">
        <div className="px-5">
          <h1 className="text-base text-2xl">
            100% Authentic Quality Product, See Our latest discounted
          </h1>
          <p className="text-lg font-medium">
            {" "}
            products from here and get a special discount product
          </p>
        </div>

        <div className="text-base text-xl lg:text-3xl font-semibold text-black  mr-10">
          <NavLink to="/products" className="block w-full">
            <button className="btn btn-primary btn-md rounded-full md:px-10 text-base text-2xl">
              ShopNow
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default OfferBaner;
