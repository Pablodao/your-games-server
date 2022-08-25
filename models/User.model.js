const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
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
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
    favourites: [
      {
        gameImg: String,
        gameName: String,
        gameId: String,
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
