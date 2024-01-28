const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/signup", registerUser);

router.post("/signin", loginUser);

//protected route
router.get("/me", validateToken, currentUser);

module.exports = router;
