const express = require("express");
const fs = require("fs");
const path = require("path");

const createRouter = (io) => {
  const router = express.Router();
  const dataPath = path.join(__dirname, "../data/products.json");

  // GET products
  router.get("/get-products", (req, res) => {
    const products = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json({ success: true, data: products });
  });

  // POST new product
  router.post("/add-product", (req, res) => {
    const newProduct = req.body;

    const products = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    products.push(newProduct);

    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));

    io.emit("productData", products);
    console.log("Products length", products.length)

    res.status(200).json({ message: "Product added successfully" });
  });

    // Serve frontend for any unknown route
    router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html')); // Adjust path if needed
    });


  return router;
};

module.exports = createRouter;
