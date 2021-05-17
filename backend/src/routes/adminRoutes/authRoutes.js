const express = require("express");
const router = express.Router();
const authController = require("../../controllers/adminControllers/authController");
const authMiddleware = require("../../middleware/requireSignIn");
const {
  validateSignUpRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

router.post(
  "/admin/signin",
  validateSigninRequest,
  isRequestValidated,
  authController.signin
);
router.post(
  "/admin/signup",
  validateSignUpRequest,
  isRequestValidated,
  authController.signup
);
router.post(
  "/admin/signout",
  authController.signout
);
router.get(
  "admin/profile",
  authMiddleware.requireSignIn,
  authController.profile
);

module.exports = router;
