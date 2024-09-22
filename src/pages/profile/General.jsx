import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../../store/slices/userSlice";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, username, role } = useSelector(
    (state) => state.reducer.user.user
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mt-8 mb-4 text-blue-600">General</h1>
      <p className="text-lg font-medium mb-2">Email: {email}</p>
      <p className="text-lg font-medium mb-2">Username: {username}</p>
      <p className="text-lg font-medium mb-2">Role: {role}</p>
      <button
        type="button"
        className="text-white bg-red-600 font-medium px-3 py-2 rounded-md"
        onClick={() => {
          logoutHandler();
        }}
      >
        Logout
      </button>
    </section>
  );
};

export default General;
