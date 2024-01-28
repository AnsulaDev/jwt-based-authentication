const express = require("express");
const { roleCreated} = require('../controllers/roleController');

const router = express.Router();

router.post("/", roleCreated);

module.exports = router;
