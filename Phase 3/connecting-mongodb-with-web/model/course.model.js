const mongoose = require("mongoose");

mongoose.pluralize(null);


const courseSchema = mongoose.Schema({
        _id: Number,
        cname:String,
        description:String,
        amount:Number
})


const courseModel = mongoose.model("Course", courseSchema);


module.exports = courseModel;


