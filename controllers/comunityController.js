
const asyncHandler = require("express-async-handler");
const Community = require('./models/communityModel'); 

// POST - Create a community
const createCommunity = asyncHandler( async (req, res) => {
    try {
        const { name, slug } = req.body;
        if (!name || !slug) {
            return res.status(400).send({ message: 'Name and slug are required' });
        }
        const community = new Community({
            name,
            slug,
            owner: req.user._id
        });
        await community.save();
        res.status(201).send(community);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while creating the community' });
    }
});

// GET - List all communities
const getCommunity =  asyncHandler( async (req, res) => {
    try {
        const communities = await Community.find({}).populate('owner', 'id name');
        res.send(communities);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET - List all members of a community
const getAllMembers= asyncHandler ( async (req, res) => {
    try {
        const community = await Community.findById(req.params.id).populate('members', 'id name');
        res.send(community.members);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET - List all communities owned by the current user
const getMyOwnedCommunity = asyncHandler( async (req, res) => {
    try {
        const communities = await Community.find({ owner: req.user._id });
        res.send(communities);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET - List all communities joined by the current user
const getMyJoinedCommunity = asyncHandler( async (req, res) => {
    try {
        const communities = await Community.find({ members: req.user._id }).populate('owner', 'id name');
        res.send(communities);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = {
    createCommunity,
    getCommunity,
    getAllMembers,
    getMyOwnedCommunity,
    getMyJoinedCommunity
}
