const connection = require("../connect");
function getListBooks(route, res) {
  const sql = "select * from books";
  connection.query(sql, function (error, result, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.render(route, { result });
    }
  });
}

module.exports = {
  admin: function (req, res) {
    getListBooks("admin", res);
  },

  categories: function (req, res) {
    res.render("categories");
  },

  edit: function (req, res) {
    res.render("edit", {
      result: {
        id: 1,
        name: "car",
        stock: 2,
        deskripsi: "description",
      },
    });
  },

  // get id content
  getIdEdit: function (req, res) {
    const { id } = req.params;

    const sql = "select * from books where id = ?";
    connection.query(sql, [id], function (error, results, fields) {
      if (error) throw error;
      console.log(results[0].id);
      res.render("edit", { result: results[0] });
    });
  },

  delete: function (req, res) {
    const { id } = req.params;
    const sql = "delete from books where id = ?";
    connection.query(sql, [id], function (error) {
      if (error) throw error;
      getListBooks("admin", res);
    });
  },

  // update books
  updatebooks: function (req, res) {
    const { name, stock, description, categories, id } = req.body;
    const imageBook = req.files.image;
    const imageName = imageBook.name;
    const uploadPath = `public/images/${imageName}`;
    const imagePath = `images/${imageName}`;
    function saveData() {
      const sql =
        "update books set name = ?, stock = ?, image = ?, deskripsi = ?, category_id = ? where id = ?";

      connection.query(
        sql,
        [name, stock, imagePath, description, categories, id],
        function (error, result) {
          if (error) {
            console.log(error);
          } else {
            res.render("admin");
          }
        }
      );
    }

    //upload image
    imageBook.mv(uploadPath, function (error) {
      if (error) {
        console.log("upload image error");
      } else {
        console.log("upload image sukses");
        saveData();
      }
    });
  },

  // add books
  addbooks: function (req, res) {
    const { name, stock, description, categories } = req.body;
    const imageBook = req.files.image;
    const imageName = imageBook.name;
    const uploadPath = `public/images/${imageName}`;
    const imagePath = `images/${imageName}`;
    function saveData() {
      const sql = "insert into books values('', ?, ?, ?, ?, ?)";

      connection.query(
        sql,
        [name, stock, imagePath, description, categories],
        function (error, result) {
          if (error) {
            console.log(error);
          } else {
            res.render("admin");
          }
        }
      );
    }

    //upload image
    imageBook.mv(uploadPath, function (error) {
      if (error) {
        console.log("upload image error");
      } else {
        console.log("upload image sukses");
        saveData();
      }
    });
  },

  // add catergories
  addcategories: function (req, res) {
    // get value input
    const { categories } = req.body;

    // insert data to database
    connection.query(
      "insert into categories values('', ?)",
      [categories],
      function (error, result) {
        if (error) {
          console.log(error);
        } else {
          res.render("categories");
          console.log("Data customer berhasil ditambahakan");
        }
      }
    );
  },

  // borrow book
  borrowbook: function (req, res) {
    const { id } = req.params;

    function getDetail(getDetailBooks) {
      connection.query(
        "select stock from books where id = ?",
        [id],
        function (error, result) {
          if (error) throw error;
          updateBooks(result);
        }
      );
    }

    function updateBooks(stock) {
      if (stock > 0) {
        const sql = "update books set stock = ? where id =? ";
        connection.query(sql, [stock - 1, id], function (error) {
          if (error) throw error;
          getListBooks("`index", res);
        });
      }
    }
    getDetail(id);
  },

  returnbook: function (req, res) {
    const { id } = req.params;
    function getDetail(getDetailBooks) {
      connection.query(
        "select stock from books where id = ?",
        [id],
        function (error, result) {
          if (error) throw error;
          deleteBooks(result);
        }
      );
    }

    function deleteBooks(stock) {
      if (stock > 0) {
        const sql = "update books set stock = ? where id =? ";
        connection.query(sql, [stock + 1, id], function () {
          getListBooks("`index", res);
        });
      }
    }

    getDetail(id);
  },
};
