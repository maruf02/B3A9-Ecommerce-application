import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store";
import { useAppDispatch } from "../Redux/hooks";
import { logout } from "../Redux/features/auth/authSlice";
import { clearViewedProducts } from "../Redux/features/CartItem/viewSlice";
import { TCategory, TShopName, TUser } from "../types";
import { useGetAllCategoryQuery } from "../Redux/features/produtcs/productsApi";
import { setSelectedCategory } from "../Redux/features/produtcs/productsSlice";
import { useGetAllVendorQuery } from "../Redux/features/vendor/vendorApi";
import Search from "antd/es/input/Search";
// import { MdManageAccounts } from "react-icons/md";
import { useGetUserByUserIdQuery } from "../Redux/user/userApi";

const Navbar = () => {
  // const [searchInput, setSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user) as TUser;
  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const categories = categoryData?.data || [];
  const { data: vendorsData } = useGetAllVendorQuery(undefined);
  const vendors = vendorsData?.data || [];

  const { userId } = user || "";

  const { data: usersData } = useGetUserByUserIdQuery(userId);
  const users = usersData?.data || [];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearViewedProducts());
    navigate("/login");
  };
  const onSearch = () => {
    navigate("/products");
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

      <li className="group relative dropdown-content">
        <details>
          <summary className="activeNavLink">Product</summary>
          {/* <button className="activeNavLink">Product</button> */}

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
        </details>
      </li>
      <li className="group relative">
        <details>
          <summary className="activeNavLink">Shop</summary>
          {/* <button className="activeNavLink ">Shop</button> */}
          <div
            className="absolute left-0 top-full hidden group-hover:block bg-white text-black p-4 shadow-lg rounded-md w-[470px]  "
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
        </details>
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
              <p className=" text-2xl font-bold text-white ">PeraCommerce</p>
            </div>
          </NavLink>
        </div>

        <div className="navbar-center   hidden lg:flex flex-col justify-center items-center  ">
          <div>
            <ul className="menu menu-horizontal px-1">{menu}</ul>
          </div>
        </div>

        <div className="navbar-end ">
          {/* /////////////////////////////////////////// */}
          <div className="text-xl lg:text-3xl font-semibold text-black mr-5 hidden md:block lg:block xl:block">
            <Search
              placeholder="search What you want!!!"
              onSearch={onSearch}
              // style={{ width: 400, height: "10px" }}
              className="md:w-60 lg:w-[80px] xl:w-[400px]"
              allowClear
            />
          </div>
          {/* cart section */}

          {/* search option */}

          {/* search option ***************************************************/}
          {/* cart section */}
          {/* /////////////////////////////////////////// */}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12  border-2 border-[#5B99C2] rounded-full  ">
                {/* <MdManageAccounts className="w-full h-full p-1" /> */}
                <img
                  src={
                    users?.image ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt=""
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1A4870] rounded-box z-[10] mt-3 w-fit p-2 shadow"
            >
              <li className="bg-[#1A4870]">
                {user ? (
                  <Link to={`/DashBoard/${user?.role}`}>
                    <button className="text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-sm justify-between  z-[10] ">
                      DashBoard
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
              </li>
              <li className="w-full bg-[#1A4870]">
                {user ? (
                  <>
                    <button
                      className="text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-sm justify-between  z-[10] "
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="w-full">
                    <Link to="/login">
                      <button className="text-white btn   hover:bg-[#5B99C2] btn-sm justify-between   z-[10] ">
                        Login
                      </button>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
          {/* <div className="mr-0">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
