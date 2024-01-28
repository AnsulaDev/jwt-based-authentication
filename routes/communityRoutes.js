const express = require("express");
const router = express.Router();
const {createCommunity,
        getCommunity,
        getAllMembers,
        getMyOwnedCommunity,
        getMyJoinedCommunity} = require('../controllers/communityController');
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/")
    .get(getCommunity)
    .post(createCommunity);

router.route("/:id/members")
    .get(getAllMembers);

router.route("/me/owner")
    .get(getMyOwnedCommunity);

router.route("/me/member")
    .get(getMyJoinedCommunity);

module.exports = router;
