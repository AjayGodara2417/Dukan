import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Cartlogo: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Calculate total quantity of items in cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <button className="hover:cursor-pointer relative" onClick={() => navigate("/cart")}>
      🛒
      {totalItemsInCart > 0 && (
        <span>
         {totalItemsInCart}
        </span>
      )}
    </button>
  );
};

export default Cartlogo;

