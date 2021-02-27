module.exports = function (app) {
  const controllerIndex = require("./controller/index");
  const controllerAdmin = require("./controller/admin");

  //routes
  app.route("/").get(controllerIndex.index);
  app.route("/admin").get(controllerAdmin.admin);
  app.route("/categories").get(controllerAdmin.categories);
  app.route("/edit").get(controllerAdmin.admin);

  // add
  app.route("/addbooks").post(controllerAdmin.addbooks);
  app.route("/addcategories").post(controllerAdmin.addcategories);
  app.route("/updatebooks").post(controllerAdmin.updatebooks);

  // edit
  app.route("/edit/:id").get(controllerAdmin.getIdEdit);

  // delete book
  app.route("/delete/:id").get(controllerAdmin.delete);
  // return book
  app.route("/back/:id").get(controllerAdmin.returnbook);

  // borrow book
  app.route("/borrow/:id").get(controllerAdmin.borrowbook);
};
