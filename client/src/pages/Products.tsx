import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlistSlice";
import { RootState } from "../app/store";
import { io } from "socket.io-client";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const socket = io("http://localhost:3000");

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const res = await fetch("http://192.168.18.19:3000/product/get-products");
  //     const data = await res.json();
  //     setProducts(data.data);
  //   };
  //   fetchProducts();
  // }, []);

  // Using WebSocket
    useEffect(() => {
      socket.on("productData", (data: Product[]) => {
        setProducts(data);
      });
  
      return () => {
        socket.off("productData");
      };
    }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const isWishlisted = (id: number) => wishlist.some((item) => item.id === id);

  const handleWishlistToggle = (product: Product) => {
    if (isWishlisted(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        All Products
      </h1>

      {/* Search, Filter, Sort Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(8);
          }}
          className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setVisibleCount(8);
          }}
          className="w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => {
            setSortOrder(e.target.value);
            setVisibleCount(8);
          }}
          className="w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-contain mb-4"
              />
              <h3 className="text-md font-semibold text-gray-700 truncate">{product.title}</h3>
              <p className="text-lg font-bold text-blue-600 mb-3">${product.price.toFixed(2)}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleWishlistToggle(product)}
                  className={`text-2xl transition ${
                    isWishlisted(product.id)
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                >
                  ♥
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* LAst message */}
      {visibleProducts.length >= filteredProducts.length && (
        <p className="text-center mt-10 text-gray-500">You've reached the end 🎉</p>
      )}
    </div>
  );
};

export default Products;
