import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
  
      <div className="h-48 sm:h-56 lg:h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex-1 mr-2">{product.name}</h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded whitespace-nowrap">
            {product.category}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">{product.brand}</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
