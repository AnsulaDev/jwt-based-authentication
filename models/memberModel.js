const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    community: { type: String,   required: true, ref: 'Community' },
    user: { type: String,   required: true, ref: 'User' },
    role: { type: String,   required: true, ref: 'Role' },
            
},
{
    
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
);

module.exports = mongoose.model("Member", memberSchema);