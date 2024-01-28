const mongoose = require("mongoose");
const { Snowflake } = require("@theinternetfolks/snowflake");

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return Snowflake.generate();
      }
    },
    name: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model("User", userSchema);
