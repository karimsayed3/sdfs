import express from "express";
import { body } from "express-validator";

import { isAuthenticated } from "../middlewares/isAuth";
import {validateRequest} from "../helper/validateRequest";
import {
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
} from "../controllers/lessons";


const router = express.Router();

// create
// POST /quiz/
router.post(
  "/",  isAuthenticated,

  createLesson
);

// get
// GET /quiz/:quizId
router.get("/getLessonByLessonId/:lessonId",  isAuthenticated,
getLesson);
router.get("/getAllLessonsByCourseId/:courseId",  isAuthenticated,
getAllLessons);
//

//update
//PUT /quiz
router.put(
  "/",  isAuthenticated,

  updateLesson
);

//Delete
//DELETE quiz/:quizId
router.delete("/:quizId",  isAuthenticated,
deleteLesson);

export default router;
