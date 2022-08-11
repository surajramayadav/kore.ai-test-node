
const express = require("express");
const {
  viewcustomerById,
  viewcustomer,
  deletecustomer,
  updatecustomer,
} = require("../controller/customerController");
const { isAuthenticatedcustomer, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/view/:id").get(isAuthenticatedcustomer, viewcustomerById);
router.route("/view/").get(isAuthenticatedcustomer, authorizeRoles('Admin'), viewcustomer);
router.route("/update/:id").put(updatecustomer);
router.route("/delete/:id").delete(deletecustomer);

module.exports = router;
