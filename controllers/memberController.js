const asyncHandler = require("express-async-handler");
const Member = require('../models/memberModel');
const Community = require('../models/communityModel'); 
const Role = require('../models/roleModel'); 

// POST - Add a member
const addMember = asyncHandler( async (req, res) => {
    try {
        const { community, user, role } = req.body;
        const communityDoc = await Community.findById(community);

        // Check if the current user is a Community Admin
        if (req.user._id.toString() !== communityDoc.owner.toString()) {
            return res.status(403).json({ error: 'NOT_ALLOWED_ACCESS' });
        }

        const member = new Member({ community, user, role });
        await member.save();
        res.status(201).send(member);
    } catch (error) {
        res.status(400).send(error);
    }
});



// DELETE - Remove a member
const deleteMember = asyncHandler( async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const community = await Community.findById(member.community);
        if (!community) {
            return res.status(404).json({ error: 'Community not found' });
        }

        const role = await Role.findById(member.role);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        // Check if the current user is a Community Admin or Community Moderator
        if (req.user._id.toString() !== community.owner.toString() && role.name !== 'Community Moderator') {
            return res.status(403).json({ error: 'NOT_ALLOWED_ACCESS' });
        }

        await Member.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = {
    addMember,
    deleteMember
};