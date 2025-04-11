const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Serve static files from the frontend
const frontendPath = path.join(__dirname, "../client/dist"); // Adjust this if needed
app.use(express.static(frontendPath));

// API routes
const productRoutes = require("./routes/products")(io);
app.use("/product", productRoutes);

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected");

  const products = require("./data/products.json");
  socket.emit("productData", products);
});

// Handle client-side routing (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
