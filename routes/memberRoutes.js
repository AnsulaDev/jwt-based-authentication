const express = require("express");
const router = express.Router();
const {
    addMember,
    deleteMember
} = require("../controllers/memberController");
const validateToken = require("../middleware/validateTokenHandler");

//protected routes
router.use(validateToken);
router.route("/").post(addMember);
router.route("/:id").delete(deleteMember);

module.exports = router;
