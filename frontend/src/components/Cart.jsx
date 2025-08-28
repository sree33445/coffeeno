import React, { use, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Coffee,
  User,
  ChevronDown,
  Settings,
  LogOut,
  Star
} from "lucide-react";
import "../css/cart.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { 
    cart, 
    clear_cart, 
    add_to_cart, 
    remove_from_cart, 
    get_cart_quantity,
    cartItemsCount 
  } = useContext(CartContext);

  // Menu items data (you might want to move this to a separate file or context)
  const menuItems = {
    "espresso-based": [
      {
        id: 1,
        name: "Espresso",
        description: "Pure concentrated coffee shot, rich and intense",
        price: 2.25,
        sizes: ["Single", "Double"],
        image: "☕",
      },
      {
        id: 2,
        name: "Doppio",
        description: "Double shot of espresso for extra strength",
        price: 2.75,
        sizes: ["Standard"],
        image: "☕",
      },
      {
        id: 3,
        name: "Ristretto",
        description: "Short shot espresso, more concentrated flavor",
        price: 2.5,
        sizes: ["Single", "Double"],
        image: "☕",
      },
      {
        id: 4,
        name: "Lungo",
        description: "Long shot espresso with more water",
        price: 2.5,
        sizes: ["Single", "Double"],
        image: "☕",
      },
      {
        id: 5,
        name: "Americano",
        description: "Rich espresso with hot water",
        price: 3.5,
        sizes: ["Small", "Medium", "Large"],
        image: "☕",
      },
      {
        id: 6,
        name: "Macchiato",
        description: 'Espresso "stained" with a dollop of steamed milk',
        price: 3.75,
        sizes: ["Small", "Large"],
        image: "☕",
      },
      {
        id: 7,
        name: "Cortado",
        description: "Equal parts espresso and warm milk",
        price: 4.0,
        sizes: ["Standard"],
        image: "☕",
      },
      {
        id: 8,
        name: "Flat White",
        description: "Double shot espresso with microfoam milk",
        price: 4.25,
        sizes: ["Small", "Large"],
        image: "☕",
      },
      {
        id: 9,
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam",
        price: 4.25,
        sizes: ["Small", "Medium", "Large"],
        image: "☕",
      },
      {
        id: 10,
        name: "Latte",
        description: "Espresso with steamed milk",
        price: 4.5,
        sizes: ["Small", "Medium", "Large"],
        image: "☕",
      },
      {
        id: 11,
        name: "Mocha",
        description: "Espresso with chocolate and steamed milk",
        price: 4.75,
        sizes: ["Small", "Medium", "Large"],
        image: "☕",
      },
      {
        id: 12,
        name: "Affogato",
        description: "Espresso shot poured over vanilla gelato",
        price: 5.5,
        sizes: ["Standard"],
        image: "🍨",
        featured: true,
      },
    ],
    "cold-coffee": [
      {
        id: 13,
        name: "Iced Coffee",
        description: "Chilled coffee served over ice",
        price: 3.25,
        sizes: ["Small", "Medium", "Large"],
        image: "🧊",
      },
      {
        id: 14,
        name: "Cold Brew",
        description: "Smooth, cold-steeped coffee concentrate",
        price: 4.0,
        sizes: ["Small", "Medium", "Large"],
        image: "🧊",
      },
      {
        id: 15,
        name: "Iced Latte",
        description: "Espresso with cold milk over ice",
        price: 4.5,
        sizes: ["Small", "Medium", "Large"],
        image: "🧊",
      },
      {
        id: 16,
        name: "Iced Americano",
        description: "Espresso with cold water over ice",
        price: 3.5,
        sizes: ["Small", "Medium", "Large"],
        image: "🧊",
      },
      {
        id: 17,
        name: "Frappuccino",
        description: "Blended iced coffee with whipped cream",
        price: 5.25,
        sizes: ["Small", "Medium", "Large"],
        image: "🧊",
        featured: true,
      },
      {
        id: 18,
        name: "Nitro Cold Brew",
        description: "Cold brew infused with nitrogen for creamy texture",
        price: 4.75,
        sizes: ["Small", "Large"],
        image: "🧊",
      },
    ],
    "brewed-coffee": [
      {
        id: 19,
        name: "Drip Coffee (Filter Coffee)",
        description: "Classic filtered coffee, smooth and clean",
        price: 2.75,
        sizes: ["Small", "Medium", "Large"],
        image: "☕",
      },
      {
        id: 20,
        name: "French Press",
        description: "Full-bodied coffee steeped with metal filter",
        price: 3.25,
        sizes: ["Small", "Large"],
        image: "☕",
      },
      {
        id: 21,
        name: "Moka Pot",
        description: "Italian stovetop coffee, rich and strong",
        price: 3.5,
        sizes: ["Standard"],
        image: "☕",
      },
      {
        id: 22,
        name: "Turkish Coffee",
        description: "Traditional finely ground coffee with grounds",
        price: 4.0,
        sizes: ["Standard"],
        image: "☕",
      },
      {
        id: 23,
        name: "Percolator Coffee",
        description: "Bold coffee brewed by cycling boiling water",
        price: 3.0,
        sizes: ["Small", "Medium", "Large"],
        image: "☕",
      },
      {
        id: 24,
        name: "Siphon Coffee",
        description: "Vacuum-brewed coffee with theatrical presentation",
        price: 5.0,
        sizes: ["Standard"],
        image: "☕",
        featured: true,
      },
    ],
  };

  const navigate =useNavigate();

  // Get all menu items in a flat array
  const allMenuItems = [
    ...menuItems["espresso-based"],
    ...menuItems["cold-coffee"],
    ...menuItems["brewed-coffee"]
  ];

  const goToMenu = () => {
    navigate('/menu')
  };

  const { user } = useContext(AuthContext);

  const handlePlaceOrder = async () => {
  const orderPayload = {
    user_id: user?.id || null, // if logged in
    total_amount: totalAmount,
    items: cartItems.map(({ item, size, quantity }) => ({
      id: item.id,
      size,
      quantity,
      price: item.price
    }))
  };

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();
    if (data.success) {
      alert("Order placed successfully! 🎉");
      clear_cart(); // empty cart after successful order
    } else {
      alert("Failed to place order");
    }
  } catch (err) {
    console.error("Error placing order:", err);
  }
};


  // Function to find item details by ID
  const findItemById = (id) => {
    return allMenuItems.find(item => item.id === parseInt(id));
  };

  // Parse cart entries and get item details
  const getCartItemDetails = () => {
    const cartEntries = Object.entries(cart);
    return cartEntries
      .filter(([key, quantity]) => quantity > 0)
      .map(([key, quantity]) => {
        const [itemId, size] = key.includes('-') ? key.split('-') : [key, null];
        const item = findItemById(itemId);
        return {
          key,
          item,
          size,
          quantity,
          totalPrice: item ? item.price * quantity : 0
        };
      });
  };

  const cartItems = getCartItemDetails();
  const totalAmount = cartItems.reduce((sum, cartItem) => sum + cartItem.totalPrice, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-container">
            <div className="header-content">
              <div className="logo">
                <img src="../Coffeno.jpeg" alt="Coffeno Logo" />
                <h1 className="logoText">Coffeno</h1>
              </div>

              <nav className="nav">
                <a href="#" className="nav-link">Menu</a>
                <a href="#" className="nav-link">Locations</a>
                <a href="#" className="nav-link">Rewards</a>
                <a href="#" className="nav-link">About</a>
              </nav>

              <div className="profile-section">
                <button className="cart-button">
                  <ShoppingCart className="cart-icon" />
                  {cartItemsCount > 0 && (
                    <span className="cart-badge">{cartItemsCount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="empty-cart">
          <div className="empty-cart-content">
            <ShoppingCart className="empty-cart-icon" />
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-subtitle">Add some delicious coffee to get started ☕</p>
            <button onClick={goToMenu} className="browse-menu-btn">
              <Coffee className="browse-icon" />
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo">
              <img src="../Coffeno.jpeg" alt="Coffeno Logo" />
              <h1 className="logoText">Coffeno</h1>
            </div>

            <nav className="nav">
              <a href="#" className="nav-link">Menu</a>
              <a href="#" className="nav-link">Locations</a>
              <a href="#" className="nav-link">Rewards</a>
              <a href="#" className="nav-link">About</a>
            </nav>

            <div className="profile-section">
              <button className="cart-button">
                <ShoppingCart className="cart-icon" />
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-container">
          <h2 className="hero-title">Your Cart</h2>
          <p className="hero-subtitle">Review your order before checkout</p>
        </div>
      </section>

      {/* Cart Content */}
      <main className="main">
        <div className="cart-layout">
          <div className="cart-items">
            <h3 className="cart-section-title">Order Summary</h3>
            
            {cartItems.map(({ key, item, size, quantity, totalPrice }) => (
              <div key={key} className="cart-item">
                <div className="cart-item-header">
                  <div className="cart-item-icon">{item?.image || "☕"}</div>
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item?.name || "Unknown Item"}</h4>
                    {size && <p className="cart-item-size">Size: {size}</p>}
                    <p className="cart-item-price">${item?.price?.toFixed(2) || "0.00"} each</p>
                  </div>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => remove_from_cart(key)}
                      className="quantity-btn minus"
                      disabled={quantity === 0}
                    >
                      <Minus className="quantity-icon" />
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button
                      onClick={() => add_to_cart(key)}
                      className="quantity-btn plus"
                    >
                      <Plus className="quantity-icon" />
                    </button>
                  </div>
                  <div className="item-total">
                    <span className="item-total-price">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Total</h3>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${(totalAmount * 0.08).toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>${(totalAmount * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button onClick={clear_cart} className="clear-cart-btn">
                  <Trash2 className="clear-icon" />
                  Clear Cart
                </button>
                <button className="checkout-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;