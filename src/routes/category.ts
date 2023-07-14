import express from "express";
import { body } from "express-validator";

import { isAuthenticated } from "../middlewares/isAuth";
import {validateRequest} from "../helper/validateRequest";
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  isValidCategoryName,
  getAllCategories,
} from "../controllers/category";


const router = express.Router();

// create
// POST /quiz/
router.post(
  "/",[
    body("name")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("Please enter a valid name, minimum 10 character long")
    .custom((name) => {
      return isValidCategoryName(name)
        .then((status: Boolean) => {
          if (!status) {
            return Promise.reject("Plaase enter an unique category name.");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }),
  ],
  validateRequest,
  isAuthenticated,
  createCategory
);

// get
// GET /quiz/:quizId
router.get("/:categoryId",  isAuthenticated,
getCategory);


router.get("/cat/getAllCategories",  isAuthenticated,
getAllCategories);

//update
//PUT /quiz
router.put(
  "/",
  isAuthenticated,
  updateCategory
);



//Delete
//DELETE quiz/:quizId
router.delete("/:categoryId",   isAuthenticated,
deleteCategory);

//Publish
// PATCH quiz/publish

export default router;
