//model
import { RequestHandler } from "express";

import Lesson from "../models/lesson";
import ProjectError from "../helper/error";
import { ReturnResponse } from "../utils/interfaces";

const createLesson: RequestHandler = async (req, res, next) => {
  try {

    const description = req.body.description;
    const lessons = req.body.lessons;
    const course_id = req.body.course_id

    const lesson = new Lesson({ description,lessons,course_id });
    const result = await lesson.save();
    const resp: ReturnResponse = {
      status: "success",
      message: "Lesson created successfully",
      data: { lessonId: result._id },
    };
    res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};

const getLesson: RequestHandler = async (req, res, next) => {
  try {
    const lessonId = req.params.lessonId;
    const lesson = await Lesson.findById(lessonId, {
        description: 1,
        lessons: 1,
        course_id:1,
    });

    if (!lesson) {
      const err = new ProjectError("Lesson not found!");
      err.statusCode = 404;
      throw err;
    }

    const resp: ReturnResponse = {
      status: "success",
      message: "Lesson",
      data: lesson,
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const getAllLessons: RequestHandler = async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const lesson = await Lesson.find({course_id:courseId}, {
        description: 1,
        lessons: 1,
        course_id:1,
      });
  
      if (!lesson) {
        const err = new ProjectError("Lesson not found!");
        err.statusCode = 404;
        throw err;
      }
  
      const resp: ReturnResponse = {
        status: "success",
        message: "Lesson",
        data: lesson,
      };
      res.status(200).send(resp);
    } catch (error) {
      next(error);
    }
  };
  

const updateLesson: RequestHandler = async (req, res, next) => {
  try {

    const lessonId = req.body._id;
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      const err = new ProjectError("Lesson not found!");
      err.statusCode = 404;
      throw err;
    }

    lesson.description = req.body.description;
    lesson.lessons = req.body.lessons;


    await lesson.save();

    const resp: ReturnResponse = {
      status: "success",
      message: "Lesson updated successfully",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};


const deleteLesson: RequestHandler = async (req, res, next) => {
  try {
    const LessonId = req.params.LessonId;
    const lesson = await Lesson.findById(LessonId);

    if (!Lesson) {
      const err = new ProjectError("Lesson not found!");
      err.statusCode = 404;
      throw err;
    }
    await Lesson.deleteOne({ _id: LessonId });
    const resp: ReturnResponse = {
      status: "success",
      message: "Lesson deleted successfully",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};



export {
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,getAllLessons,
};
