import mongoose from "mongoose";
const schema = mongoose.Schema;
//schema
const lessonSchema = new schema(
  {
    
    description: {
        type: String,
        required: true,
      },
    lessons:[
        {
            name: {
                type: String,
                required: true,
              },
              timer: {
                type: Number,
                required: true,
              },
              url:
                {
                  type: String,
                  required: true,
                },   
        }
    ],   
    course_id:{
      type: String,
      required: true,
    } 
  },
  { timestamps: true }
);

const lesson = mongoose.model("Lesson", lessonSchema);

export default lesson;
