const Product = require("../product/product.model");
const InventoryHistory = require("./inventory.model");

/**
 * Reduce stock when order is placed
 */
exports.decreaseStock = async (productId, qty) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < qty) {
    throw new Error("Insufficient stock");
  }

  product.stock -= qty;
  await product.save();

  await InventoryHistory.create({
    productId,
    change: -qty,
    reason: "ORDER",
    updatedBy: "SYSTEM",
  });
};

/**
 * Increase stock (Admin / Restock)
 */
exports.increaseStock = async (productId, qty, adminId = "ADMIN") => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  product.stock += qty;
  await product.save();

  await InventoryHistory.create({
    productId,
    change: qty,
    reason: "RESTOCK",
    updatedBy: adminId,
  });
};

/**
 * Get inventory history for a product
 */
exports.getInventoryHistory = async (productId) => {
  return InventoryHistory.find({ productId }).sort({ createdAt: -1 });
};
