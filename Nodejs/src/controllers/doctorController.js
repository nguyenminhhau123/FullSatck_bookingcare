import doctorService from "../services/doctorService";
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    // +limit means become int
    let response = await doctorService.getTopDoctorService(+limit);
    console.log("res", response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from severs...",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
};
