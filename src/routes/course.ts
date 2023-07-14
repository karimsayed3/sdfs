import express from "express";
import { body } from "express-validator";

import { isAuthenticated } from "../middlewares/isAuth";
import {validateRequest} from "../helper/validateRequest";
import {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  changeFavourCourse
} from "../controllers/course";


const router = express.Router();

// create
// POST /quiz/
router.post(
  "/",  isAuthenticated,

  createCourse
);

// get
// GET /quiz/:quizId
router.get("/getCourseByCourseId/:courseId",   isAuthenticated,
getCourse);
router.get("/getAllCoursesByCategoryId/:categoryId",  isAuthenticated,
getAllCourse);
//

//update
//PUT /quiz
router.put(
  "/:courseId",  isAuthenticated,
  updateCourse
);

router.put(
  "/cou/changeFavoureCourse",  isAuthenticated,
  changeFavourCourse
);

//Delete
//DELETE quiz/:quizId
router.delete("/:quizId",  isAuthenticated,
deleteCourse);

export default router;
