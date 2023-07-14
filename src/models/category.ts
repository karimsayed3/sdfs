import mongoose from "mongoose";
const schema = mongoose.Schema;
//schema
const categorySchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    noOfCourses: {
      type: Number,
      required: true,
    },
    image: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
