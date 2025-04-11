import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/CartSlice";
import { RootState } from "../app/store";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const productId = Number(id);

  const [product, setProduct] = useState<{
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
  } | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/product/product?id=${productId}`
        );
        const data = await response.json();console.log(data)
        setProduct(data.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const cartItem = useSelector((state: RootState) =>
    state.cart.cartItems.find((item) => item.id === productId)
  );

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product}));
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-80 text-lg font-semibold">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-10 mt-10 bg-white shadow-lg rounded-xl">
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-auto object-contain"
        />
      </div>

      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-700 text-sm">{product.description}</p>
        <p className="text-xl font-semibold text-green-600">
          ₹{product.price}
        </p>

        {cartItem ? (
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => dispatch(decrementQuantity(productId))}
              disabled={cartItem.quantity <= 1}
              className={`px-4 py-2 rounded-md text-white text-lg ${
                cartItem.quantity <= 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              -
            </button>
            <span className="text-lg font-bold">{cartItem.quantity}</span>
            <button
              onClick={() => dispatch(incrementQuantity(productId))}
              className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-lg"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
