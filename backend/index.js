const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

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

const productRoutes = require("./routes/products")(io);
app.use("/product", productRoutes);

io.on("connection", (socket) => {
  console.log("Client connected");

  const products = require("./data/products.json");
  socket.emit("productData", products);
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
