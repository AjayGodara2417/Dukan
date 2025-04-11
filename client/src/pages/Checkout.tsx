import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { clearCart } from '../features/CartSlice';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: { razorpay_payment_id: string }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface Coupon {
  code: string;
  discount: number;
}

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const originalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalAmount = originalAmount - discountAmount;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    fetch('/coupons.json')
      .then(res => res.json())
      .then(data => setCoupons(data));
  }, []);

  const handleApplyCoupon = () => {
    const matched = coupons.find(c => c.code === couponCode.trim().toUpperCase());

    if (matched) {
      const discount = (originalAmount * matched.discount) / 100;
      setDiscountAmount(discount);
      setAppliedCoupon(matched.code);
    } else {
      alert('Invalid coupon code!');
      setDiscountAmount(0);
      setAppliedCoupon(null);
    }
  };

  const handlePayment = () => {
    if (totalAmount === 0) {
      alert("Cart is empty. Add some products first.");
      return;
    }

    const options = {
      key: 'rzp_test_DfaRBmBCZyDikX',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Dukan E-Commerce',
      description: 'Order Payment',
      image: 'https://yourdomain.com/logo.png',
      handler: function (response: any) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        dispatch(clearCart());
        navigate('/');
      },
      prefill: {
        name: 'Demo User',
        email: 'demo@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'TASKIt Store - India',
        couponUsed: appliedCoupon || 'None',
      },
      theme: {
        color: '#4F46E5',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Checkout</h1>

        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          {item.quantity} x ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="font-bold text-gray-700">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Coupon Input */}
              <div className="mt-6">
                <label htmlFor="coupon" className="block font-medium mb-2">Apply Coupon Code:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                    placeholder="Enter coupon code"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-1">Coupon "{appliedCoupon}" applied!</p>
                )}
              </div>

              {/* Total */}
              <div className="border-t pt-4 mt-4 text-right text-lg font-semibold">
                Subtotal: ₹{originalAmount.toFixed(2)} <br />
                {discountAmount > 0 && (
                  <>
                    Discount: -₹{discountAmount.toFixed(2)} <br />
                  </>
                )}
                <span className="text-xl">Total: ₹{totalAmount.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePayment}
                className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition"
              >
                Pay ₹{totalAmount.toFixed(2)} Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
