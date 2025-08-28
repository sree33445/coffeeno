import React, { useEffect, useState } from "react";
import {
  User,
  ChevronDown,
  Settings,
  LogOut,
  ShoppingCart,
  Coffee,
  Star,
  MapPin,
} from "lucide-react";
import "../css/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartItems, setCartItems] = useState(2);

  useEffect(() => {
    const storedUser = localStorage.getItem("coffeno_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const viewMenu = () => {
    navigate("/menu");
  };

  const orderNow = () => {
    navigate("/cart")
  }

  const handleLogout = () => {
    localStorage.removeItem("coffeno_user");
    localStorage.removeItem("coffeno_token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="container">
      {/* Header with Profile */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            {/* Logo/Brand */}
            <div className="logo">
              <img src="../Coffeno.jpeg" className="logo-icon" />
              <h1 className="logo-text">Coffeno</h1>
            </div>

            {/* Navigation */}
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

            {/* Profile Section */}
            <div className="profile-section">
              {/* Shopping Cart */}
              <button className="cart-button">
                <ShoppingCart className="cart-icon" />
                {cartItems > 0 && (
                  <span className="cart-badge">{cartItems}</span>
                )}
              </button>

              {user ? (
                // Show profile dropdown if authenticated
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
                        {user.first_name || user.firstName}
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
                            {user.first_name || user.firstName}{" "}
                            {user.last_name || user.lastName}
                          </p>
                          <p className="dropdown-points">
                            Gold Member • 1,250 points
                          </p>
                        </div>
                        <a href="#" className="dropdown-item">
                          <User className="dropdown-icon" />
                          My Profile
                        </a>
                        <a href="#" className="dropdown-item">
                          <Star className="dropdown-icon" />
                          Rewards & Points
                        </a>
                        <a href="#" className="dropdown-item">
                          <Settings className="dropdown-icon" />
                          Settings
                        </a>
                        <div className="dropdown-divider">
                          <button
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            <LogOut className="dropdown-icon" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Show Signup button if not authenticated
                <button
                  className="primary-button"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h2 className="hero-title">
            {user ? `Welcome back, ${user.first_name || user.firstName}!` : "Welcome to Coffeno!"}
          </h2>
          <p className="hero-subtitle">
            Your perfect cup of coffee is just a click away
          </p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={orderNow}>Order Now</button>
            <button className="secondary-button" onClick={viewMenu}>
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main">
        {/* Rewards Status */}
        <div className="rewards-card">
          <div className="rewards-content">
            <div>
              <h3 className="rewards-title">Your Rewards Status</h3>
              <p className="rewards-subtitle">1,250 points • Gold Member</p>
            </div>
            <div className="rewards-points">
              <p className="points-number">250</p>
              <p className="points-label">points to next reward</p>
            </div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: "83%" }}></div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Featured Drinks */}
          <div className="card">
            <h3 className="card-title">Today's Specials</h3>
            <div className="card-content">
              <div className="drink-item">
                <div className="drink-icon">
                  <Coffee className="coffee-icon" />
                </div>
                <div>
                  <p className="drink-name">Nitro Cold Brew</p>
                  <p className="drink-price">$4.75</p>
                </div>
              </div>
              <div className="drink-item">
                <div className="drink-icon">
                  <Coffee className="coffee-icon" />
                </div>
                <div>
                  <p className="drink-name">Flat White</p>
                  <p className="drink-price">$4.25</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card">
            <h3 className="card-title">Recent Orders</h3>
            <div className="orders-list">
              <div className="order-item">
                <span className="order-name">Cappuccino</span>
                <button className="reorder-button">Reorder</button>
              </div>
              <div className="order-item">
                <span className="order-name">Iced Latte</span>
                <button className="reorder-button">Reorder</button>
              </div>
              <div className="order-item">
                <span className="order-name">Cold Brew</span>
                <button className="reorder-button">Reorder</button>
              </div>
            </div>
          </div>

          {/* Nearest Location */}
          <div className="card">
            <h3 className="card-title">Nearest Location</h3>
            <div className="location-content">
              <div className="location-info">
                <MapPin className="map-icon" />
                <div>
                  <p className="location-name">Downtown Branch</p>
                  <p className="location-address">123 Main Street</p>
                  <p className="location-distance">0.3 miles away</p>
                </div>
              </div>
              <div className="location-status">
                <p className="open-status">Open now • Closes at 9 PM</p>
                <p className="wait-time">Estimated wait: 5-8 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions-card">
          <h3 className="actions-title">What would you like to do?</h3>
          <div className="actions-grid">
            <button className="action-button-primary">
              <Coffee className="action-icon" />
              <span className="action-label">Order Coffee</span>
            </button>
            <button className="action-button-secondary">
              <Star className="action-icon" />
              <span className="action-label">View Rewards</span>
            </button>
            <button className="action-button-secondary">
              <MapPin className="action-icon" />
              <span className="action-label">Find Stores</span>
            </button>
            <button className="action-button-secondary">
              <ShoppingCart className="action-icon" />
              <span className="action-label">Gift Cards</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
