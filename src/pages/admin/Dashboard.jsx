import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import {
  BanknotesIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Chart from "../../components/Dashboard/Chart";
import Bar from "../../components/Dashboard/Bar";

const Dashboard = ({ products, users }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const calcTotalSales = () => {
    const totalAmt = products.reduce((a, b) => {
      return a + Number(b.price);
    }, 0);
    setTotalSales(totalAmt);
  };

  useEffect(() => {
    if (products.length) {
      setProductCount(products.length);
      setUserCount(users.length);
      calcTotalSales();
    }
  }, [products]);

  return (
    <section className="mt-3 mr-4">
      <div className="flex items-center gap-6">
        <DashboardCard
          title={"Total Sales"}
          count={`${totalSales}MMK`}
          icon={BanknotesIcon}
          note={"MMK"}
        />
        <DashboardCard
          title={"Active User"}
          count={userCount}
          icon={UserGroupIcon}
          note={"Users"}
        />
        <DashboardCard
          title={"Products"}
          count={productCount}
          icon={ShoppingCartIcon}
          note={"Items"}
        />
      </div>
      <Chart products={products} />
      <Bar products={products} />
    </section>
  );
};

export default Dashboard;
