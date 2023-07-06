const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Student.find()
    .then((result) => {
      res.status(200).json({
        studentData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        individual_Student: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
  });

  student
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Your data is added is successfully",
        Prop: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "this is wrong",
        error: err,
      });
    });
});

module.exports = router;
