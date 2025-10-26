import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { products } from "../data/products";

import { addToCart } from "../store/cartSlice";

import { ShoppingCart, Star, Plus } from "lucide-react";

import SearchBar from "../components/SearchBar";

import Cart from "../components/Cart";
 
const Shop = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
 
  const filteredProducts = products.filter((product) => {

    if (!product) return false;

    const searchLower = searchTerm.toLowerCase();

    // Safe filtering with optional chaining and fallbacks

    return (

      product.name?.toLowerCase().includes(searchLower) ||

      product.brand?.toLowerCase().includes(searchLower) ||

      product.category?.toLowerCase().includes(searchLower)

    );

  });
 
  const handleAddToCart = (product) => {

    dispatch(addToCart(product));

  };
 
  return (
<div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">

      {/* --- Header Section --- */}
<header className="bg-white shadow-sm border-b sticky top-0 z-40">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Left: Logo & Tagline */}
<div className="flex items-center space-x-2">
<h1 className="text-2xl font-bold text-gray-900">SoleStore</h1>
<span className="text-sm text-gray-500">Premium Footwear</span>
</div>
 
          {/* Center: Search Bar */}
<div className="flex-1 mx-6 hidden md:block max-w-md w-full">
<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
</div>
 
          {/* Right: Cart Icon */}
<div className="flex items-center gap-2 text-gray-700">
<ShoppingCart className="h-5 w-5 text-indigo-600" />
<span className="font-medium">{cartTotalQuantity} items</span>
</div>
</div>
 
        {/* Search for Mobile */}
<div className="block md:hidden px-4 pb-3">
<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
</div>
</header>
 
      {/* --- Product Section --- */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:mr-96">
<div className="mb-6">
<h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Shoes</h2>
<p className="text-gray-600">Discover our premium collection of footwear</p>
</div>

        {filteredProducts.length === 0 ? (
<div className="text-center py-12">
<p className="text-gray-500 text-base sm:text-lg">

              No products found matching your search.
</p>
</div>

        ) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {filteredProducts.map((shoe) => (
<div

                key={shoe.id}

                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
>
<div className="relative overflow-hidden">
<img

                    src={shoe.image}

                    alt={shoe.name}

                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"

                  />

                  {shoe.originalPrice && (
<div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">

                      Sale
</div>

                  )}
</div>
 
                <div className="p-6">
<div className="flex items-center justify-between mb-2">
<span className="text-sm font-medium text-gray-500 uppercase tracking-wide">

                      {shoe.brand}
</span>
<div className="flex items-center gap-1">
<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
<span className="text-sm text-gray-600">

                        {shoe.rating || 4.5}
</span>
</div>
</div>
 
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">

                    {shoe.name}
</h3>
 
                  <div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="text-2xl font-bold text-gray-900">

                        ₹{shoe.price?.toLocaleString()}
</span>

                      {shoe.originalPrice && (
<span className="text-lg text-gray-500 line-through">

                          ₹{shoe.originalPrice?.toLocaleString()}
</span>

                      )}
</div>
 
                    <button

                      onClick={() => handleAddToCart(shoe)}

                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
>
<Plus className="h-4 w-4" />

                      Add to Cart
</button>
</div>
</div>
</div>

            ))}
</div>

        )}
</main>
 
      {/* --- Cart Sidebar --- */}
<Cart />
</div>

  );

};
 
export default Shop;
 