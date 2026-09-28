import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import { Navbar } from "./ProductList";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar />

      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty 🌱</h2>
            <Link to="/plants">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-info">
                    <h2>{item.name}</h2>
                    <p>Unit Price: ${item.price}</p>
                    <p>
                      Total: ${item.price * item.quantity}
                    </p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity(item.id))
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          dispatch(increaseQuantity(item.id))
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total Amount: ${totalAmount}</h2>

              <button
                onClick={() => alert("Coming Soon!")}
                className="checkout-btn"
              >
                Checkout
              </button>

              <Link to="/plants" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;