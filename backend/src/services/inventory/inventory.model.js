const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    change: {
      type: Number, // +ve or -ve
      required: true,
    },
    reason: {
      type: String,
      enum: ["ORDER", "ADMIN_UPDATE", "RESTOCK"],
      required: true,
    },
    updatedBy: {
      type: String, // ADMIN / SYSTEM
      default: "SYSTEM",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryHistory", inventorySchema);
