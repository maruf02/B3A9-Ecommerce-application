import { useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useAppDispatch } from "../../Redux/hooks";
import { logout } from "../../Redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { clearViewedProducts } from "../../Redux/features/CartItem/viewSlice";

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

const adminItems: MenuItem[] = [
  { key: "1", icon: <PieChartOutlined />, label: "Dashboard" },
  { key: "8", icon: <PieChartOutlined />, label: "Profile" },
  { key: "9", icon: <PieChartOutlined />, label: "News Letter" },
  { key: "2", icon: <DesktopOutlined />, label: "Manage Categories" },
  { key: "3", icon: <DesktopOutlined />, label: "Transaction Monitor" },
  { key: "4", icon: <DesktopOutlined />, label: "Review Activities" },
  { key: "5", icon: <DesktopOutlined />, label: "User Management" },
  {
    key: "6",
    icon: <DesktopOutlined />,
    label: "Vendors Management",
  },
  { key: "7", icon: <DesktopOutlined />, label: "Homepage" },
];

const vendorItems: MenuItem[] = [
  { key: "1", icon: <PieChartOutlined />, label: "Dashboard" },
  { key: "6", icon: <PieChartOutlined />, label: "Profile" },
  { key: "7", icon: <PieChartOutlined />, label: "Coupon Management" },
  { key: "2", icon: <DesktopOutlined />, label: "Manage Products" },
  { key: "3", icon: <DesktopOutlined />, label: "Order History" },
  { key: "4", icon: <ContainerOutlined />, label: "Customer Reviews" },
  { key: "5", icon: <ContainerOutlined />, label: "Homepage" },
];

const userItems: MenuItem[] = [
  { key: "1", icon: <PieChartOutlined />, label: "DashBoard" },
  { key: "2", icon: <ContainerOutlined />, label: "Profile" },
  { key: "3", icon: <DesktopOutlined />, label: "Cart Item" },
  { key: "4", icon: <DesktopOutlined />, label: "Purchase Management" },
  // { key: "3", icon: <ContainerOutlined />, label: "Payment Management" },
  { key: "5", icon: <ContainerOutlined />, label: "Homepage" },
];

interface User {
  role: string;
  email: string;
}

const NavBarDashBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const { role, email } = user;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearViewedProducts());
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const { key } = e;

    switch (role) {
      case "ADMIN":
        switch (key) {
          case "1":
            navigate("/DashBoard/admin");
            break;
          case "2":
            navigate("/DashBoard/admin/ManageCategory");
            break;
          case "3":
            navigate("/DashBoard/TransactionMonitor");
            break;
          case "4":
            navigate("/DashBoard/ReviewActivities");
            break;
          case "5":
            navigate("/DashBoard/admin/ManageUsers");
            break;
          case "6":
            navigate("/DashBoard/admin/ManageVendors");
            break;
          case "7":
            navigate("/");
            break;
          case "8":
            navigate("/DashBoard/admin/adminProfile");
            break;
          case "9":
            navigate("/DashBoard/admin/newsLetter");
            break;
          default:
            break;
        }
        break;

      case "VENDOR":
        switch (key) {
          case "1":
            navigate("/DashBoard/vendor");
            break;
          case "2":
            navigate("/DashBoard/vendor/ManageProducts");
            break;
          case "3":
            navigate("/DashBoard/vendor/OrderManagement");
            break;
          case "4":
            navigate("/DashBoard/vendor/CustomerReview");
            break;
          case "5":
            navigate("/");
            break;
          case "6":
            navigate("/DashBoard/vendor/vendorProfile");
            break;
          case "7":
            navigate("/DashBoard/vendor/coupon");
            break;
          default:
            break;
        }
        break;

      case "USER":
        switch (key) {
          case "1":
            navigate("/DashBoard/user");
            break;
          case "2":
            navigate("/DashBoard/user/userProfile");
            break;
          case "3":
            navigate("/DashBoard/user/cartView");
            break;
          case "4":
            navigate("/DashBoard/user/purchaseManagement");
            break;
          case "5":
            navigate("/");
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <div className="hidden lg:block">
        <div>
          <div className="pt-2 pb-0">
            <section className="text-xl font-bold text-center justify-center align-middle">
              {role.charAt(0).toUpperCase() + role.slice(1)} DashBoard
            </section>
            <section className="text-md font-semibold text-center">
              Hello: {email}
            </section>
            <section className="text-md font-semibold text-center pt-2">
              <Button onClick={handleLogout} type="primary" danger>
                Logout
              </Button>
            </section>
          </div>
          <div style={{ width: 256 }}>
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ marginBottom: 16, backgroundColor: "#48CFCB" }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="light"
              inlineCollapsed={collapsed}
              items={
                role === "ADMIN"
                  ? adminItems
                  : role === "VENDOR"
                  ? vendorItems
                  : userItems
              }
              onClick={handleMenuClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarDashBoard;
