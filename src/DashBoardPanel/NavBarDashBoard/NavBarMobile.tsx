import { useAppDispatch } from "../../Redux/hooks";
import { logout } from "../../Redux/features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
interface User {
  email: string;
  role: string;
}

const adminMenu = (
  <>
    <li>
      <NavLink to="/DashBoard/admin" className="activeNavLink ">
        <button>Dashboard</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/admin/ManageCategory" className="activeNavLink ">
        <button>Manage Categories</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/TransactionMonitor" className="activeNavLink ">
        <button>Transaction Monitor</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/ReviewActivities" className="activeNavLink ">
        <button>Review Activities</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/admin/ManageUsers" className="activeNavLink ">
        <button>User Management</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/" className="activeNavLink ">
        <button>Homepage</button>
      </NavLink>
    </li>
  </>
);
const vendorMenu = (
  <>
    <li>
      <NavLink to="/DashBoard/user" className="activeNavLink ">
        <button>DashBoard</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/vendor/ManageProducts" className="activeNavLink ">
        <button>Manage Products</button>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/DashBoard/vendor/OrderManagement"
        className="activeNavLink "
      >
        <button>Order History</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/vendor/CustomerReview" className="activeNavLink ">
        <button>Customer Reviews</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/" className="activeNavLink ">
        <button>Homepage</button>
      </NavLink>
    </li>
  </>
);
const userMenu = (
  <>
    <li>
      <NavLink to="/DashBoard/user" className="activeNavLink ">
        <button>DashBoard</button>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/DashBoard/user/purchaseManagement"
        className="activeNavLink "
      >
        <button>Purchase Management</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/user/userProfile" className="activeNavLink ">
        <button>Profile</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/" className="activeNavLink ">
        <button>Homepage</button>
      </NavLink>
    </li>
  </>
);
const NavBarMobile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const { role, email } = user;
  const handleLogout = () => {
    console.log("object");
    dispatch(logout());
    navigate("/login");
  };
  if (!user) {
    navigate("/login");
  }
  return (
    <div className="w-full">
      <div className="navbar  ">
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl font-semibold">PeraCommerce</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#295F98]  rounded-box z-[10] mt-3 w-52 p-2 shadow"
            >
              <li>{email}</li>
              {role === "ADMIN" ? (
                <>{adminMenu}</>
              ) : role === "VENDOR" ? (
                <>{vendorMenu}</>
              ) : (
                <>{userMenu}</>
              )}
              {/* {adminMenu} */}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarMobile;
