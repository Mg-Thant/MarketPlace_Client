import React from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const Nav = () => {
  const { userId } = useSelector((state) => state.reducer.user);

  return (
    <nav className="bg-blue-500 flex items-center justify-between text-white p-4">
      <Link to={"/"} className="font-bold text-2xl">
        POINT.IO
      </Link>
      {userId ? (
        <Link
          to={"/profile"}
          className="bg-white text-blue-600 px-2 py-1 flex items-center gap-1 rounded-md"
        >
          <UserIcon width={20} />
          Profile
        </Link>
      ) : (
        <div className="flex items-center gap-4 text-base font-medium ">
          <Link
            to={"/login"}
            className="bg-white text-blue-600 px-2 py-1 flex items-center gap-1 rounded-md"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="bg-white text-blue-600 px-2 py-1 flex items-center gap-1 rounded-md"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
