import { Link } from "react-router-dom";
import navLogo from "../../assests/app_logo_2.png";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/axios";
import toast from "react-hot-toast"
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");
      dispatch(logout(res.data.user));
      toast.success("Logout successful!");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Logout failed");
    }
  }

  return (
    <nav className="bg-white w-full border-b-2 border-gray-300 flex items-center justify-between px-10">
      <Link to="/" className="flex-shrink-0">
        <img src={navLogo} alt="Logo" className="w-32 object-cover" />
      </Link>

      <div className="flex-1 flex justify-center">
        <ul className="flex items-center gap-10 list-none">
          {["Home", "Menu", "Cart", "Orders", "Profile"].map((item, index) => (
            <li key={index} className="text-lg font-medium">
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-black hover:text-yellow-500 hover:border-b-2 hover:border-yellow-400 transition-all duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Link
            to="/"
            onClick={handleLogout}
            className="px-5 py-2 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800 transition-all duration-200"
          >
            Logout
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-yellow-400 text-black text-lg font-semibold rounded hover:bg-yellow-500 transition-all duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;