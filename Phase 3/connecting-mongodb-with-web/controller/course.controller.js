// load the model file 
const courseModel = require("../model/course.model");

const addCourse = async (req, res) => {

    console.log("Adding Course");
    let course = req.body;
    console.log(course);
    let r = await courseModel.insertMany([course], (e, result) => {
        if(e){
            res.status(400).send({"msg":e.writeErrors[0].errmsg});
        }else{
            res.send("Courses Addde Successfully , <a href='/addCourse'>Go back</a>");
            
        }
    });
}

// update the course amount 
const updateCourse = async (req, res) => {
    let course = req.body;
    console.log(course);
    let r = await courseModel.updateOne({_id:course._id}, {amount: course.amount});

    if(r.matchedCount == 0){
        res.status(400).send({"msg": `course with id:${course._id} does not exist`});
    }else{
        if(r.modifiedCount != 0){
            res.status(200).send({"msg": "course updated"});
        }
    }
 
}



// delelte course
const deleteCourse = async (req, res) => {
    let courseId = req.body;
    console.log(courseId);
    let result = await courseModel.deleteOne({_id:courseId._id})
    if(result.deletedCount != 0){
        res.status(200).send({"msg": "course sucessfully deleted"});
    }else{
        console.log("doesnt exist");
        res.status(400).send({"msg": `course with id:${courseId._id} does not exist`});

    }
   
}


// get all courses
const getCourses = async (req, res) => {
    console.log("Getting all courses");
    let result = await courseModel.find({});
    res.send(result);
}


module.exports = {addCourse, updateCourse, deleteCourse, getCourses};