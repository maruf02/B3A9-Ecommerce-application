import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store";
import { useAppDispatch } from "../Redux/hooks";
import { logout } from "../Redux/features/auth/authSlice";
import { clearViewedProducts } from "../Redux/features/CartItem/viewSlice";
import { TCategory, TShopName, TUser } from "../types";
import { useGetAllCategoryQuery } from "../Redux/features/produtcs/productsApi";
import { setSelectedCategory } from "../Redux/features/produtcs/productsSlice";
import { useGetAllVendorQuery } from "../Redux/features/vendor/vendorApi";

const Navbar = () => {
  // const [searchInput, setSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user) as TUser;
  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const categories = categoryData?.data || [];
  const { data: vendorsData } = useGetAllVendorQuery(undefined);
  const vendors = vendorsData?.data || [];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearViewedProducts());
    navigate("/login");
  };

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category)); // Dispatch selected category
  };
  // const handleSearch = () => {
  //   dispatch(setSearchText(searchInput)); // Dispatch the search text to Redux
  // };
  // redux part for cart

  // console.log("objectPrice", total);
  // console.log("object", savedProducts.length);

  // redux part for cart
  const menu = (
    <>
      <li>
        <NavLink to="/" className="activeNavLink ">
          <button>Home</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/recentView" className="activeNavLink ">
          <button>RecentView</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/wishList" className="activeNavLink ">
          <button>WishList</button>
        </NavLink>
      </li>

      {/* <li>
        <NavLink to="/products" className="activeNavLink ">
          <button>Products</button>
        </NavLink>
      </li> */}

      <li className="group relative">
        <button className="activeNavLink">Product</button>
        <div
          className="absolute left-0 top-full hidden group-hover:block bg-white text-black p-4 shadow-lg rounded-md w-[470px]"
          style={{ backgroundColor: "#1A4870" }}
        >
          {/* Link to All Products */}
          <NavLink to="/products" className="block w-full">
            <button className="w-full activeNavLink text-lg btn bg-transparent hover:bg-white text-black">
              All Products
            </button>
          </NavLink>

          {/* Categories */}
          <div className="flex flex-row flex-wrap gap-4 pt-5">
            {categories.map((category: TCategory) => (
              <NavLink
                to={`/products`}
                key={category.categoryId}
                className="p-2 rounded-lg hover:shadow-lg hover:bg-white"
                onClick={() => handleCategorySelect(category.categoryName)}
              >
                <div>
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <p className="mt-2 text-center font-semibold">
                    {category.categoryName}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </li>
      <li className="group relative">
        <button className="activeNavLink">Shop</button>
        <div
          className="absolute left-0 top-full hidden group-hover:block bg-white text-black p-4 shadow-lg rounded-md w-[470px]"
          style={{ backgroundColor: "#1A4870" }}
        >
          {/* Link to All Products */}
          <NavLink to="/shop" className="block w-full">
            <button className="w-full activeNavLink text-lg btn bg-transparent hover:bg-white text-black">
              All Shop
            </button>
          </NavLink>

          {/* Categories */}
          <div className="flex flex-row flex-wrap gap-4 pt-5">
            {vendors.map((category: TShopName) => (
              <NavLink
                to={`/shopPage/${category.shopName}/${category.vendorId}`}
                key={category.vendorId}
                className="p-2 rounded-lg hover:shadow-lg hover:bg-white"
              >
                <div>
                  <img
                    src={category.image}
                    alt={category.shopName}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <p className="mt-2 text-center font-semibold">
                    {category.shopName}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </li>

      {/* <li>
        <NavLink to="/shop" className="activeNavLink ">
          <button>Shop</button>
        </NavLink>
      </li> */}
      <li>
        <NavLink to="/compareProduct" className="activeNavLink ">
          <button>Compare</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/cartView" className="activeNavLink ">
          <button>Cart</button>
        </NavLink>
      </li>
      <li>
        {user && (
          <NavLink to={`/DashBoard/${user?.role}`} className="activeNavLink ">
            <button>DashBoard</button>
          </NavLink>
        )}
      </li>
    </>
  );
  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-[#1A4870] text-white px-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1A4870] rounded-box z-[10] mt-3 w-52 p-2 shadow"
            >
              {menu}
            </ul>
          </div>
          <NavLink to="/">
            <div className="flex flex-row items-center gap-2">
              <img
                src="https://i.postimg.cc/sDKNspNc/creative-computer-logo-template-23-2149213537.jpg"
                alt=""
                className="w-14 h-14 rounded-2xl"
              />
              <p className=" text-2xl font-bold text-[#F9DBBA] ">
                PeraCommerce
              </p>
            </div>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>

        <div className="navbar-end ">
          {/* /////////////////////////////////////////// */}
          {/* cart section */}
          <div className="flex-none  ">
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              ></div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-[#1A4870] z-[10] mt-3 w-52 shadow"
              ></div>
            </div>
          </div>

          {/* search option */}
          {/* <div className="px-5">
            <label className="input input-bordered input-[#1A4870] flex items-center gap-2 bg-transparent ">
              <input
                type="text"
                className="grow w-96 text-white"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Link to="/products">
                <button
                  onClick={handleSearch}
                  className="btn btn-sm btn-primary ml-2"
                >
                  Search
                </button>
              </Link>
            </label>
          </div> */}
          {/* cart section */}
          {/* /////////////////////////////////////////// */}

          {/* <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12  border-2 border-[#5B99C2] rounded-full  ">
                <MdManageAccounts className="w-full h-full p-1" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1A4870] rounded-box z-[10] mt-3 w-52 p-2 shadow"
            >
              <NavLink to="/productManagement">
                <button className="text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-md justify-between w-full z-[10]">
                  Product Management
                </button>
              </NavLink>
              <li></li>
            </ul>
          </div> */}
          <div className="mr-0">
            {user ? (
              <>
                {" "}
                <button
                  className="text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-md justify-between w-full z-[10] "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {" "}
                <NavLink to="/login">
                  <button className="text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-md justify-between w-full z-[10] ">
                    Login
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
