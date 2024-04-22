import { Link } from 'react-router-dom';
import '../header/Navbar.css'; 
import navLogo from "../../assests/app_logo_2.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className='navbar-list'>
      <Link to="/">
        <div className='logo-img'>
          <img src={navLogo} alt=''/>
        </div>
      </Link>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/menu" className="navbar-link">Menu</Link>
        </li>
        <li className="navbar-item">
          <Link to="/cart" className="navbar-link">Cart</Link>
        </li>
        <li className="navbar-item">
          <Link to="/orders" className="navbar-link">Orders</Link>
        </li>
        <li className="navbar-item">
          <Link to="/account" className="navbar-link">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
