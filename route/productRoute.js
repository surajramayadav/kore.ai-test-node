
const express = require("express");
const {
  addproduct,
  viewproductById,
  viewproduct,
  deleteproduct,
  updateproduct,
  checkCapacityByDate,
} = require("../controller/productController");

const router = express.Router();


router.route("/add").post(addproduct);
router.route("/view/:id").get(viewproductById);
router.route("/checkCapacity/:date").get(checkCapacityByDate);
router.route("/view/").get(viewproduct);
router.route("/update/:id").put(updateproduct);
router.route("/delete/:id").delete(deleteproduct);

module.exports = router;
