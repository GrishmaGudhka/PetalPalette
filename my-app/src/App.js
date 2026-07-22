import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ================= COMPONENTS =================

import Header from "./components/Header";
import Footer from "./components/Footer";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";

// ================= USER PAGES =================

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shopping from "./pages/Shopping";

// ================= CATALOG & CUSTOMIZER =================

import CustomBouquet from "./pages/CustomBouquet";
import PremadeBouquets from "./pages/PremadeBouquets";

// ================= PREMIUM FEATURES =================

import Subscription from "./pages/Subscription";
import Events from "./pages/Events";
import FlowerCare from "./pages/FlowerCare";
import TrackOrder from "./pages/TrackOrder";
import Reminders from "./pages/Reminders";

// ================= LEGAL PAGES =================

import {
  Policies,
  TermsAndConditions,
  PrivacyPolicy,
  Disclaimer,
  FAQ,
} from "./pages/LegalPages";

// ================= ADMIN PAGES =================

import AdminLayout from "./admin/AdminLayout";

import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AdminProducts from "./admin/AdminProducts";
import AdminEvents from "./admin/AdminEvents";
import AdminReminders from "./admin/AdminReminders";
import AdminReview from "./admin/AdminReviews";
import AdminSubscription from "./admin/AdminSubscriptions";
import AdminAnalytics from "./admin/AdminAnalytics";
import AdminCustomOrder from "./admin/AdminCustomOrders";

// =====================================================
// ADMIN PROTECTED ROUTE
// =====================================================

function AdminProtected({ children }) {
  const isAdmin =
    localStorage.getItem("isAdminLoggedIn") === "true";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// =====================================================
// USER LAYOUT
// =====================================================

function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

// =====================================================
// ADMIN LAYOUT WRAPPER
// =====================================================

function ProtectedAdminLayout() {
  return (
    <AdminProtected>
      <AdminLayout />
    </AdminProtected>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>

        <Routes>

          {/* =================================================
              USER ROUTES
          ================================================= */}

          <Route
            path="/"
            element={
              <UserLayout>
                <Home />
              </UserLayout>
            }
          />

          <Route
            path="/about"
            element={
              <UserLayout>
                <About />
              </UserLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <UserLayout>
                <Contact />
              </UserLayout>
            }
          />

          <Route
            path="/login"
            element={
              <UserLayout>
                <Login />
              </UserLayout>
            }
          />

          <Route
            path="/signup"
            element={
              <UserLayout>
                <Signup />
              </UserLayout>
            }
          />

          <Route
            path="/shopping"
            element={
              <UserLayout>
                <Shopping />
              </UserLayout>
            }
          />

          {/* =================================================
              BOUQUET ROUTES
          ================================================= */}

          <Route
            path="/premade-bouquets"
            element={
              <UserLayout>
                <PremadeBouquets />
              </UserLayout>
            }
          />

          <Route
            path="/custom-bouquet"
            element={
              <UserLayout>
                <CustomBouquet />
              </UserLayout>
            }
          />

          {/* =================================================
              PREMIUM FEATURES
          ================================================= */}

          <Route
            path="/subscriptions"
            element={
              <UserLayout>
                <Subscription />
              </UserLayout>
            }
          />

          <Route
            path="/events"
            element={
              <UserLayout>
                <Events />
              </UserLayout>
            }
          />

          <Route
            path="/flower-care"
            element={
              <UserLayout>
                <FlowerCare />
              </UserLayout>
            }
          />

          <Route
            path="/track-order"
            element={
              <UserLayout>
                <TrackOrder />
              </UserLayout>
            }
          />

          <Route
            path="/reminders"
            element={
              <UserLayout>
                <Reminders />
              </UserLayout>
            }
          />

          {/* =================================================
              LEGAL & POLICY ROUTES
          ================================================= */}

          <Route
            path="/policies"
            element={
              <UserLayout>
                <Policies />
              </UserLayout>
            }
          />

          <Route
            path="/terms"
            element={
              <UserLayout>
                <TermsAndConditions />
              </UserLayout>
            }
          />

          <Route
            path="/privacy"
            element={
              <UserLayout>
                <PrivacyPolicy />
              </UserLayout>
            }
          />

          <Route
            path="/disclaimer"
            element={
              <UserLayout>
                <Disclaimer />
              </UserLayout>
            }
          />

          <Route
            path="/faq"
            element={
              <UserLayout>
                <FAQ />
              </UserLayout>
            }
          />

          {/* =================================================
              CART & CHECKOUT
          ================================================= */}

          <Route
            path="/cart"
            element={
              <UserLayout>
                <CartPage />
              </UserLayout>
            }
          />

          <Route
            path="/checkout"
            element={
              <UserLayout>
                <CheckoutPage />
              </UserLayout>
            }
          />

          {/* =================================================
              ADMIN ROUTES
          ================================================= */}

          <Route
            path="/admin"
            element={<ProtectedAdminLayout />}
          >

            {/* Admin Dashboard */}
            <Route
              index
              element={<AdminDashboard />}
            />

            {/* Users */}
            <Route
              path="users"
              element={<AdminUsers />}
            />

            {/* Orders */}
            <Route
              path="orders"
              element={<AdminOrders />}
            />

            {/* Products */}
            <Route
              path="products"
              element={<AdminProducts />}
            />

            {/* Events */}
            <Route
              path="events"
              element={<AdminEvents />}
            />

            {/* Reminders */}
            <Route
              path="reminders"
              element={<AdminReminders />}
            />

            {/* Reviews */}
            <Route
              path="reviews"
              element={<AdminReview />}
            />

            {/* Subscriptions */}
            <Route
              path="subscriptions"
              element={<AdminSubscription />}
            />

            {/* Analytics */}
            <Route
              path="analytics"
              element={<AdminAnalytics />}
            />

            {/* Custom Bouquet Orders */}
            <Route
              path="custom-orders"
              element={<AdminCustomOrder />}
            />

          </Route>

          {/* =================================================
              OLD ADMIN URL REDIRECTS
          ================================================= */}

          <Route
            path="/admin-dashboard"
            element={
              <Navigate
                to="/admin"
                replace
              />
            }
          />

          <Route
            path="/admin-orders"
            element={
              <Navigate
                to="/admin/orders"
                replace
              />
            }
          />

          <Route
            path="/admin-users"
            element={
              <Navigate
                to="/admin/users"
                replace
              />
            }
          />

          {/* =================================================
              UNKNOWN ROUTES
          ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;