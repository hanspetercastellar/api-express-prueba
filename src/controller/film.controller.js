const con = require("../config/database");
const JWT = require("jsonwebtoken");
var bcrypt = require("bcrypt");

module.exports = {
  getList: (req, res, next) => {
    console.log(
      con.query("SELECT * FROM film_list", (err, result) => {
        console.log(result, "sdfdsfs");
        res.json({res: result});
      })
    );
  },

  postStaff: async (req, res, next) => {
    const {firs_name, last_name, email, username, password} = req.body;
    const sql = ` INSERT INTO staff (staff_id, first_name, last_name, address_id, picture, email, store_id, active, username, password, last_update)
                  VALUES (NULL, '${firs_name}', '${last_name}', '132', null , '${email}', '2', '1', '${username}', '${bcrypt.hash(
      password,
      12
    )}', CURRENT_TIMESTAMP); `;
    con.query(sql, (err, rows) => {
      if (!err) {
        if (rows.affectedRows) {
          res.json({success: true, message: "Staff creado con exito"});
        }
        console.log(rows);
      }
    });
  },
  staffExists: async (req, res, next) => {
    const {email, username} = req.body;
    await con.query(
      `select count(*) cant from staff where email = '${email}' or username = '${username}'`,
      (err, rows) => {
        if (rows[0].cant) {
          res.json({success: false, message: "El Usuario ya existe"});
        } else {
          next();
        }
      }
    );
  },
  login: async (req, res, next) => {
    const {user, pass} = req.body;
    const sql = `SELECT count(*) cant from staff where (email = '${user}' or username = '${user}')`;
    await con.query(sql, (err, result) => {
      console.log(user);
      if (result[0].cant) {
        JWT.sign({user}, "secret", (err, token) => {
          res.json({success: true, token, message: "token creado correctamente"});
        });
      }
    });
  },
  getCustommers: async (req, res) => {
    const sql = `select * from customer_list `;
    await con.query(sql, (err, rows) => {
      if (!err) {
        res.json({success: true, data: rows});
      } else {
        res.json({success: false, error: err});
      }
    });
  },
  //verificar las rutas protegidas
  verifyToken: (req, res, next) => {
    const Btoken = req.headers["authorization"];
    console.log(Btoken);
    if (typeof Btoken !== "undefined") {
      const token = Btoken.split(" ")[1];
      req.token = token;
      JWT.verify(token, "secret", (err, authData) => {
        if (err) {
          res.status(403).json({
            error: err,
            status: 403,
            message: err.message,
          });
        } else {
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  },
};
