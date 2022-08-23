const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    valoration: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    id: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;
