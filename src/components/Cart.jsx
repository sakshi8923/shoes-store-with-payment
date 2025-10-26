import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart, Trash2, CreditCard, X } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleIncrease = (item) => dispatch(addToCart(item));
  const handleDecrease = (id) => dispatch(removeFromCart(id));

  const handleProceedToPayment = () => {
    if (cart.items.length > 0) navigate("/payment");
  };

  const getTotalItems = () => cart.totalQuantity;
  const getTotalPrice = () => cart.totalAmount;

  return (
    <>
      {/* Floating Cart Button (Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden bg-indigo-600 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2"
      >
        <ShoppingCart size={24} />
        {cart.totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cart.totalQuantity}
          </span>
        )}
      </button>

      {/* Cart Panel */}
      <div
        className={`fixed right-0 h-[calc(100vh-64px)] top-[64px] w-full sm:w-96 bg-white shadow-2xl overflow-y-auto z-30 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2 py-1 rounded-full">
                {getTotalItems()}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Empty Cart */}
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some shoes to get started</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="font-semibold text-indigo-600">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>

                      <span className="w-8 text-center font-medium">{item.quantity}</span>

                      <button
                        onClick={() => handleIncrease(item)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>

                      <button
                        onClick={() => handleDecrease(item.id)} // You can replace with deleteFromCart
                        className="p-1 hover:bg-red-100 rounded-full transition-colors ml-2"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total + Checkout */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{getTotalPrice().toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        />
      )}
    </>
  );
};

export default Cart;
