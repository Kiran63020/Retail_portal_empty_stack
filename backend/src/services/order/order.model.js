const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    items: Array,
    total: Number,
    status: { type: String, default: "PLACED" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
