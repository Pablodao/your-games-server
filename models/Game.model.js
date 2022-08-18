const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    valoration: {
      type: string,
      enum: ["☆☆☆☆☆, ★☆☆☆☆, ★★☆☆☆, ★★★☆☆ ,★★★★☆, ★★★★★"],
      default: " ☆☆☆☆☆ ",
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;
