// src/pages/AdminProducts.js

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  /* ================= STATES ================= */

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);

      alert(
        "Unable to load products. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* ================= ADD PRODUCT ================= */

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const newProduct = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image,
      };

      const res = await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );

      setProducts([
        ...products,
        res.data,
      ]);

      resetForm();

      alert("Product added successfully.");
    } catch (error) {
      console.error(
        "Error adding product:",
        error
      );

      alert(
        "Unable to add product."
      );
    }
  };

  /* ================= UPDATE PRODUCT ================= */

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!editingProduct) {
      return;
    }

    try {
      const updatedProduct = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image,
      };

      const res = await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        updatedProduct
      );

      setProducts(
        products.map((product) =>
          product._id === editingProduct._id
            ? res.data
            : product
        )
      );

      resetForm();

      alert(
        "Product updated successfully."
      );
    } catch (error) {
      console.error(
        "Error updating product:",
        error
      );

      alert(
        "Unable to update product."
      );
    }
  };

  /* ================= DELETE PRODUCT ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      setProducts(
        products.filter(
          (product) =>
            product._id !== id
        )
      );

      alert(
        "Product deleted successfully."
      );
    } catch (error) {
      console.error(
        "Error deleting product:",
        error
      );

      alert(
        "Unable to delete product."
      );
    }
  };

  /* ================= EDIT PRODUCT ================= */

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      category: product.category || "",
      description:
        product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.image || "",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================= RESET FORM ================= */

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });

    setEditingProduct(null);

    setShowForm(false);
  };

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts =
    products.filter((product) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(searchText) ||
        product.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        categoryFilter === "All"
          ? true
          : product.category ===
            categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  /* ================= CATEGORIES ================= */

  const categories = [
    ...new Set(
      products
        .map(
          (product) =>
            product.category
        )
        .filter(Boolean)
    ),
  ];

  /* ================= PRODUCT STATUS ================= */

  const getStockStatus = (stock) => {
    if (stock <= 0) {
      return {
        text: "Out of Stock",
        background: "#ef4444",
      };
    }

    if (stock <= 5) {
      return {
        text: "Low Stock",
        background: "#f59e0b",
      };
    }

    return {
      text: "In Stock",
      background: "#10b981",
    };
  };

  /* ================= RENDER ================= */

  return (
    <div style={styles.page}>

      {/* ================= HEADER ================= */}

      <div style={styles.headerSection}>

        <div>
          <h1 style={styles.title}>
            🌸 Product Management
          </h1>

          <p style={styles.subtitle}>
            Manage your flower products,
            prices, inventory and product
            availability.
          </p>
        </div>

        <button
          style={styles.addButton}
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm
            ? "✕ Close Form"
            : "＋ Add Product"}
        </button>

      </div>

      {/* ================= STATISTICS ================= */}

      <div style={styles.statsGrid}>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            📦
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {products.length}
            </h2>

            <p style={styles.statLabel}>
              Total Products
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              background: "#10b981",
            }}
          >
            🌸
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {
                products.filter(
                  (product) =>
                    Number(product.stock) > 0
                ).length
              }
            </h2>

            <p style={styles.statLabel}>
              Available Products
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              background: "#f59e0b",
            }}
          >
            ⚠️
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {
                products.filter(
                  (product) =>
                    Number(product.stock) > 0 &&
                    Number(product.stock) <= 5
                ).length
              }
            </h2>

            <p style={styles.statLabel}>
              Low Stock
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div
            style={{
              ...styles.statIcon,
              background: "#ef4444",
            }}
          >
            🚫
          </div>

          <div>
            <h2 style={styles.statNumber}>
              {
                products.filter(
                  (product) =>
                    Number(product.stock) <= 0
                ).length
              }
            </h2>

            <p style={styles.statLabel}>
              Out of Stock
            </p>
          </div>
        </div>

      </div>

      {/* ================= ADD / EDIT FORM ================= */}

      {showForm && (
        <div style={styles.formCard}>

          <h2 style={styles.formTitle}>
            {editingProduct
              ? "✏️ Edit Product"
              : "🌸 Add New Product"}
          </h2>

          <form
            onSubmit={
              editingProduct
                ? handleUpdateProduct
                : handleAddProduct
            }
          >

            <div style={styles.formGrid}>

              {/* Product Name */}

              <div style={styles.formGroup}>

                <label style={styles.label}>
                  Product Name *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Red Rose Bouquet"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

              </div>

              {/* Category */}

              <div style={styles.formGroup}>

                <label style={styles.label}>
                  Category *
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="Bouquets">
                    Bouquets
                  </option>

                  <option value="Roses">
                    Roses
                  </option>

                  <option value="Lilies">
                    Lilies
                  </option>

                  <option value="Orchids">
                    Orchids
                  </option>

                  <option value="Tulips">
                    Tulips
                  </option>

                  <option value="Plants">
                    Plants
                  </option>

                  <option value="Gifts">
                    Gifts
                  </option>

                  <option value="Vases">
                    Vases
                  </option>

                </select>

              </div>

              {/* Price */}

              <div style={styles.formGroup}>

                <label style={styles.label}>
                  Price (₹) *
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  style={styles.input}
                  min="0"
                  required
                />

              </div>

              {/* Stock */}

              <div style={styles.formGroup}>

                <label style={styles.label}>
                  Stock Quantity *
                </label>

                <input
                  type="number"
                  name="stock"
                  placeholder="Enter stock"
                  value={formData.stock}
                  onChange={handleChange}
                  style={styles.input}
                  min="0"
                  required
                />

              </div>

              {/* Image */}

              <div
                style={{
                  ...styles.formGroup,
                  gridColumn: "1 / -1",
                }}
              >

                <label style={styles.label}>
                  Product Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  placeholder="Enter product image URL"
                  value={formData.image}
                  onChange={handleChange}
                  style={styles.input}
                />

              </div>

              {/* Description */}

              <div
                style={{
                  ...styles.formGroup,
                  gridColumn: "1 / -1",
                }}
              >

                <label style={styles.label}>
                  Product Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter product description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  style={styles.textarea}
                  rows="4"
                />

              </div>

            </div>

            {/* Form Buttons */}

            <div style={styles.formActions}>

              <button
                type="submit"
                style={styles.primaryButton}
              >
                {editingProduct
                  ? "💾 Update Product"
                  : "🌸 Add Product"}
              </button>

              <button
                type="button"
                style={styles.cancelButton}
                onClick={resetForm}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ================= SEARCH & FILTER ================= */}

      <div style={styles.filterSection}>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.searchInput}
        />

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          style={styles.categorySelect}
        >

          <option value="All">
            All Categories
          </option>

          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}

        </select>

      </div>

      {/* ================= PRODUCTS ================= */}

      <div style={styles.productsCard}>

        <h2 style={styles.productsTitle}>
          📋 All Products
        </h2>

        {loading ? (

          <div style={styles.message}>
            Loading products...
          </div>

        ) : filteredProducts.length === 0 ? (

          <div style={styles.message}>
            No products found.
          </div>

        ) : (

          <div style={styles.tableContainer}>

            <table style={styles.table}>

              <thead>

                <tr>

                  <th style={styles.th}>
                    Image
                  </th>

                  <th style={styles.th}>
                    Product
                  </th>

                  <th style={styles.th}>
                    Category
                  </th>

                  <th style={styles.th}>
                    Price
                  </th>

                  <th style={styles.th}>
                    Stock
                  </th>

                  <th style={styles.th}>
                    Status
                  </th>

                  <th style={styles.th}>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map(
                  (product) => {

                    const stockStatus =
                      getStockStatus(
                        Number(
                          product.stock
                        )
                      );

                    return (

                      <tr
                        key={
                          product._id
                        }
                      >

                        {/* Image */}

                        <td style={styles.td}>

                          {product.image ? (

                            <img
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                              style={
                                styles.productImage
                              }
                            />

                          ) : (

                            <div
                              style={
                                styles.noImage
                              }
                            >
                              🌸
                            </div>

                          )}

                        </td>

                        {/* Name */}

                        <td style={styles.td}>

                          <strong>
                            {product.name}
                          </strong>

                          {product.description && (

                            <p
                              style={
                                styles.description
                              }
                            >
                              {
                                product.description
                              }
                            </p>

                          )}

                        </td>

                        {/* Category */}

                        <td style={styles.td}>
                          {product.category}
                        </td>

                        {/* Price */}

                        <td style={styles.td}>
                          ₹
                          {Number(
                            product.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        {/* Stock */}

                        <td style={styles.td}>
                          {product.stock}
                        </td>

                        {/* Status */}

                        <td style={styles.td}>

                          <span
                            style={{
                              ...styles.statusBadge,
                              background:
                                stockStatus.background,
                            }}
                          >
                            {
                              stockStatus.text
                            }
                          </span>

                        </td>

                        {/* Actions */}

                        <td style={styles.td}>

                          <div
                            style={
                              styles.actionButtons
                            }
                          >

                            <button
                              style={
                                styles.editButton
                              }
                              onClick={() =>
                                handleEdit(
                                  product
                                )
                              }
                            >
                              ✏️ Edit
                            </button>

                            <button
                              style={
                                styles.deleteButton
                              }
                              onClick={() =>
                                handleDelete(
                                  product._id
                                )
                              }
                            >
                              🗑 Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {
  /* ================= PAGE BASE ================= */
  page: { minHeight: "100vh", background: "#fff8fb", padding: "40px", boxSizing: "border-box" },

  /* ================= HEADER ================= */
  headerSection: { maxWidth: "1400px", margin: "0 auto 35px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap" },
  title: { margin: 0, color: "#222", fontSize: "38px", fontWeight: "700" },
  subtitle: { color: "#777", fontSize: "16px", marginTop: "10px" },
  addButton: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", border: "none", borderRadius: "12px", padding: "14px 24px", fontSize: "16px", fontWeight: "700", cursor: "pointer" },

  /* ================= STATS ================= */
  statsGrid: { maxWidth: "1400px", margin: "0 auto 35px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "20px" },
  statCard: { background: "#fff", borderRadius: "18px", padding: "24px", display: "flex", alignItems: "center", gap: "18px", boxShadow: "0 8px 20px rgba(0,0,0,.07)" },
  statIcon: { width: "60px", height: "60px", borderRadius: "15px", background: "#ec4899", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 },
  statNumber: { margin: 0, fontSize: "30px", color: "#222" },
  statLabel: { margin: "5px 0 0", color: "#777" },

  /* ================= FORM ================= */
  formCard: { maxWidth: "1400px", margin: "0 auto 35px", background: "#fff", padding: "35px", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,.08)" },
  formTitle: { color: "#ec4899", marginTop: 0, marginBottom: "30px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "22px" },
  formGroup: { display: "flex", flexDirection: "column" },
  label: { marginBottom: "8px", fontWeight: "600", color: "#444" },
  input: { width: "100%", padding: "13px 15px", borderRadius: "10px", border: "1px solid #ddd", fontSize: "15px", boxSizing: "border-box", outline: "none" },
  textarea: { width: "100%", padding: "13px 15px", borderRadius: "10px", border: "1px solid #ddd", fontSize: "15px", boxSizing: "border-box", resize: "vertical", outline: "none" },
  formActions: { display: "flex", gap: "15px", marginTop: "25px" },
  primaryButton: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 25px", fontWeight: "700", cursor: "pointer" },
  cancelButton: { background: "#eee", color: "#555", border: "none", borderRadius: "10px", padding: "14px 25px", fontWeight: "600", cursor: "pointer" },

  /* ================= FILTER ================= */
  filterSection: { maxWidth: "1400px", margin: "0 auto 30px", display: "flex", gap: "15px", flexWrap: "wrap" },
  searchInput: { flex: 1, minWidth: "280px", padding: "14px 18px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "16px", outline: "none" },
  categorySelect: { width: "220px", padding: "14px", borderRadius: "12px", border: "1px solid #ddd", background: "#fff", fontSize: "16px" },

  /* ================= PRODUCTS ================= */
  productsCard: { maxWidth: "1400px", margin: "0 auto", background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 8px 25px rgba(0,0,0,.08)" },
  productsTitle: { marginTop: 0, marginBottom: "25px", color: "#222" },
  tableContainer: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "1000px" },
  th: { padding: "16px", background: "#ec4899", color: "#fff", textAlign: "left", fontSize: "15px" },
  td: { padding: "16px", borderBottom: "1px solid #f1f1f1", color: "#555", verticalAlign: "middle" },
  productImage: { width: "70px", height: "70px", objectFit: "cover", borderRadius: "12px" },
  noImage: { width: "70px", height: "70px", borderRadius: "12px", background: "#fff0f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" },
  description: { margin: "6px 0 0", color: "#888", fontSize: "13px", maxWidth: "250px" },
  statusBadge: { color: "#fff", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", display: "inline-block" },

  /* ================= BUTTONS & MESSAGES ================= */
  actionButtons: { display: "flex", gap: "8px", flexWrap: "wrap" },
  editButton: { background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", fontWeight: "600" },
  deleteButton: { background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", fontWeight: "600" },
  message: { textAlign: "center", padding: "50px", color: "#777", fontSize: "17px" },
};