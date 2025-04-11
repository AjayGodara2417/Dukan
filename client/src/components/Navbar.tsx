import { NavLink } from "react-router-dom";
// import Button from "../components/Button";
import Cartlogo from "./Cartlogo";

const Navbar = () => {
  const navLinkClass =
    "relative px-3 py-2 text-gray-700 font-medium hover:text-blue-600 hover:underline transition duration-200";

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-20">
      {/* Logo */}
      <NavLink to={"/"} className="text-2xl font-bold text-blue-700 tracking-wide">
        Dukan
      </NavLink>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6">
        <NavLink to="/" className={({ isActive }) =>
          `${navLinkClass} ${isActive ? "text-blue-600 underline" : ""}`
        }>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) =>
          `${navLinkClass} ${isActive ? "text-blue-600 underline" : ""}`
        }>
          Products
        </NavLink>
        <NavLink to="/about" className={({ isActive }) =>
          `${navLinkClass} ${isActive ? "text-blue-600 underline" : ""}`
        }>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
          `${navLinkClass} ${isActive ? "text-blue-600 underline" : ""}`
        }>
          Contact Us
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) =>
          `${navLinkClass} ${isActive ? "text-blue-600 underline" : ""}`
        }>
          Wishlist
        </NavLink>
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-4">
        <Cartlogo />
        {/* <Button text="Sign Up" onClick={() => (window.location.href = "/SignUp")} /> */}
      </div>
    </nav>
  );
};

export default Navbar;
