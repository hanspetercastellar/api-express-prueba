const express = require("express");
const router = express.Router();
const con = require("../config/database");

router.get("/list", (req, res, next) => {
  console.log(
    con.query("SELECT * FROM film_list", (err, result) => {
      console.log(result, "sdfdsfs");
      res.json({res: result});
    })
  );
});

module.exports = router;
