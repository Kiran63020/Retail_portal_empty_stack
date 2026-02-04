const Order = require("./order.model");
const Product = require("../product/product.model");

exports.createOrder = async (userId, items) => {
  let total = 0;

  for (const item of items) {
    const qty = Number(item.qty);

    if (!Number.isFinite(qty) || qty <= 0) {
      throw new Error("Each item must have a positive numeric qty");
    }

    const product = await Product.findById(item.productId);

    if (
      !product ||
      !Number.isFinite(product.stock) ||
      !Number.isFinite(product.price)
    ) {
      throw new Error("Product has invalid price or stock");
    }

    if (product.stock < qty) {
      throw new Error("Insufficient stock");
    }

    product.stock -= qty;
    await product.save();

    total += product.price * qty;
  }

  return Order.create({ userId, items, total });
};

exports.getMyOrders = (userId) =>
  Order.find({ userId }).sort({ createdAt: -1 });
