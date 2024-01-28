const express = require("express");
const {
    roleCreated
} = require("../controllers/roleController");

const router = express.Router();

router.post("/role", roleCreated);

module.exports = router;
