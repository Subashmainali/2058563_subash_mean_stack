const express = require("express");
const router = express.Router();
const courseController = require("../controller/course.controller");


router.post("/addCourse", courseController.addCourse);
router.put("/updateCourse", courseController.updateCourse);
router.delete("/deleteCourse", courseController.deleteCourse);
router.get("/getCourses", courseController.getCourses)

module.exports = router;

