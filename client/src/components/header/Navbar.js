import { Link } from "react-router-dom";
import navLogo from "../../assests/app_logo_2.png";

const Navbar = () => {
  return (
    <nav className="bg-white w-full border-b-2 border-gray-500 flex items-center justify-between px-6">

      <Link to="/" className="w-32">
        <img src={navLogo} alt="Logo" className="object-cover" />
      </Link>

      <ul className="flex items-center justify-start list-none">
        {["Home", "Menu", "Cart", "Orders", "Profile"].map((item, index) => (
          <li key={index} className="mx-4 text-lg font-medium">
            <Link
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-black hover:border-t-2 hover:border-yellow-400 hover:text-black"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 ml-10">
        <Link
          to="/login"
          className="px-5 py-2 bg-black text-white text-lg font-semibold rounded hover:text-[18px] transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-5 py-2 bg-yellow-400 text-black text-lg font-semibold rounded hover:bg-yellow-500 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;