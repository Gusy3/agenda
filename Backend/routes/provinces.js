'use strict'

import express from "express";
import ProvinceController from "../controllers/provinces.js";

var router = express.Router();

router.get('/provinces', ProvinceController.getProvinces);

 export default router;