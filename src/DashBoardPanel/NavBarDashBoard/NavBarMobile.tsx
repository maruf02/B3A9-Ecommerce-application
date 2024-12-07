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
      <NavLink to="/DashBoard/ManageCars" className="activeNavLink ">
        <button>Manage Car</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/ManageBooking" className="activeNavLink ">
        <button>Manage Booking</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/ManageReturn" className="activeNavLink ">
        <button>Manage Return</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/ManageUsers" className="activeNavLink ">
        <button>User Management</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/ReportGenerate" className="activeNavLink ">
        <button>Report</button>
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
      <NavLink to="/DashBoard/BookingManagement" className="activeNavLink ">
        <button>Booking Management</button>
      </NavLink>
    </li>
    <li>
      <NavLink to="/DashBoard/ManagePayment" className="activeNavLink ">
        <button>Payment Management</button>
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
          <a className="btn btn-ghost text-2xl font-semibold">SpeedeRex</a>
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
              {role === "admin" ? <>{adminMenu}</> : <>{userMenu}</>}
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
