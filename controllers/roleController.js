
const asyncHandler = require("express-async-handler");
const Role = require('../models/roleModel'); 

// POST - Create a role
const roleCreated = asyncHandler(async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).send(role);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = {
    roleCreated,
};