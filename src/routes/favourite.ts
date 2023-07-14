import express from "express";
import { isAuthenticated } from "../middlewares/isAuth";

import { UpdateFavourite ,getFavourite} from "../controllers/favourite";

const router = express.Router();

//GET /report/:reportId
router.put("/update/", isAuthenticated, UpdateFavourite);


router.get("/fav/getFavouriteCourses", isAuthenticated, getFavourite);


// router.post("/teacher", isAuthenticated, getReport);

export default router;
