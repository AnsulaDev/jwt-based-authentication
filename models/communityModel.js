const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    members: [{ type: String, ref: "User" }],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model("Community", CommunitySchema);