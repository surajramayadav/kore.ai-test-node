
const express = require("express");
const {
  addorder,
  vieworderById,
  vieworder,
  deleteorder,
  updateorder,
} = require("../controller/orderController");
const { isAuthenticatedcustomer, authorizeRoles } = require("../middleware/auth");

// isAuthenticatedcustomer is middleware it check customer is login or not
// authorizeRoles('role') is middleware it check customer is role to access resources

const router = express.Router();


router.route("/add").post(isAuthenticatedcustomer, addorder);
router.route("/view/:id").get(isAuthenticatedcustomer, vieworderById);
router.route("/view/").get(isAuthenticatedcustomer, authorizeRoles('Admin'), vieworder);
router.route("/update/:id").put(isAuthenticatedcustomer, authorizeRoles('Admin'), updateorder);
router.route("/updateStatus/:id").put(isAuthenticatedcustomer, authorizeRoles('Admin'), updateorder);
router.route("/delete/:id").delete(deleteorder);

module.exports = router;
