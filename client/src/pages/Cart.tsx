import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromCart, incrementQuantity, decrementQuantity} from "../features/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total
  const productTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = cartItems.length > 0 ? 0 : 0;
  const totalAmount = productTotal + shippingCost;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 items-center h-[68vh] max-h-full">
      <h2 className="text-3xl font-bold text-center mb-8">Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left - Cart Items */}
          <div className="md:col-span-2 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Item List</h3>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border-b border-gray-300"
              >
                {/* Product Image */}
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />

                {/* Product Details */}
                <div className="flex-1 px-4">
                  <h4 className="text-md font-semibold">{item.title}</h4>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="px-3 py-1 bg-gray-300 text-black rounded-md"
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>

                  <span className="text-lg font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="px-3 py-1 bg-gray-300 text-black rounded-md"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Remove Button */}
                <div className="text-right flex gap-3 ml-5 items-center">
                  <p className="font-semibold">1 x ₹{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="mt-2 border-2 p-2 rounded-md text-white bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Order Summary */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="mb-2 flex justify-between">
              <span>Products ({cartItems.length})</span>
              <span>₹{productTotal.toFixed(2)}</span>
            </div>

            <div className="mb-2 flex justify-between">
              <span>Shipping</span>
              <span>₹{shippingCost}</span>
            </div>

            <div className="border-t border-gray-400 my-2"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full px-4 py-2 bg-black text-white rounded-md"
            >
              Go to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
