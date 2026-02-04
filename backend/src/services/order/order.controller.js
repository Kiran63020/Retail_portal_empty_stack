const service = require("./order.service");

exports.create = async (req, res) => {
  try {
    const order = await service.createOrder(req.user.id, req.body.items);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.myOrders = async (req, res) => {
  const orders = await service.getMyOrders(req.user.id);
  res.json(orders);
};
