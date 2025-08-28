import React, { useState, useEffect, useContext } from "react";
import {
  User,
  ChevronDown,
  Settings,
  LogOut,
  ShoppingCart,
  Coffee,
  Star,
  MapPin,
  Plus,
  Minus,
} from "lucide-react";
import "../css/menu.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const Menu = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("espresso-based");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const goTOCart = () => {
    navigate('/cart');
  }

  const { 
  cartItemsCount, 
  add_to_cart, 
  remove_from_cart, 
  get_cart_quantity 
} = useContext(CartContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("coffeno_user");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
      }
    }
  }, []);

  const categories = [
    { id: "espresso-based", name: "Espresso-Based Drinks", icon: Coffee },
    { id: "cold-coffee", name: "Cold Coffee Drinks", icon: Coffee },
    { id: "brewed-coffee", name: "Brewed Coffee Types", icon: Coffee },
  ];

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
              <a href="#" className="nav-link">
                Menu
              </a>
              <a href="#" className="nav-link">
                Locations
              </a>
              <a href="#" className="nav-link">
                Rewards
              </a>
              <a href="#" className="nav-link">
                About
              </a>
            </nav>

            <div className="profile-section">
              <button onClick={()=> goTOCart()} className="cart-button">
                <ShoppingCart className="cart-icon" />
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </button>

              <div className="profile-dropdown">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="profile-button"
                >
                  <div className="profile-avatar">
                    <User className="profile-avatar-icon" />
                  </div>
                  <div className="profile-info">
                    <span className="profile-name">
                      {user?.firstName
                        ? `${user.firstName} ${user.lastName || ""}`
                        : "Guest"}
                    </span>
                    <span className="profile-status">Gold Member</span>
                  </div>
                  <ChevronDown className="chevron-icon" />
                </button>

                {isProfileOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      <div className="dropdown-header">
                        <p className="dropdown-name">
                          {user.firstName || "Guest"}
                        </p>
                        <p className="dropdown-points">
                          Gold Member • 1,250 points
                        </p>
                      </div>
                      <a href="#" className="dropdown-item">
                        <User className="dropdown-icon" /> My Profile
                      </a>
                      <a href="#" className="dropdown-item">
                        <Star className="dropdown-icon" /> Rewards & Points
                      </a>
                      <a href="#" className="dropdown-item">
                        <Settings className="dropdown-icon" /> Settings
                      </a>
                      <div className="dropdown-divider">
                        <a href="#" className="dropdown-item">
                          <LogOut className="dropdown-icon" /> Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-container">
          <h2 className="hero-title">Our Menu</h2>
          <p className="hero-subtitle">
            Crafted with love, served with a smile
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="main">
        <div className="menu-layout">
          {/* Sidebar */}
          <aside className="categories-sidebar">
            <div className="categories-header">
              <h3 className="categories-title">Categories</h3>
            </div>
            <nav className="categories-nav">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`category-button ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                  >
                    <IconComponent className="category-icon" />
                    <span className="category-name">{category.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Items */}
          <div className="menu-content">
            <div className="menu-header">
              <h2 className="menu-section-title">
                {categories.find((cat) => cat.id === activeCategory)?.name}
              </h2>
            </div>

            <div className="menu-grid">
              {menuItems[activeCategory]?.map((item) => (
                <div
                  key={item.id}
                  className={`menu-item ${item.featured ? "featured" : ""}`}
                >
                  {item.featured && (
                    <div className="featured-badge">Featured</div>
                  )}

                  <div className="menu-item-header">
                    <div className="menu-item-icon">{item.image}</div>
                    <div className="menu-item-info">
                      <h3 className="menu-item-name">{item.name}</h3>
                      <p className="menu-item-description">
                        {item.description}
                      </p>
                      <p className="menu-item-price">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {item.sizes && (
                    <div className="size-options">
                      <p className="size-label">Sizes:</p>
                      <div className="size-buttons">
                        {item.sizes.map((size) => (
                          <div key={size} className="size-option">
                            <span className="size-name">{size}</span>
                            <div className="quantity-controls">
                              <button
                                onClick={() => remove_from_cart(item, size)}
                                className="quantity-btn minus"
                                disabled={get_cart_quantity(item, size) === 0}
                              >
                                <Minus className="quantity-icon" />
                              </button>
                              <span className="quantity-display">
                                {get_cart_quantity(item, size)}
                              </span>
                              <button
                                onClick={() => add_to_cart(item, size)}
                                className="quantity-btn plus"
                              >
                                <Plus className="quantity-icon" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!item.sizes && (
                    <div className="simple-add-section">
                      <div className="quantity-controls">
                        <button
                          onClick={() => remove_from_cart(item)}
                          className="quantity-btn minus"
                          disabled={get_cart_quantity(item) === 0}
                        >
                          <Minus className="quantity-icon" />
                        </button>
                        <span className="quantity-display">
                          {get_cart_quantity(item)}
                        </span>
                        <button
                          onClick={() => add_to_cart(item)}
                          className="quantity-btn plus"
                        >
                          <Plus className="quantity-icon" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Menu;
