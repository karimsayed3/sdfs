import mongoose from "mongoose";
const schema = mongoose.Schema;
//schema
const favouriteSchema = new schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    user_id: {
        type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;
