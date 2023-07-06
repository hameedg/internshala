const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const checkAuth = require("../middleware/check-aut");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dyvkwrjqy",
  api_key: "126578436167967",
  api_secret: "PY7KL4krBgewwGCkzmoGEhuKsxM",
});

router.get("/", checkAuth, (req, res, next) => {
  Product.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        ProductData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//get by id
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id)
    .exec()
    .then((result) => {
      res.status(200).json({
        individual_Product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//post
router.post("/", (req, res, next) => {
  console.log(req.body);
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log(result);
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      code: req.body.code,
      title: req.body.title,
      description: req.body.description,
      mrp: req.body.mrp,
      sp: req.body.sp,
      discountPercent: req.body.discountPercent,
      imagePath: result.url,
    });

    product
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
  /*
    
   */
});

//delete
router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Data deleted successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There is some error",
        error: err,
      });
    });
});

//put

router.put("/:id", (req, res, next) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        code: req.body.code,
        title: req.body.title,
        description: req.body.description,
        mrp: req.body.mrp,
        sp: req.body.sp,
        discountPercent: req.body.discountPercent,
        imagePath: req.body.imagePath,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "updated",
        updated_product: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
