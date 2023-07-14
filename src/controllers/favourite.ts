import Course from "../models/course";
import { RequestHandler } from "express";
import ProjectError from "../helper/error";
import { ReturnResponse } from "../utils/interfaces";
import Favourite from "../models/favourite";

const UpdateFavourite: RequestHandler = async (req, res, next) => {
  try {

    const course_id = req.body._id;
    const course = await Course.findById(course_id);

    if (!course) {
      const err = new ProjectError("Quiz not found!");
      err.statusCode = 404;
      throw err;
    }


  
    course.favourite = !course.favourite;

    await course.save();

    const resp: ReturnResponse = {
      status: "success",
      message: "Course updated successfully",
      data: course,
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const getFavourite : RequestHandler  = async (req,res ,next) =>{
  try{
    await Course.find({userId : req.userId,favourite:true}).then((dataa)=>{
      const resp: ReturnResponse = {
        status: "success",
        message: "Get not published successfully",
        data: dataa,
      };
      res.status(200).send(resp);
    });


  }catch(error){
    next(error);
  }

}

export { UpdateFavourite ,getFavourite };
