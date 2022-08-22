const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    valoration: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    //TODO borrar si no es necesaria
    // isFavourite: {
    //   type: Boolean,
    //   default: false,
    // },
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
