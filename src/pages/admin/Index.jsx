import { message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import Users from "./Users";
import { getAllUser, getProducts } from "../../apicalls/admin";
import General from "./General";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { BellAlertIcon, ChartBarIcon, SwatchIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer.user);

  const getAllProduct = async () => {
    try {
      const res = await getProducts();
      if (res.isSuccess) {
        setProducts(res.products);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const isAdmin = () => {
    if (user.role !== "admin") {
      navigate("/");
    }
  };

  const getUsers = async () => {
    try {
      const res = await getAllUser();
      if (res.isSuccess) {
        setUsers(res.users);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    isAdmin();
    getAllProduct();
    getUsers();
  }, [activeTabKey]);

  const handleOnChange = (key) => {
    setActiveTabKey(key);
  };

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <ChartBarIcon width={20} />
          Dashboard
        </span>
      ),
      children: <Dashboard products={products} users={users} />,
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Manage Products
        </span>
      ),
      children: <Products products={products} getAllProduct={getAllProduct} />,
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <UsersIcon width={20} />
          Manage Users
        </span>
      ),
      children: <Users users={users} getUsers={getUsers} />,
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
        </span>
      ),
      children: "Content of Tab Pane 2",
    },
    {
      key: "5",
      label: (
        <span className="flex items-start gap-2">
          <UserIcon width={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];

  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => handleOnChange(key)}
        items={items}
        tabPosition="left"
        size="large"
      />
    </section>
  );
};

export default Index;
