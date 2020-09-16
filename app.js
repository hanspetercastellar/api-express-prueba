require("dotenv").config();
const app = require("./src/config/server");

require("./src/config/database");

app.listen(app.get("port"), () => {
  console.log("server in port " + app.get("port"));
});
