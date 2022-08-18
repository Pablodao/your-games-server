const { Schema, model } = require("mongoose");

const userSchema = new Schema(
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
    id:{
        type:String,
        required:true
    },
    name:{

        type:String,
        required:true
    },
    image:String
  },
  {
    timestamps: true,
  }
);

const Game = model("Game", userSchema);

module.exports = Game;
