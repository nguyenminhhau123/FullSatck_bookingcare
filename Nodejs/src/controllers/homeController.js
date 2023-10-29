// import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";
let getHomePage = async (req, res) => {
  return res.render("homepage.ejs");
};

let getCrudPage = (req, res) => {
  return res.render("crudpage.ejs");  
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);

  return res.send("post crud from server");
};
let displayGetCrud = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", { data: data });
};
let getEditCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);

    return res.render("editcrud.ejs", { userData: userData });
  }
};
let putCrud = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDService.UpdateUserData(data);
  return res.render("displayCRUD.ejs", { data: allUser });
};
let deleteCrud = async (req, res) => {
  let id = await req.query.id;
  if (id) {
    let data = await CRUDService.DeleteUserDataById(id);

    return res.render("displayCRUD.ejs", { data: data });
  } else {
    res.send("not found user");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCrudPage: getCrudPage,
  postCRUD: postCRUD,
  displayGetCrud: displayGetCrud,
  getEditCrud: getEditCrud,
  putCrud: putCrud,
  deleteCrud: deleteCrud,
};
