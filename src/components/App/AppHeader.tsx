import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Layout,
  Menu,
  type MenuProps,
} from "antd";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
const { Header } = Layout;

export default function AppHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      key: "/templates",
      icon: <SettingOutlined />,
      label: "Templates",
      onClick: () => navigate("/templates"),
    },
  ];

  const userMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        logout();
        navigate("/");
      },
    },
  ];

  return (
    <Header className="flex justify-between items-center py-0 px-4 shadow-md z-0">
      {/* Left side: Logo + Menu */}
      <div className="flex items-center space-x-4">
        <Image
          className="cursor-pointer"
          src="/logo.png"
          width={32}
          preview={false}
          onClick={() => navigate("/")}
        />
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          className="bg-transparent"
        />
      </div>

      {/* Right side: Auth controls */}
      <div>
        {user ? (
          <Dropdown menu={{ items: userMenu }} placement="bottomRight">
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        ) : (
          <div className="space-x-2">
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button type="primary" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        )}
      </div>
    </Header>
  );
}
