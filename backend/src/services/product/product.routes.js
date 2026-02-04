const router = require("express").Router();

const productController = require("./product.controller");
const upload = require("../../shared/utils/multer");
const { protect, admin } = require("../../shared/middleware/auth.middleware");

// Create product with image upload (admin only)
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  productController.createProduct
);

// List products (public)
router.get("/", productController.list);

module.exports = router;
