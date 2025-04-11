import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromWishlist } from "../features/wishlistSlice";
import { useNavigate } from "react-router-dom";

const Wishlist: React.FC = () => {
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] px-6 py-12 bg-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        My Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No items in your wishlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 transition-transform duration-200 hover:scale-[1.02]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-contain mb-4"
              />
              <h4 className="text-md font-semibold mb-1 truncate">{item.title}</h4>
              <p className="text-xl font-bold text-blue-600 mb-3">₹{item.price}</p>

              <div className="flex justify-between gap-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  Remove
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
