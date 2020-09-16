const express = require("express");
const router = express.Router();

const {
  getList,
  postStaff,
  staffExists,
  login,
  getCustommers,
  verifyToken,
} = require("../controller/film.controller");

router.get("/api/film/list", verifyToken, getList);
router.post("/api/staff/post", verifyToken, staffExists, postStaff);
router.get("/api/customer/list", verifyToken, getCustommers);
router.post("/api/login", login);

module.exports = router;
