import { NavLink } from "react-router-dom";

const Navbar = () => {
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
        <NavLink to="/aboutus" className="activeNavLink ">
          <button>About</button>
        </NavLink>
      </li>

      <li>
        <NavLink to="/cars" className="activeNavLink ">
          <button>Cars</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Booking" className="activeNavLink ">
          <button>Booking</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/DashBoard" className="activeNavLink ">
          <button>DashBoard</button>
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="">
      <div className="navbar bg-[#1A4870] text-white">
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
              <p className=" text-2xl font-bold text-[#F9DBBA] ">SpeedeRex</p>
            </div>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>

        <div className="navbar-end ">
          {/* /////////////////////////////////////////// */}
          {/* cart section */}
          <div className="flex-none mr-3 ">
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
          <div className="mr-10">
            <NavLink to="/login">
              <button className="text-white btn bg-[#1A4870] hover:bg-[#5B99C2] btn-md justify-between w-full z-[10] ">
                Login
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
