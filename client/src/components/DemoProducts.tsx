// src/components/DemoProducts.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { Heart, HeartOff } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

// Use environment variable for Socket.io backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const socket: Socket = io(BACKEND_URL);

const DemoProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);
  const isWishlisted = (id: number) => wishlistItems.some(item => item.id === id);

  // Real-time product updates with WebSocket
  useEffect(() => {
    socket.on("productData", (data: Product[]) => {
      setProducts(data);
    });

    return () => {
      socket.off("productData");
    };
  }, []);

  return (
    <div className="p-5">
      <div className="flex flex-wrap justify-center gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl p-4 w-60 hover:scale-105 transition-transform duration-200 relative"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-3"
            />
            <h3 className="text-sm font-semibold h-12 overflow-hidden">{product.title}</h3>
            <p className="text-lg font-bold mt-2">₹{product.price}</p>

            {/* Wishlist Btn */}
            <button
              onClick={() =>
                isWishlisted(product.id)
                  ? dispatch(removeFromWishlist(product.id))
                  : dispatch(addToWishlist(product))
              }
              className="absolute top-3 right-3 text-red-500 hover:scale-110 transition-transform"
            >
              {isWishlisted(product.id) ? <HeartOff size={20} /> : <Heart size={20} />}
            </button>

            {/* Add to Cart */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  navigate(`/product/${product.id}`);
                }}
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>

              {/* View Btn */}
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoProducts;
