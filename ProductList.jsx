import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";

const products = [
  // Indoor Plants
  {
    id: 1,
    name: "Snake Plant",
    price: 25,
    category: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae2fa0?w=500",
  },
  {
    id: 2,
    name: "Peace Lily",
    price: 30,
    category: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500",
  },
  {
    id: 3,
    name: "Spider Plant",
    price: 20,
    category: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=500",
  },
  {
    id: 4,
    name: "ZZ Plant",
    price: 35,
    category: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1632207691144-56b6b8c8f2d8?w=500",
  },
  {
    id: 5,
    name: "Rubber Plant",
    price: 28,
    category: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1614594576335-9d5a7d1d1d2c?w=500",
  },
  {
    id: 6,
    name: "Monstera",
    price: 40,
    category: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500",
  },

  // Succulents
  {
    id: 7,
    name: "Aloe Vera",
    price: 18,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500",
  },
  {
    id: 8,
    name: "Echeveria",
    price: 22,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=500",
  },
  {
    id: 9,
    name: "Jade Plant",
    price: 25,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500",
  },
  {
    id: 10,
    name: "Haworthia",
    price: 20,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500",
  },
  {
    id: 11,
    name: "String of Pearls",
    price: 30,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
  },
  {
    id: 12,
    name: "Zebra Haworthia",
    price: 24,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500",
  },

  // Flowering Plants
  {
    id: 13,
    name: "Rose Plant",
    price: 35,
    category: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=500",
  },
  {
    id: 14,
    name: "Orchid",
    price: 45,
    category: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=500",
  },
  {
    id: 15,
    name: "Peace Lily Flower",
    price: 32,
    category: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500",
  },
  {
    id: 16,
    name: "Anthurium",
    price: 38,
    category: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=500",
  },
  {
    id: 17,
    name: "Gerbera",
    price: 28,
    category: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=500",
  },
  {
    id: 18,
    name: "Jasmine",
    price: 30,
    category: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500",
  },
];

export function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <h2>Paradise Nursery</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const categories = [...new Set(products.map((product) => product.category))];

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div>
      <Navbar />

      <div className="products-page">
        <h1>Our Houseplants</h1>
        <p className="subtitle">
          Choose beautiful plants for your home and office.
        </p>

        {categories.map((category) => (
          <section key={category} className="category-section">
            <h2>{category}</h2>

            <div className="product-grid">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={product.image} alt={product.name} />

                    <h3>{product.name}</h3>

                    <p>${product.price}</p>

                    <button
                      onClick={() => dispatch(addToCart(product))}
                      disabled={isInCart(product.id)}
                    >
                      {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;