const router = require("express").Router();
const controller = require("./order.controller");
const { authenticate } = require("../../shared/middleware/auth.middleware");

router.post("/", authenticate, controller.create);
router.get("/my", authenticate, controller.myOrders);

module.exports = router;
