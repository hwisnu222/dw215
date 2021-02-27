const connection = require("../connect");

module.exports = {
  index: function (req, res) {
    const sql = "select * from books";
    connection.query(sql, function (error, results) {
      if (error) throw error;
      res.render("index", { result: results });
    });
  },
};
