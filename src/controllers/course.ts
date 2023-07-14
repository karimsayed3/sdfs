//model
import { RequestHandler } from "express";

import Course from "../models/course";
import ProjectError from "../helper/error";
import { ReturnResponse } from "../utils/interfaces";
import Category from "../models/category";

const createCourse: RequestHandler = async (req, res, next) => {
  try {

    const category_id = req.body.category_id;
    const name = req.body.name;
    const image = req.body.image;
    const completedPercentage = req.body.completedPercentage;
    const favourite = req.body.favourite;
    const author = req.body.author
    const userId = req.userId

    const course = new Course({ name, category_id, image, completedPercentage, favourite,author,userId });
    const result = await course.save();
    const resp: ReturnResponse = {
      status: "success",
      message: "Course created successfully",
      data: { courseId: result._id },
    };
    res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};

const getCourse: RequestHandler = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId, {
      name: 1,
      category_id: 1,
      image: 1,
      favourite: 1,
      author: 1,
      completedPercentage:1,
    });

    if (!course) {
      const err = new ProjectError("Course not found!");
      err.statusCode = 404;
      throw err;
    }

    const resp: ReturnResponse = {
      status: "success",
      message: "Course",
      data: course,
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const getAllCourse: RequestHandler = async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const course = await Course.find({category_id:categoryId, userId : req.userId}, {
        name: 1,
        category_id: 1,
        image: 1,
        favourite: 1,
        author: 1,
        completedPercentage:1,
      });
  
      if (!course) {
        const err = new ProjectError("Courses not found!");
        err.statusCode = 404;
        throw err;
      }
  
      const resp: ReturnResponse = {
        status: "success",
        message: "Course",
        data: course,
      };
      res.status(200).send(resp);
    } catch (error) {
      next(error);
    }
  };
  

const updateCourse: RequestHandler = async (req, res, next) => {
  try {

    const courseId = req.body._id;
    const course = await Course.findById(courseId);

    if (!course) {
      const err = new ProjectError("Quiz not found!");
      err.statusCode = 404;
      throw err;
    }
    
    course.name = req.body.name;
    course.category_id = req.body.category_id;
    course.image = req.body.image;
    course.favourite = req.body.favourite;
    course.completedPercentage = req.body.completedPercentage;
    course.author = req.body.author;
    await course.save();

    const resp: ReturnResponse = {
      status: "success",
      message: "Course updated successfully",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};


const changeFavourCourse: RequestHandler = async (req, res, next) => {
  try {

    const courseId = req.body._id;
    const course = await Course.findById(courseId);

    if (!course) {
      const err = new ProjectError("Quiz not found!");
      err.statusCode = 404;
      throw err;
    }
    
    if(course.userId == req.userId){
      course.favourite = req.body.favourite;
      await course.save();
    }

    const resp: ReturnResponse = {
      status: "success",
      message: "Course updated successfully",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const deleteCourse: RequestHandler = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      const err = new ProjectError("Course not found!");
      err.statusCode = 404;
      throw err;
    }
    await Course.deleteOne({ _id: courseId });
    const resp: ReturnResponse = {
      status: "success",
      message: "Course deleted successfully",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};
export {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  changeFavourCourse
};
