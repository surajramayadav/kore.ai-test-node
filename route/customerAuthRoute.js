
const express = require("express");
const { customerRegister, customerLogin, logout, forgetPassword, resetPassword } = require("../controller/customerAuthController");

// isAuthenticatedcustomer is middleware it check customer is login or not
// authorizeRoles('role') is middleware it check customer is role to access resources

const router = express.Router();

router.route("/register").post(customerRegister);
router.route("/login").post(customerLogin);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password").post(resetPassword);
router.route("/logout").get(logout);

module.exports = router;
