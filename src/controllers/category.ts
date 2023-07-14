//model
import { RequestHandler } from "express";

import Category from "../models/category";
import ProjectError from "../helper/error";
import { ReturnResponse } from "../utils/interfaces";

const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const name = req.body.name;
    const image = req.body.image;
    const noOfCourses = req.body.noOfCourses;

    const category = new Category({ name, image,noOfCourses });
    const result = await category.save();
    const resp: ReturnResponse = {
      status: "success",
      message: "Category created successfully",
      data: { category: result._id },
    };
    res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};

const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId, {
      name: 1,
      image: 1,
      noOfCourses: 1,
    });

    if (!category) {
      const err = new ProjectError("Category not found!");
      err.statusCode = 404;
      throw err;
    }

    const resp: ReturnResponse = {
      status: "success",
      message: "Category",
      data: category,
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const category = await Category.find();

    if (!category) {
      const err = new ProjectError("Category not found!");
      err.statusCode = 404;
      throw err;
    }

    const resp: ReturnResponse = {
      status: "success",
      message: "Category",
      data: category,
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};


const updateCategory: RequestHandler = async (req, res, next) => {
  try {

    const categoryId = req.body._id;
    const category = await Category.findById(categoryId);

    if (!category) {
      const err = new ProjectError("Quiz not found!");
      err.statusCode = 404;
      throw err;
    }


    if (category.name != req.body.name) {
      category.name = req.body.name;
    }
    category.image = req.body.image;
    category.noOfCourses = req.body.noOfCourses;

    await category.save();

    const resp: ReturnResponse = {
      status: "success",
      message: "Category updated successfully",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};


const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (!category) {
      const err = new ProjectError("Quiz not found!");
      err.statusCode = 404;
      throw err;
    }

 

    await Category.deleteOne({ _id: categoryId });
    const resp: ReturnResponse = {
      status: "success",
      message: "Category deleted successfully",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};
const isValidCategoryName = async (name: String) => {
    const category = await Category.findOne({ name });
    if (!category) {
      return true;
    }
    return false;
  };
export {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  isValidCategoryName,
  getAllCategories,
};
