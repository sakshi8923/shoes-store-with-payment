import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) return;
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        dispatch(clearCart());
        navigate('/');
      }, 2000);
    }, 2000);
  };

  const handleBackToCart = () => {
    navigate('/');
  };

  if (cart.items.length === 0 && !paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 text-base sm:text-lg mb-4">Your cart is empty</p>
          <button
            onClick={handleBackToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 text-sm sm:text-base">Redirecting you to shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <button
          onClick={handleBackToCart}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Shopping Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <CreditCard className="text-blue-600" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Payment Details</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start sm:items-center gap-2 mb-4 text-xs sm:text-sm text-gray-600">
                <Lock size={14} className="flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base"
              >
                {isProcessing ? 'Processing...' : `Pay $${cart.totalAmount.toFixed(2)}`}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Order Summary</h2>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4 pb-3 sm:pb-4 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-sm sm:text-base">
                      ${item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                <span>Subtotal:</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                <span>Tax:</span>
                <span>${(cart.totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total:</span>
                <span className="text-blue-600">
                  ${(cart.totalAmount * 1.1).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
