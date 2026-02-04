const productService = require("./product.service");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Ensure numeric values for price and stock to avoid NaN issues later
    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (!Number.isFinite(numericPrice) || !Number.isFinite(numericStock)) {
      return res.status(400).json({
        message: "Price and stock must be valid numbers",
      });
    }

    const productData = {
      name,
      description,
      price: numericPrice,
      stock: numericStock,
      category,
      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : null,
    };

    const product = await productService.createProduct(productData);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.list = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const keyword = req.query.keyword || "";

    const data = await productService.getProducts(page, limit, keyword);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
