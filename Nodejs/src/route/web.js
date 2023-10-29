import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  // router.get("/crud", homeController.getCrudPage);
  // router.post("/post-crud", homeController.postCRUD);
  // router.get("/display-crud", homeController.displayGetCrud);
  // router.get("/edit-crud", homeController.getEditCrud);
  // router.post("/put-crud", homeController.putCrud);
  // router.get("/delete-crud", homeController.deleteCrud);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.put("/api/update-user", userController.handleUpdateUser);
  router.get("/api/get-allcode", userController.handleGetAllCode);
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  return app.use("/", router);
};

module.exports = initWebRoutes;
