import db from "../models/index";
let getTopDoctorService = (inputLimit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        where: { roleId: "R2" },
        limit: inputLimit,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        message: "get doctor service successfully",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorService: getTopDoctorService,
};
