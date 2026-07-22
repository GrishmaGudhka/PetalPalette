// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ================== MIDDLEWARE ==================

app.use(cors());
app.use(bodyParser.json());


// ==================================================
// MONGODB CONNECTION
// ==================================================

mongoose
  .connect("mongodb://127.0.0.1:27017/bouquetUsers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


// ==================================================
// USER SCHEMA
// ==================================================

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);


// ==================================================
// SIGNUP ROUTE
// ==================================================

app.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: newUser,
    });

  } catch (err) {
    res.status(500).json({
      message: "Signup failed",
      error: err.message,
    });
  }
});


// ==================================================
// LOGIN ROUTE
// ==================================================

app.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
});


// ==================================================
// PRODUCT SCHEMA
// ==================================================

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);


// ==================================================
// PRODUCT MANAGEMENT ROUTES
// ==================================================


// ------------------ GET ALL PRODUCTS ------------------

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);

  } catch (err) {
    console.error(
      "Error fetching products:",
      err
    );

    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
});


// ------------------ GET SINGLE PRODUCT ------------------

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (err) {
    console.error(
      "Error fetching product:",
      err
    );

    res.status(500).json({
      message: "Failed to fetch product",
      error: err.message,
    });
  }
});


// ------------------ ADD PRODUCT ------------------

app.post("/api/products", async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      stock,
      image,
    } = req.body;

    // Validation
    if (
      !name ||
      !category ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        message:
          "Name, category, price and stock are required",
      });
    }

    // Create product
    const newProduct = new Product({
      name,
      category,
      description,
      price: Number(price),
      stock: Number(stock),
      image,
    });

    await newProduct.save();

    res.status(201).json(newProduct);

  } catch (err) {
    console.error(
      "Error adding product:",
      err
    );

    res.status(500).json({
      message: "Failed to add product",
      error: err.message,
    });
  }
});


// ------------------ UPDATE PRODUCT ------------------

app.put("/api/products/:id", async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      stock,
      image,
    } = req.body;

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          category,
          description,
          price: Number(price),
          stock: Number(stock),
          image,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(
      updatedProduct
    );

  } catch (err) {
    console.error(
      "Error updating product:",
      err
    );

    res.status(500).json({
      message: "Failed to update product",
      error: err.message,
    });
  }
});


// ------------------ DELETE PRODUCT ------------------

app.delete(
  "/api/products/:id",
  async (req, res) => {
    try {
      const deletedProduct =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!deletedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message:
          "Product deleted successfully",
        product: deletedProduct,
      });

    } catch (err) {
      console.error(
        "Error deleting product:",
        err
      );

      res.status(500).json({
        message:
          "Failed to delete product",
        error: err.message,
      });
    }
  }
);


// ==================================================
// ORDER SCHEMA
// ==================================================

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],

  totalAmount: Number,

  address: String,

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model(
  "Order",
  orderSchema
);


// ==================================================
// ORDER ROUTES
// ==================================================


// ------------------ CREATE ORDER ------------------

app.post(
  "/api/orders",
  async (req, res) => {
    try {
      const newOrder =
        new Order(req.body);

      await newOrder.save();

      res.status(201).json({
        message:
          "Order placed successfully",
        order: newOrder,
      });

    } catch (err) {
      console.error(
        "Error creating order:",
        err
      );

      res.status(500).json({
        message:
          "Failed to place order",
        error: err.message,
      });
    }
  }
);


// ------------------ GET ALL ORDERS ------------------

app.get(
  "/api/orders",
  async (req, res) => {
    try {
      const orders =
        await Order.find()
          .populate(
            "userId",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        orders
      );

    } catch (err) {
      console.error(
        "Error fetching orders:",
        err
      );

      res.status(500).json({
        message:
          "Failed to fetch orders",
        error: err.message,
      });
    }
  }
);


// ------------------ DELETE ORDER ------------------

app.delete(
  "/api/orders/:id",
  async (req, res) => {
    try {
      const deletedOrder =
        await Order.findByIdAndDelete(
          req.params.id
        );

      if (!deletedOrder) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      res.status(200).json({
        message:
          "Order deleted successfully",
      });

    } catch (err) {
      console.error(
        "Error deleting order:",
        err
      );

      res.status(500).json({
        message:
          "Failed to delete order",
        error: err.message,
      });
    }
  }
);


// ==================================================
// USER MANAGEMENT ROUTES - ADMIN
// ==================================================


// ------------------ GET ALL USERS ------------------

app.get(
  "/api/users",
  async (req, res) => {
    try {
      const users =
        await User.find();

      res.status(200).json(
        users
      );

    } catch (err) {
      console.error(
        "Error fetching users:",
        err
      );

      res.status(500).json({
        message:
          "Failed to fetch users",
        error: err.message,
      });
    }
  }
);


// ------------------ DELETE USER ------------------

app.delete(
  "/api/users/:id",
  async (req, res) => {
    try {
      const deletedUser =
        await User.findByIdAndDelete(
          req.params.id
        );

      if (!deletedUser) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.status(200).json({
        message:
          "User deleted successfully",
      });

    } catch (err) {
      console.error(
        "Error deleting user:",
        err
      );

      res.status(500).json({
        message:
          "Failed to delete user",
        error: err.message,
      });
    }
  }
);


// ==================================================
// START SERVER
// ==================================================

const PORT = 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running on port ${PORT}`
    );
  }
);