

const Product = require("./product.model");

exports.createProduct = async (productData) => {
  return await Product.create(productData);
};

exports.getProducts = async (page, limit, keyword) => {
  const filter = keyword
    ? { name: { $regex: keyword, $options: "i" } }
    : {};

  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  return { products, total };
};
