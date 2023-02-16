import express from "express";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import UserRoute from "./routes/user";
import authRoute from "./routes/auth";
import quizRoute from "./routes/quiz";
import examRoute from "./routes/exam";
import reportRoute from "./routes/report";

import ProjectError from "./helper/error";
import { ReturnResponse } from "./utils/interfaces";

const app = express();

const connectionString =  process.env.CONNECTION_STRING || "";

app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      userId: String;
    }
  }
}

app.get("/", (req, res) => {
  res.json("hello")
  
});

//Redirect /user to UserRoute
app.use("/user", UserRoute);

//Redirect /auth
app.use("/auth", authRoute);

//Redirect /quiz
app.use("/quiz", quizRoute);

//Redirect /exam
app.use("/exam", examRoute);

//Redirect /report
app.use("/report", reportRoute);

app.use(
  (err: ProjectError, req: Request, res: Response, next: NextFunction) => {
    // email to corresponding email
    // logger for err
    let message: String;
    let statusCode: number;

    if (!!err.statusCode && err.statusCode < 500) {
      message = err.message;
      statusCode = err.statusCode;
    } else {
      message = "Something went wrong please try after sometime!";
      statusCode = 500;
    }

    let resp: ReturnResponse = { status: "error", message, data: {} };
    if (!!err.data) {
      resp.data = err.data;
    }

    console.log(err.statusCode, err.message);
    res.status(statusCode).send(resp);
  }
);

mongoose.connect(connectionString, (err) => {
  if (err) {
    console.log(err);
    return;
  }
 var port = process.env.PORT
  app.listen(port || 3000, () => {
    console.log("Server Connectedon port " + port);
  });
});
