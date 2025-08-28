const express = require("express");
const { createOrder } = require("../controller/orderController.js");

const router = express.Router();

router.post("/", createOrder);

module.exports= router;
