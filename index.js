// //  //backednd/index.js
// // const express = require("express");
// // const mongoose = require("mongoose");
// // require("dotenv").config();
// // const movieRouter = require("./routes/movie");
// // const actorRouter = require("./routes/actor");
// // const producerRouter = require("./routes/producer");
// // const cors = require("cors");

// // const app = express();

// // // Middleware
// // app.use(express.json());
// // app.use(cors({
// //   origin: process.env.FRONTEND_URL || "http://34.93.17.233:3000",
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //   allowedHeaders: ["Content-Type", "Authorization"],
// // }));

// // // Health check endpoint
// // app.get("/health", async (req, res) => {
// //   try {
// //     const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
// //     res.json({
// //       status: "success",
// //       database: dbStatus,
// //       api: {
// //         actor: true,
// //         movie: true,
// //         producer: true,
// //       },
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       status: "error",
// //       message: error.message,
// //     });
// //   }
// // });

// // // Routes
// // app.use("/movies", movieRouter);
// // app.use("/actors", actorRouter);
// // app.use("/producers", producerRouter);

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({
// //     status: "error",
// //     message: err.message || "Internal server error",
// //   });
// // });

// // // Connect to MongoDB and start server
// // const startServer = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URL);
// //     console.log("Database connected successfully");

// //     const PORT = process.env.PORT || 5000;
// //     app.listen(PORT, () => {
// //       console.log(`Server is running on port ${PORT}`);
// //     });
// //   } catch (err) {
// //     console.error("Database connection failed:", err);
// //     process.exit(1);
// //   }
// // };

// // // Handle uncaught exceptions
// // process.on("uncaughtException", (err) => {
// //   console.error("Uncaught Exception:", err);
// //   process.exit(1);
// // });

// // // Handle unhandled promise rejections
// // process.on("unhandledRejection", (err) => {
// //   console.error("Unhandled Rejection:", err);
// //   process.exit(1);
// // });

// // startServer();
// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const movieRouter = require("./routes/movie");
// const actorRouter = require("./routes/actor");
// const producerRouter = require("./routes/producer");
// const cors = require("cors");
// const morgan = require("morgan"); // Add morgan for logging
// const app = express();

// // Middleware
// app.use(express.json());
// // Allow all domains in CORS
// app.use(cors({
//   origin: "*", // Allow all origins
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// // Request logging middleware
// app.use(morgan("dev")); // Use 'dev' format for concise colored output

// // Custom application logging middleware
// app.use((req, res, next) => {
//   const start = Date.now();
//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     console.log(
//       `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
//     );
//   });
//   next();
// });

// // Health check endpoint
// app.get("/health", async (req, res) => {
//   try {
//     const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
//     res.json({
//       status: "success",
//       database: dbStatus,
//       api: {
//         actor: true,
//         movie: true,
//         producer: true,
//       },
//     });
//   } catch (error) {
//     console.error("Health check error:", error);
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// // Routes
// app.use("/movies", movieRouter);
// app.use("/actors", actorRouter);
// app.use("/producers", producerRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(`[ERROR] ${new Date().toISOString()}:`, err.stack);
//   res.status(500).json({
//     status: "error",
//     message: err.message || "Internal server error",
//   });
// });

// // Connect to MongoDB and start server
// const startServer = async () => {
//   try {
//     console.log("Connecting to database...");
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("Database connected successfully");
    
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//       console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
//       console.log(`CORS: Allowing all origins`);
//     });
//   } catch (err) {
//     console.error("Database connection failed:", err);
//     process.exit(1);
//   }
// };

// // Handle uncaught exceptions
// process.on("uncaughtException", (err) => {
//   console.error(`[FATAL] ${new Date().toISOString()} Uncaught Exception:`, err);
//   process.exit(1);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error(`[FATAL] ${new Date().toISOString()} Unhandled Rejection:`, err);
//   process.exit(1);
// });

// startServer();
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const movieRouter = require("./routes/movie");
const actorRouter = require("./routes/actor");
const producerRouter = require("./routes/producer");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// Middleware
app.use(express.json());

// Improved CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "https://imdb-frontend1.jayachandran.xyz"],
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Request logging middleware
app.use(morgan("dev"));

// Custom application logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });
  next();
});

// API Status endpoints
app.get("/movies/status", (req, res) => {
  res.json({ status: "success", message: "Movie API is working" });
});

app.get("/actors/status", (req, res) => {
  res.json({ status: "success", message: "Actor API is working" });
});

app.get("/producers/status", (req, res) => {
  res.json({ status: "success", message: "Producer API is working" });
});

// Health check endpoint with better error handling
app.get("/health", async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    
    // Add more detailed connection information
    const connectionInfo = mongoose.connection.readyState === 1 ? {
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name
    } : null;
    
    res.json({
      status: "success",
      timestamp: new Date().toISOString(),
      database: dbStatus,
      connectionInfo,
      api: {
        actor: true,
        movie: true,
        producer: true,
      },
      appInfo: {
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || "development"
      }
    });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Internal server error during health check",
      timestamp: new Date().toISOString()
    });
  }
});

// Routes
app.use("/movies", movieRouter);
app.use("/actors", actorRouter);
app.use("/producers", producerRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()}:`, err.stack);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal server error",
    timestamp: new Date().toISOString()
  });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`CORS: Enabled for specific origins`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`[FATAL] ${new Date().toISOString()} Uncaught Exception:`, err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`[FATAL] ${new Date().toISOString()} Unhandled Rejection:`, err);
  process.exit(1);
});

startServer();
