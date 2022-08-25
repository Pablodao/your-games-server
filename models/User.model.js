const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      default: "",
    },

    username: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,

      unique: true,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    description: String,
    rank: {
      type: String,
      enum: ["Bronze, Silver, Gold"],
      default: "Bronze",
    },
    favourites: [
      {
        type: String,
      },
    ],
    likedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    dislikedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    accountClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
