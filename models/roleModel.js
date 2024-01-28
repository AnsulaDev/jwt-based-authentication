const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
},
{
    
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
);

module.exports = mongoose.model("Role", RoleSchema);